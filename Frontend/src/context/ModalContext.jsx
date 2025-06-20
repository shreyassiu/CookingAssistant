import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const openLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const closeModals = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    
  };

  return (
    <ModalContext.Provider value={{
      isLoginOpen, isSignupOpen, openLogin, openSignup, closeModals
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
