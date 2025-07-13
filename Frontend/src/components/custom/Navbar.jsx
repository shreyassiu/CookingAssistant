import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = ({ titleColour = "text-white" }) => {
    const { openLogin } = useModal();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const background = titleColour === "text-white" ? "bg-green-600" : "bg-white";
    const [menuOpen, setMenuOpen] = useState(false);

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className={`${background} ${titleColour} font-bold`}>
            <div className="flex items-center p-10 justify-around">
                <h1
                    className={`text-4xl text-center font-bold cursor-pointer hover:scale-105 transition`}
                    onClick={handleTitleClick}
                >
                    RecipeAI
                </h1>

                {/* Hamburger icon (mobile only) */}
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(prev => !prev)} aria-label="Toggle Menu">
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop menu */}
                <ul className='hidden lg:flex items-center gap-10'>
                    <li>
                        <button
                            className='cursor-pointer hover:scale-105 transition'
                            onClick={() => {
                                if (!isAuthenticated) openLogin();
                                else navigate('/add-recipe');
                            }}
                        >
                            Add your own recipe
                        </button>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <button className='cursor-pointer hover:scale-105 transition' onClick={logout}>Log out</button>
                        </li>
                    )}
                    <li><button className='cursor-pointer'></button></li>
                </ul>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <ul className="flex flex-col items-center gap-4 pb-4 lg:hidden">
                    <li>
                        <button
                            className='cursor-pointer hover:scale-105 transition'
                            onClick={() => {
                                setMenuOpen(false);
                                if (!isAuthenticated) openLogin();
                                else navigate('/add-recipe');
                            }}
                        >
                            Add your own recipe
                        </button>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <button className='cursor-pointer hover:scale-105 ' onClick={() => { setMenuOpen(false); logout(); }}>
                                Log out
                            </button>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li>
                            <button className='cursor-pointer hover:scale-105 ' onClick={() => { setMenuOpen(false); openLogin(); }}>
                                Log in
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
