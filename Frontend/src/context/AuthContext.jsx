import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        toast.success('Logged in successfuly!')
    };
    
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success('Logged out successfuly!')
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
