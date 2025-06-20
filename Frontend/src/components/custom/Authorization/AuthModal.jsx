import React from 'react';
import ModalShell from '../ModalShell';
import Login from './Login';
import Signup from './SignUp';
import { useModal } from '@/context/ModalContext';

const AuthModal = () => {
    const { isLoginOpen, isSignupOpen, closeModals } = useModal();

    const isOpen = isLoginOpen || isSignupOpen;
    return (
        <ModalShell isOpen={isOpen} onClose={closeModals}>
            {isLoginOpen && <Login />}
            {isSignupOpen && <Signup />}
        </ModalShell>
    );
};

export default AuthModal;
