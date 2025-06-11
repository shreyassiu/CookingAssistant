import React from 'react'
import {Button} from '../ui/button'

const navbar = ({titleColour = "text-white"}) => {
    return (
        <div>
            <div className='flex items-center p-10  text-white font-bold justify-around'>
                <h1 className={`text-4xl text-center font-bold ${titleColour}`}>RecipeAI</h1>
                <ul className='flex justify-between items-center gap-20 '>
                    <li><Button size="lg">Sign In</Button></li>
                </ul>
            </div>
        </div>
    )
}

export default navbar
