import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Recipe from './pages/Recipe';
import AuthModal from './components/custom/Authorization/AuthModal';
import AddRecipePage from './pages/AddRecipe';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/custom/Authorization/ProtectedRoutes';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        
        <Route path="/add-recipe" element={
            <ProtectedRoute>
              <AddRecipePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <AuthModal />
    </>
  );
}

export default App;
