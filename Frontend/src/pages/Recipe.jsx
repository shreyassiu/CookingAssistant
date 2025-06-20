import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '@/components/custom/Navbar';
import { parseInstructions } from '../utils/parseInstructions';
import { useAssistant } from '@/context/AssistantContext';
import AssistantPanel from '@/components/custom/assistant/AssistantPanel';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [byUser, setByUser] = useState(false)
    const [loading, setLoading] = useState(false);
    const [instructions, setInstructions] = useState([]);
    const { openAssistant, isAssistantOpen } = useAssistant();
    const { state } = useLocation();

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (state?.result) {
            console.log(state.result)
            setByUser(true)
            setRecipe(state.result);
            setInstructions(state.result.instructions);
        } else {
            const fetchRecipe = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${apiUrl}/api/v1/food/recipe?ids=${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data[0])
                    setRecipe(data[0]);
                    setInstructions(parseInstructions(data[0].instructions || ''));
                } catch (err) {
                    console.error('Failed to fetch recipe:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-green-600">
                Loading...
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-green-600">
                No recipe found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar titleColour="text-green-600" />

            <div className="max-w-5xl mx-auto py-10 px-4">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md border border-gray-200 p-6 items-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-48 h-48 object-cover rounded-lg border border-gray-300 mb-6 md:mb-0 md:mr-8"
                    />

                    <div className="flex-1">
                        <div className='flex items-center justify-between'>
                            <h1 className="text-3xl font-bold text-green-600 mb-4">{recipe.title}</h1>
                            <button onClick={() => { openAssistant(recipe, instructions) }} className='bg-green-600 text-white rounded-xl p-2 px-4 mb-4 cursor-pointer shadow-md hover:bg-green-700 transition'>
                                Start cooking
                            </button>
                        </div>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>

                        <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                            <div><span className="font-semibold"> Servings:</span> {recipe.servings}</div>
                            <div><span className="font-semibold"> Ready In:</span> {recipe.readyInMinutes} min</div>
                            <div><span className="font-semibold"> Score:</span> {Math.round(recipe.spoonacularScore)}%</div>
                            <div><span className="font-semibold"> Price/Serving:</span> ${(recipe.pricePerServing / 100).toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="mt-10 bg-green-50 p-6 rounded-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {recipe.extendedIngredients.map((ingredient, index) =>
                            byUser ? (
                                <li key={index}>{ingredient}</li>
                            ) : (
                                <li key={index}>{ingredient.original}</li>
                            )
                        )}

                    </ul>
                </div>

                {/* Instructions */}
                <div className="mt-10 bg-green-50 p-6 rounded-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        {instructions.map((step, index) => (
                            <li key={index}>{step}.</li>
                        ))}
                    </ol>
                </div>


            </div>
            {isAssistantOpen && <AssistantPanel />}
        </div >
    );
};

export default Recipe;
