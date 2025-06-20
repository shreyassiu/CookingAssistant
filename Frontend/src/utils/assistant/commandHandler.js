import axios from "axios";

export async function handleUserCommand(input, instructionsArray, currentStep, recipeData, stopConversation) {
    const lower = input.toLowerCase().trim();
    const lastIndex = instructionsArray.length - 1;

    if (lower === 'start') {
        const target = 0;
        const reply = `Step ${target + 1} : ` + instructionsArray[target] || "No instructions available.";
        return { newStep: target, reply };
    }

    if (lower === 'next' || lower === "next step") {
        const target = currentStep + 1;
        if (target <= lastIndex) {
            const reply = `Step ${target + 1} : ` + instructionsArray[target];
            return { newStep: target, reply };
        } else {
            return { newStep: currentStep, reply: "You have reached the final step." };
        }
    }

    if (lower.includes('repeat') || lower.includes('again')) {
        const reply = `Step ${currentStep + 1} : ` + instructionsArray[currentStep] || "No instruction found.";
        return { newStep: currentStep, reply };
    }

    const goToMatch = lower.match(/go to step (\d+)/);
    if (goToMatch) {
        const idx = parseInt(goToMatch[1], 10) - 1;
        if (idx >= 0 && idx <= lastIndex) {
            const reply = `Step ${idx + 1} : ` + instructionsArray[idx];
            return { newStep: idx, reply };
        } else {
            return { newStep: currentStep, reply: "Sorry, that step number is out of range." };
        }
    }

    if (lower === 'ingredients') {
        const ingredientsList = recipeData?.extendedIngredients
            ?.map(ing => ing.original)
            .join(', ');
        const reply = ingredientsList
            ? `Here are the ingredients: ${ingredientsList}`
            : "I don't have the ingredients list.";
        return { newStep: currentStep, reply };
    }

    if (lower === 'stop' || lower === 'exit' || lower === 'end') {
        stopConversation();
        return { newStep: currentStep, reply: "Stopping the assistant. Let me know if you need me again!" };
    }
    if (lower === "thank you") {
        return { newStep: currentStep, reply: "You're very welcome!Happy to assist you." };
    }
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        const url = `${apiUrl}/api/v1/assistant/`;

        const response = await axios.post(url, {
            recipeData,
            query: lower,
            currentStep
        });
        const data = response.data;
        console.log(data.response);
        return { newStep: currentStep, reply: data.response }
    } catch (error) {
        console.error('Failed to fetch assistant results:', error);
    }


}
