import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import Filter from './Filter';
import Footer from './Footer';
function SearchResults() {
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search)
    const locationParams=queryParams.get('location')
    return (
        <div>
            <Navbar/>
            <div><Filter location={locationParams}/></div>
            <Footer/>
        </div>
    )
}

export default SearchResults