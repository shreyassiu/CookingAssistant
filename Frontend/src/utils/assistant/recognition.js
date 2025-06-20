let recognition;

export const initRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition API not supported");
        return null;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false  ;
    recognition.lang = 'en-US';
    return recognition;
};

export const startListening = (recognitionInstance, isListening, isSpeaking, setIsListening, onResultCallback) => {
    if (!recognitionInstance || isListening || isSpeaking) return;

    recognitionInstance.start();
    setIsListening(true);

    recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        onResultCallback(transcript);
    };

    recognitionInstance.onerror = () => {
        setIsListening(false);
    };

    recognitionInstance.onend = () => {
        setIsListening(false);
    };
};

export const stopListening = (recognitionInstance) => {
    if (recognitionInstance) {
        recognitionInstance.stop();
    }
};