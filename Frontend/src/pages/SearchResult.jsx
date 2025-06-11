import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/custom/navbar';
import RecipeCard from '@/components/custom/recipeCard';

const SearchResult = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const autoCompleteRef = useRef();
    const [autoComplete, setAutoComplete] = useState([]);
    const [searchText, setSearchText] = useState(query);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vegOnly, setVegOnly] = useState(false);

    useEffect(() => {// Fetch search results when the component mounts or query changes
        const fetchSearchResults = async () => {

            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                let url = `${apiUrl}/api/v1/food/search?query=${query}`;
                if (vegOnly) url += `&diet=vegetarian`;

                const response = await fetch(url);
                const data = await response.json();
                if (!response.ok) throw new Error('Network response was not ok');
                console.log('Search Results:', data.results);
                setSearchResults(data.results);
            } catch (error) {
                console.log('Failed to fetch search results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query, vegOnly]);

    useEffect(() => {
        const fetchAutoComplete = async () => { // Fetch autocomplete suggestions when searchText changes
            const apiUrl = import.meta.env.VITE_API_URL;
            if (searchText.length > 2) {
                try {
                    const response = await fetch(`${apiUrl}/api/v1/food/autocomplete?query=${searchText}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setAutoComplete(data);
                } catch (err) {
                    console.error('Failed to fetch autocomplete:', err);
                }
            }
        }
        fetchAutoComplete();
    }, [searchText])

    useEffect(() => { // Handle click outside to close autocomplete suggestions
        console.log('AutoComplete Data:', autoComplete);
        const handleClickOutside = (event) => {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setAutoComplete([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        navigate(`/search/${e.target.innerText}`);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.length > 0) {
            navigate(`/search/${searchText}`);
        }
    };

    return (
        <div className="min-h-screen bg-white-100">
            <Navbar titleColour="text-green-600" />

            <div ref={autoCompleteRef} className="w-full flex justify-center py-6 bg-white shadow">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full max-w-lg p-3 border rounded-md shadow-sm"
                    placeholder="Search for dishes..."
                />
                {autoComplete.length > 0 && (
                    <div className='absolute top-50 z-50 flex flex-col w-full items-center'>
                        {autoComplete.map((item, index) => (
                            <div key={item.id} onClick={handleSearch} className=' flex items-baseline p-2 px-4 bg-white hover:bg-gray-100 cursor-pointer w-[90%] xl:w-[50%] max-h-60 overflow-y-auto shadow-lg'>
                                {item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-center py-4 bg-white shadow-sm">
                <label className=" flex items-center space-x-2 text-lg">
                    <input
                        type="checkbox"
                        checked={vegOnly}
                        onChange={() => setVegOnly(!vegOnly)}
                        className="h-5 w-5"
                    />
                    <span>Veg Only</span>
                </label>
            </div>

            <div className="px-6 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-[50vh] text-xl text-gray-500">
                        Loading...
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {searchResults.map((result) => (
                            <div className='cursor-pointer hover:scale-105 transition-transform duration-300' key={result.id} onClick={() => navigate(`/recipe/${result.id}`)}>
                                <RecipeCard key={result.id} {...result} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh] text-xl text-gray-500">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
