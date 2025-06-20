import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/custom/Navbar';
import RecipeCard from '@/components/custom/RecipeCard';

const SearchResult = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const autoCompleteRef = useRef();
    const [autoComplete, setAutoComplete] = useState([]);
    const [searchText, setSearchText] = useState(query);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vegOnly, setVegOnly] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                let url = `${apiUrl}/api/v1/food/search?query=${query}`;
                if (vegOnly) url += `&diet=vegetarian`;

                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                if (!response.ok) throw new Error('Network response was not ok');
                setSearchResults(data);
            } catch (error) {
                console.log('Failed to fetch search results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query, vegOnly]);

    useEffect(() => {
        const fetchAutoComplete = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (searchText.length > 2) {
                try {
                    const response = await fetch(`${apiUrl}/api/v1/food/autocomplete?query=${searchText}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setAutoComplete(data);
                } catch (err) {
                    console.error('Failed to fetch autocomplete:', err);
                }
            }
        };
        fetchAutoComplete();
    }, [searchText]);

    useEffect(() => {
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
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.length > 0) {
            navigate(`/search/${searchText}`);
        }
    };

    const handleNavigate = (result) => {
        if (result.source === "local")
            navigate(`/recipe/${result._id}`, { state: { result } })
        else {
            navigate(`/recipe/${result.id}`)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar titleColour="text-green-600" />

            {/* Search Bar + Toggle */}
            <div className="w-full flex flex-col items-center pt-6 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <div ref={autoCompleteRef} className="relative w-full sm:w-auto flex justify-center">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for dishes..."
                            className="bg-white p-3 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-14 rounded-full placeholder:text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200"
                        />
                        {autoComplete.length > 0 && (
                            <div className="absolute top-full mt-2 z-50 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-xl shadow-lg overflow-y-auto max-h-64 border border-gray-200">
                                {autoComplete.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={handleSearch}
                                        className="p-3 px-5 cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center space-x-3 mt-1 sm:mt-0">
                        <span className="text-lg">Veg Only</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={vegOnly}
                                onChange={() => setVegOnly(!vegOnly)}
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-[50vh] text-xl text-gray-500">
                        Loading...
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {searchResults.map((result) => (
                            <div
                                key={result.id}
                                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                                onClick={() => handleNavigate(result)}
                            >
                                <RecipeCard {...result} />
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
