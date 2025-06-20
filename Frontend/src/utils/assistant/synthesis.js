// synthesis.js

export const speakAssistantReply = (text, setIsSpeaking, onComplete) => {
    if (!window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    utterance.onend = () => {
        setIsSpeaking(false);
        if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
    window.speechSynthesis.cancel();
};
