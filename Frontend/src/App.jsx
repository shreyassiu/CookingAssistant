import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import Recipe from './pages/Recipe'
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/search/:query" element={<SearchResult/>} />
          <Route path="/recipe/:id" element={<Recipe/>} />
        </Routes>
    </>
  )
}

export default App
