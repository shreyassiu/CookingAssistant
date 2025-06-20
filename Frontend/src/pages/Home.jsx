import React,{useEffect} from 'react'
import Navbar from '../components/custom/Navbar'
import Slide1 from '../components/custom/home/Slide1'
import PopularRecipes from '../components/custom/Home/PopularRecipes'
const Home = () => {
    
    return (
        <div className='bg-green-600 min-h-screen h-auto w-[100vw] relative overflow-hidden'>
            <Navbar />
            <Slide1 />
            <PopularRecipes/>
        </div>
    )
}

export default Home
