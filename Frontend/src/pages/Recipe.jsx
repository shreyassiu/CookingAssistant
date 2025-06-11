import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/custom/navbar';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/v1/food/recipe?ids=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipe(data[0]); // API returns array
            } catch (err) {
                console.error('Failed to fetch recipe:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
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
                        <h1 className="text-3xl font-bold text-green-600 mb-4">{recipe.title}</h1>
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
                        {recipe.extendedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.original}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="mt-10 bg-green-50 p-6 rounded-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Instructions</h2>
                    {recipe.instructions.includes('<li>') ? (
                        // Directly render if HTML list present
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
                    ) : (
                        // Else process as plain text and split into steps
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            {recipe.instructions
                                .split(/[\.\n]+/)
                                .filter(step => step.trim() !== '')
                                .map((step, index) => (
                                    <li key={index}>{step.trim()}.</li>
                                ))}
                        </ol>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Recipe;
