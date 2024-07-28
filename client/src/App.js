import React from 'react'
import './Styles/App.css'
import {Routes,Route} from 'react-router-dom'
import Welcome from './Components/Welcome';
import SearchResults from './Components/SearchResults';
import LoginSignUp from './Components/LoginSignUp';
import Cart from './Components/Cart';
import Wishlist from './Components/Wishlist';
import Profile from './Components/Profile';
import Stocks from './Components/Stocks';

function App() {
    window.addEventListener("scroll", reveal);
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        var rev = document.querySelectorAll(".rev");
        var revv = document.querySelectorAll(".revv");
        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100;
            if (reveals[i] && revealtop < windowheight - revealpoint) {
                reveals[i].classList.add("active");
            } else if (reveals[i]) {
                reveals[i].classList.remove("active");
            }
            if (rev[i] && revv[i] && revealtop < windowheight - revealpoint) {
                rev[i].classList.add("active");
                revv[i].classList.add("active");
            } else if (rev[i] && revv[i]) {
                rev[i].classList.remove("active");
                revv[i].classList.remove("active");
            }
        }
    }
    return (
        <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/searchResults' element={<SearchResults/>}/>
            <Route path='/loginRegister' element={<LoginSignUp/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/stocks' element={<Stocks/>}/>
        </Routes>
    )
}

export default App