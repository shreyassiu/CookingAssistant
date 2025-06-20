import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModalShell = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-transparent w-[80%] sm:w-[400px] rounded-2xl p-8"
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "5%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ModalShell;
