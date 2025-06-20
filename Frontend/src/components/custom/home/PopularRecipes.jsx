import React, { useEffect, useState } from 'react'
import RecipeCard from '../RecipeCard';
import { useNavigate } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;


const PopularRecipes = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/food/popular`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (err) {
                console.error('Failed to fetch recipes:', err);
            }
        }
        fetchRecipes();
    }, [])

    return (
        <div>
            <div className="popularRecipes">
                <div className='text-white text-4xl font-bold text-center'>
                    Popular Recipes
                </div>
                <div className='flex flex-wrap justify-center items-center gap-10 p-10 font-serif'>
                    {recipes.length > 0 ? recipes.map((recipe) => (
                        <div className='cursor-pointer hover:scale-105 transition-transform duration-300' onClick={() => navigate(`/recipe/${recipe.id}`)}>
                            <RecipeCard key={recipe.id} {...recipe} />
                        </div>
                    )) : <div className='text-white text-2xl'>Loading...</div>}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default PopularRecipes
