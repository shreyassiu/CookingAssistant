import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AssistantProvider } from './context/AssistantContext'
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AssistantProvider>
        <ModalProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ModalProvider>
      </AssistantProvider>
    </BrowserRouter>
  </StrictMode>,
)
