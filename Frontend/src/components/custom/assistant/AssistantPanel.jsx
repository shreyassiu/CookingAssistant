import React, { useEffect, useRef, useState } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { initRecognition, startListening, stopListening } from '@/utils/assistant/recognition';
import { speakAssistantReply, stopSpeaking } from '@/utils/assistant/synthesis';

// We refactor handleUserCommand to only compute newStep and reply for step-changing commands;
// but for non-step commands, it returns { newStep: currentStep, reply } so handleResult will send immediately.
import { handleUserCommand } from '@/utils/assistant/commandHandler';

const AssistantPanel = () => {
    const [conversationActive, setConversationActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [input, setInput] = useState('');

    // This flag indicates that the last command requested a step change,
    // so when currentStep actually updates, we should send the corresponding reply.
    const [shouldRespondToStepChange, setShouldRespondToStepChange] = useState(false);

    const {
        recipeData,
        closeAssistant,
        messages,
        setMessages,
        instructionsArray,
        currentStep,
        setCurrentStep
    } = useAssistant();

    const recognitionRef = useRef(null);

    useEffect(() => {
        recognitionRef.current = initRecognition();
    }, []);

    useEffect(() => {
        if (shouldRespondToStepChange) {
            const replyText = `Step ${currentStep + 1} : ` + instructionsArray[currentStep] ? instructionsArray[currentStep] : "";
            const assistantMessage = {
                id: crypto.randomUUID(),
                text: replyText,
                sender: 'assistant'
            };
            setMessages(prev => [...prev, assistantMessage]);

            speakAssistantReply(replyText, setIsSpeaking, () => {
                if (conversationActive) {
                    startListening(
                        recognitionRef.current,
                        isListening,
                        isSpeaking,
                        setIsListening,
                        handleResult
                    );
                }
            });

            setShouldRespondToStepChange(false);
        }
    }, [currentStep, shouldRespondToStepChange]);

    const handleResult = async (transcript) => {
        if (!transcript || !transcript.trim()) {
            if (conversationActive) {
                startListening(
                    recognitionRef.current,
                    isListening,
                    isSpeaking,
                    setIsListening,
                    handleResult
                );
            }
            return;
        }

        const userMessage = { id: crypto.randomUUID(), text: transcript, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);


        const { newStep, reply } = await handleUserCommand(
            transcript,
            instructionsArray,
            currentStep,
            recipeData,
            stopConversation
        );

        if (newStep !== currentStep) {
            setShouldRespondToStepChange(true);
            setCurrentStep(prev => newStep);

        } else {
            if (transcript !== "stop") {
                const assistantMessage = { id: crypto.randomUUID(), text: reply, sender: 'assistant' };
                setMessages(prev => [...prev, assistantMessage]);

                speakAssistantReply(reply, setIsSpeaking, () => {
                    startListening(
                        recognitionRef.current,
                        isListening,
                        isSpeaking,
                        setIsListening,
                        handleResult
                    );
                });

            } else {
                if (conversationActive) {
                    startListening(
                        recognitionRef.current,
                        isListening,
                        isSpeaking,
                        setIsListening,
                        handleResult
                    );
                }
            }
        }
    };

    const startConversation = () => {
        if (conversationActive) {
            stopConversation();
        } else {
            setConversationActive(true);
            startListening(
                recognitionRef.current,
                isListening,
                isSpeaking,
                setIsListening,
                handleResult
            );
        }
    };

    const stopConversation = () => {
        stopSpeaking();
        stopListening(recognitionRef.current);
        setIsListening(false);
        setIsSpeaking(false);
        setConversationActive(false);
        setShouldRespondToStepChange(false);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;
        await handleResult(input.trim());
        setInput('');
    };

    return (
        <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg border-l border-gray-200 z-50 flex flex-col transition-all">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-green-600">
                    {recipeData?.title || 'Cooking Assistant'}
                </h2>
                <button
                    onClick={() => {
                        closeAssistant();
                        stopConversation();
                    }}
                    className="text-gray-600 hover:text-red-600 text-2xl"
                >
                    <IoIosCloseCircleOutline />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                    disabled={isSpeaking}
                />
                {isSpeaking ? (
                    <button className="bg-red-600 text-white px-4 rounded-lg" onClick={stopConversation}>
                        Stop
                    </button>
                ) : (
                    <button className="bg-green-600 text-white px-4 rounded-lg" onClick={handleSend}>
                        Send
                    </button>
                )}
                <button
                    className={`rounded-full p-3 ${isListening ? 'bg-red-500' : 'bg-green-600'} text-white`}
                    onClick={startConversation}
                    disabled={isSpeaking}
                >
                    🎙
                </button>
            </div>
        </div>
    );
};

export default AssistantPanel;
