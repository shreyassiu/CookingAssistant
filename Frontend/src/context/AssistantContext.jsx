import React, { createContext, useState, useContext, useEffect } from 'react';

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [recipeData, setRecipeData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [instructionsArray, setInstructionsArray] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    const openAssistant = (recipe, parseInstructions) => {

        const isSameRecipe =
            recipeData &&
            recipe &&
            (
                (recipeData.id && recipe.id && recipeData.id === recipe.id) ||
                (recipeData._id && recipe._id && recipeData._id === recipe._id)
            );
        console.log(isSameRecipe)
        setRecipeData(recipe);
        if (!isSameRecipe) {
            setMessages([
                {
                    id: Date.now(), text: "👋 Hello! Before you begin, make sure you have all your ingredients ready \nYou can communicate using:- \"start\", \"next\" or \"next step\", \"repeat\", \"go to step X\", \"ingredients\", \"stop\" "
                    , sender: 'assistant'
                }
            ]);
            setInstructionsArray(parseInstructions)
            setCurrentStep(0);
        }
        setIsAssistantOpen(true);
    };

    const closeAssistant = () => {
        console.log("closing assistant")
        setIsAssistantOpen(false);
    };

    return (
        <AssistantContext.Provider value={{
            isAssistantOpen,
            instructionsArray,
            openAssistant,
            closeAssistant,
            setRecipeData,
            recipeData,
            messages,
            setMessages,
            currentStep,
            setCurrentStep
        }}>
            {children}
        </AssistantContext.Provider>
    );
};

export const useAssistant = () => useContext(AssistantContext);
