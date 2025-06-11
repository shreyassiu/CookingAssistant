import React, { useEffect,useRef,useState } from 'react'
import {useNavigate} from 'react-router-dom';

const slide1 = () => {
    const [searchText, setSearchText] = useState('');
    const autoCompleteRef = useRef(null);
    const [autoComplete, setAutoComplete] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAutoComplete = async () => {
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
    useEffect(() => {
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
        if (e.key === 'Enter' && searchText.length > 2) {
            navigate(`/search/${searchText}`);
        }
    }

    return (
        <div>
            <div className='flex flex-col h-[65vh] w-[100vw] md:flex-row items-center px-4 gap-5 relative z-10'>

                <div className='hidden xl:block absolute -left-8 top-1/2 transform -translate-y-1/2'>
                    <img className='h-90 w-90 m-0 object-contain' src="/chef.png" alt="" />
                </div>

                <div className='flex flex-col items-center w-full justify-around md:w-[100vw] gap-10 text-center'>
                    <h1 className='text-3xl xl:text-5xl text-white font-bold w-[90%] md:w-[55%]'>
                        Make delicious dishes with the help of a Voice Assistant!
                    </h1>
                    <div ref={autoCompleteRef} className='flex flex-col items-center justify-center w-full relative '>
                        <input
                            type="text"
                            placeholder='Search for recipes'
                            name='search'
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className='bg-white p-2 px-4 w-[90%] xl:w-[50%] h-14 rounded-2xl placeholder:text-lg focus:outline-none focus:ring-4 focus:ring-white/50'
                        />
                        {autoComplete.length > 0 && (
                            <div className='absolute top-15 z-50 flex flex-col w-full items-center'>
                                {autoComplete.map((item, index) => (
                                    <div key={item.id} onClick={handleSearch}  className=' flex items-baseline p-2 px-4 bg-white hover:bg-gray-100 cursor-pointer w-[90%] xl:w-[50%] max-h-60 overflow-y-auto shadow-lg'>
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='hidden xl:block absolute -right-10 transform translate-y-1/14'>
                    <img className='h-[607.5px] w-[337.5px] m-0 p-0 object-contain' src="/Sushi_replace.avif" alt="" />
                </div>
            </div>
        </div>
    )
}

export default slide1
