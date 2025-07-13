import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { openLogin, closeModals } = useModal();
    const { login } = useAuth();

    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (name.length < 2) {
            setError('Name must be at least 2 characters long');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${backendURL}/api/v1/auth/signup`, {
                name,
                email,
                password,
            });

            const { token, user } = res.data;
            login(user, token);
            toast.success('Signed up successfully!')
            setTimeout(() => {
                closeModals();
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[300px] sm:w-[400px] bg-white border relative border-green-300 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center">
            <button
                onClick={closeModals}
                className="absolute top-2 right-4 text-green-600 text-2xl font-bold focus:outline-none cursor-pointer"
            >
                &times;
            </button>
            <h1 className="text-2xl font-semibold text-green-600 mb-6">Create an account</h1>

            <form className="w-full" onSubmit={handleSubmit}>

                <div className="flex flex-col w-full mb-4">
                    <label className="mb-2 text-green-700 font-medium" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                </div>

                <div className="flex flex-col w-full mb-4">
                    <label className="mb-2 text-green-700 font-medium" htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                </div>

                <div className="flex flex-col w-full mb-6">
                    <label className="mb-2 text-green-700 font-medium" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <button
                    type="submit"
                    className="bg-green-500 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition-all w-full"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>

            <div className='flex gap-2 mt-2'>Already have an account? <p onClick={() => openLogin()} className='cursor-pointer text-green-500'>Log in</p></div>
        </div>
    );
};

export default Signup;
