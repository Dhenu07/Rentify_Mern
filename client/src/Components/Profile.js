import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/profile.css'
import Navbar from './Navbar';
import Footer from './Footer';
function Profile() {
    const [email, setEmail] = useState('');
    const [user,setUser]=useState([]);
    const [orders,setOrders]=useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getUserEmail = async() => {
            const token = localStorage.getItem('userId');
            const response=await axios.get(`http://localhost:4000/user/userEmail/${token}`);
            // console.log(response.data);
            setEmail(response.data.email);
        };

        getUserEmail();
    },[])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/user/${email}`);
                setUser(response.data);
            } catch (error) {
                console.log("Error fetching user", error);
            }
        }
        fetchUser();
    }, [email]);

    useEffect(()=>{
        const fetchOrderHistory=async()=>{
            try{
                const response=await axios.get(`http://localhost:4000/user/orderHistory/${email}`)
                setOrders(response.data);
                // console.log(response.data);
            }
            catch(error){
                console.log("Error fetching items", error);
            }
        }
        fetchOrderHistory();
    },[email])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productIds = orders.map(order => order.products.map(product => product.productId));
                const flattenedProductIds = productIds.flat();
                const uniqueProductIds = [...new Set(flattenedProductIds)];

                const productsPromises = uniqueProductIds.map(productId =>
                    axios.get(`http://localhost:4000/user/products/${productId}`)
                );
                const productsResponses = await Promise.all(productsPromises);
                const productsData = productsResponses.map(response => response.data);

                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (orders.length > 0) {
            fetchProducts();
        }
    }, [orders]);

    return (
        <div>
            <div className='profile-top'>
                <Navbar/>
            </div>
            <div className='profile-details'>
                <div className='profile-left'></div>
                <div className='profile-centre'>
                    <div className='profile-pic'></div>
                    <div className='profile-details-user'>
                        <div className='personal-details'>Personal Details:</div>
                        <div className='profile-name'>Name: {user.username}</div>
                        <div className='horizontal-divider'></div>
                        <div className='profile-email'>Email: {email}</div>
                        <div className='horizontal-divider'></div>
                        <div className='profile-mobile'>Mobile: {user.mobile}</div>
                        <div className='horizontal-divider'></div>
                        {/* {orders.map(order=>(
                            <>
                                <div className='profile-address'>Address: {order.address}</div>
                            </>
                        ))} */}
                    </div>
                    <div className='order-history-profile'>
                        <div className='order-history-name'>Order History:</div>
                        {products.map(product => (
                            <div className='order-his-details'>
                                <div className='profile-brand'>House Type: {product.name}</div>
                                <div className='profile-name'>Area Name: {product.area}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profile-right'></div>
            </div>
            <div className='profile-foot'>
                <Footer/>
            </div>
        </div>
    )
}

export default Profile