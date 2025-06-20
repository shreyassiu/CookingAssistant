import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { openLogin } = useModal();

  if (!isAuthenticated) {
    openLogin(); // trigger modal instead of redirect
    return null;
  }

  return children;
};


export default ProtectedRoute;
