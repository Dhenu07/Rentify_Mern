import React, { useState,useEffect } from 'react';
import { IoHome, IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import '../Styles/Navbar.css'
import axios from 'axios';
const suggestions = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 
    'Virudhunagar'
];


export default function Navbar() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [seller,setSeller]=useState(false);
    // const [user,setUser]=useState(false);
    const [name,setName] = useState('');
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        axios.get(`http://localhost:4000/auth/profile/${userId}`)
            .then(response => {
                const { firstName, role } = response.data;
                console.log(response.data)
                if (role === 'Seller') {
                    setSeller(true);
                    setName(firstName);
                } else if (role === 'User') {
                    // setUser(true);
                    setName(firstName);
                }
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
            });
    }, []);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSearch = () => {
        navigate(`/searchResults?location=${encodeURIComponent(location)}`);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else {
            const inputText = event.target.value.toLowerCase();
            const filteredSuggestions = suggestions.filter((suggest) =>
                suggest.toLowerCase().startsWith(inputText)
            );
            setSuggestedLocations(filteredSuggestions);
        }
    };

    const handleLocationClick = (location) => {
        setLocation(location);
        setSuggestedLocations([]);
    };

    const handleSeller=()=>{
        navigate('/stocks')
    }

    const handleLogout = () => {
        axios.post("http://localhost:4000/auth/logout")
        .then((res) => {
            if (res.status === 200) {
                alert(`Logout successful!`);
                navigate("/");
            } 
            else {
                alert("Unexpected response status: " + res.status);
            }
        })
        .catch((err) => console.log(err));
        localStorage.removeItem('userId')
    };
    const isLoggedIn = !!localStorage.getItem('userId');

    return (
        <div className="header">
            <div className="icon">
                <Link to='/'><IoHome size={50}/></Link>
                <span>Rentify</span>
            </div>
            <div className="navbar">
                <div className="search-bar">
                    <input type="search" placeholder="Search By Location" className="search-input" value={location} onChange={(e) => setLocation(e.target.value)} onKeyPress={handleKeyPress}/>
                    <IoSearchSharp size={20} color="grey" className="search-icon" onClick={handleSearch} />
                </div>
                {suggestedLocations.length > 0 && (
                    <div className="suggestions-container">
                        {suggestedLocations.map((location, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleLocationClick(location)}
                            >
                                {location}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="user-properties">
                {seller?(
                    <button className="sell-opt" onClick={handleSeller}>Seller</button>
                ):(
                    <p className='user-role'>{name}</p>
                )}
                <div className='wishlist'>
                    <Link to='/wishlist'><CiHeart size={40} color='#FF0008'/></Link>
                </div>
                {/* <div className='cart'>
                    <Link to='/cart'><FaShoppingCart size={30} color='black'/></Link>
                </div> */}
                {isLoggedIn ? (
                    <div className='profile'>
                        <IoPersonCircleSharp size={40} color='#FF0008' onClick={toggleProfileDropdown} />
                        {isProfileDropdownOpen && (
                            <div className='profile-dropdown'>
                                <Link to='/profile' className='nav-link-details'>
                                    Profile<CgProfile color='#FF0008'size={25}/>
                                </Link>
                                <div className='divider'></div>
                                <div className='nav-link-details' onClick={handleLogout}>
                                    Logout<MdLogout color='#FF0008' size={25}/>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='loginbutton'>
                        <Link to='/loginregister' className='nav-link'>
                            <button className='login'>LOGIN</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
