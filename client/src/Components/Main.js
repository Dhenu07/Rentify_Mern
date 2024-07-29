import React from 'react'
import {Link} from 'react-scroll'
import '../Styles/Main.css'
import bg from '../Assets/renty.jpg'
export default function Main() {
    return (
        <div className="content">
            <div className="right">
                <img src={bg} alt='Rental' className='rental'/>
            </div>
            <div className="left">
                <div className="welcome">Welcome to Rentify</div>
                <div className="explore">Search your dream house....</div>
                <Link to='product-container' smooth={true} duration={1100}>
                    <button className='explore-btn'>Explore</button>
                </Link>
            </div>
        </div>
    )
}
