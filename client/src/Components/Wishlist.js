import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Wishlist.css';
import {Link,useLocation,useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { IoClose } from "react-icons/io5";
import Cookies from 'js-cookie'

function Wishlist() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search)
    const locationParams=queryParams.get('location')

    useEffect(()=>{
        const checkJWTCookie=()=>{
            const jwtCookie=Cookies.get("JWT");
            if(!jwtCookie){
                navigate('/notfound');
            }
        };
        checkJWTCookie();
    },[navigate])

    useEffect(()=>{
        const getUserEmail = async() => {
            const token = localStorage.getItem('userId');
            const response=await axios.get(`http://localhost:4000/user/userEmail/${token}`);
            console.log(response.data);
            setEmail(response.data.email);
        };

        getUserEmail();
    },[])

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/userWishlist/${email}`);
                setWishlist(response.data);
            } catch (error) {
                console.log("Error fetching items", error);
            }
        };
        fetchWishlist();
    }, [email]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = wishlist.map(item => axios.get(`http://localhost:4000/user/products/${item.productId}`));
                const productResponses = await Promise.all(productPromises);
                const productList = productResponses.map(res => res.data);
                setProducts(productList);
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };
        fetchProducts();
    }, [wishlist]);
    const deleteWishProduct=async(productId,userEmail)=>{
        try {
            console.log(productId)
            await axios.delete(`http://localhost:4000/user/delWishlist/${productId}/${userEmail}`);
            const updatedWishlist = wishlist.filter(item => item.productId !== productId);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.log("Error deleting product from wishlist", error);
        }
    }
    return (
        <>
            <div className='wishlist-header'>
                <Navbar/>
            </div>
            <div className='wishlist-products'>
                <div className='wish-left'></div>
                <div className='wish-centre'>
                    <div className='wish-products'>
                        {products.map(product => (
                            <div key={product._id} className="wish-product-cards">
                                <Link to={`/searchResults/${locationParams}/${product._id}`} className="link-to-more" key={product._id} reloadDocument>
                                    <img src={require(`../Uploads/${product.images[0]}`)} alt={product.name} className='wish-img'/>
                                </Link>
                                <p className='wish-name'>{product.name}</p>
                                <p className='wish-area'>{product.area}</p>
                                {/* <p className='wish-category'>{product.category}</p> */}
                                <div className='wish-last'>
                                    <p className='wish-price'>&#8377;{product.price}</p>
                                    <IoClose size={22}  color='#124559' onClick={()=>{deleteWishProduct(product._id,email)}}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='wish-right'></div>
            </div>
            <div className='wish-footer'>
                <Footer/>
            </div>
        </>
    );
}

export default Wishlist;
