import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Cart.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
function Cart() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [showPaymentSelection, setShowPaymentSelection] = useState(false);

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
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/userCart/${email}`);
                setCart(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error fetching items", error);
            }
        };
        fetchCart();
    }, [email]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = cart.map(item => axios.get(`http://localhost:4000/user/products/${item.productId}`));
                const productResponses = await Promise.all(productPromises);
                const productList = productResponses.map(res => res.data);
                setProducts(productList);
                console.log(productList)
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };
        fetchProducts();
    }, [cart]);

    const deleteCartProduct = async (productId, userEmail) => {
        try {
            await axios.delete(`http://localhost:4000/user/delCart/${productId}/${userEmail}`);
            const updatedCart = cart.filter(item => item.productId !== productId);
            setCart(updatedCart);
        } catch (error) {
            console.log("Error deleting product from cart", error);
        }
    };

    const placeOrder = () => {
        setShowPaymentSelection(true);
    };

    const handlePaymentSelection = async (paymentType) => {
        const total = cart.reduce((total, item) => {
            const product = products.find(p => p._id === item.productId);
            return total+product.price ;
        }, 0);
        if (paymentType === 'online') {
            var options = {
                key: "rzp_test_D6uvdHaGMJkfge",
                key_secret: "9ndBhyXumgmepSEjHigyA1sH",
                amount: total * 100,
                currency: "INR",
                name: "House Rental",
                description: "for testing purpose",
                handler: async function (response) {
                    const orderDetails = {
                        products: cart.map(item => ({
                            productId: item.productId,
                        })),
                        email: email,
                        price:total,
                        paymentType: 'online',
                    };

                    try {
                        await axios.post('http://localhost:4000/user/orders', orderDetails);
                        navigate('/orders');
                    } catch (error) {
                        console.error("Error storing order details:", error);
                    }
                },
                prefill: {
                    name: "Dev",
                    email: email,
                    contact: "7904093855"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        } 
        else if (paymentType === 'cash') {
            console.log("Cash on Delivery Selected");
            const orderDetails = {
                products: cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
                email: email,
                price:total,
                paymentType: 'cash',
            };
            try {
                await axios.post('http://localhost:4000/user/orders', orderDetails);
                navigate('/');
            } catch (error) {
                console.error("Error storing order details:", error);
            }
        }
        setShowPaymentSelection(false);
    };
    return (
        <>
            <div className='cart-header'>
                <Navbar />
            </div>
            <div className='cart-products'>
                <div className='cart-left'></div>
                <div className='cart-centre'>
                    <div className='cart-products-top'>
                        <div className='cart-bag'></div>
                        <div className='cart-payment'></div>
                    </div>
                    <div className='cart-products-body'>
                        <div className='cart-products-details'>
                            {products.map(product => (
                                <React.Fragment key={product._id}>
                                    <div className="cart-product-cards">
                                        <div className='cart-img'>
                                            <Link to='' className="link-to-more" key={product._id} reloadDocument>
                                                <img src={require(`../Uploads/${product.images[0]}`)} alt={product.name} className='cart-img-res' />
                                            </Link>
                                        </div>
                                        <div className='cart-res-text'>
                                            <div className='cart-text'>
                                                <p className='cart-name'>{product.name}</p>
                                                <p className='cart-area'>{product.area}</p>
                                                {/* <p className='cart-category'>{product.category}</p> */}
                                                <p className='cart-price'>&#8377;{product.price}</p>
                                            </div>
                                            <div className='cart-last'>
                                                <IoClose size={22} color='#124559' onClick={() => { deleteCartProduct(product._id, email) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='cart-divider'></div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='cart-products-total'>
                            <div className='total-header'>PRICE DETAILS ({cart.length} item)</div>
                            <div className='total-products-name'>
                                <div className='total-name'>
                                    {cart.map(item => {
                                        const product = products.find(p => p._id === item.productId);
                                        return (
                                            <div className='pro-name' key={item.productId}>
                                                {product && product.name}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='total-price-products'>
                                    {cart.map(item => {
                                        const product = products.find(p => p._id === item.productId);
                                        const totalPrice = product ? product.price : 0;
                                        return (
                                            <div className='pro-name' key={item.productId}>
                                                {product && product.price && (
                                                    <>&#8377;{totalPrice}</>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='total-divider'></div>
                            <div className='total-amount'>
                                <div className='t-amount'>TOTAL AMOUNT</div>
                                <div className='t-price'>
                                    <div className='t-price'>
                                         {cart.map(item => {
                                            const product = products.find(p => p._id === item.productId);
                                            const totalPrice = product ? product.price : 0;
                                            return (
                                                <div className='pro-name' key={item.productId}>
                                                    {product && product.price && (
                                                        <>&#8377;{totalPrice}</>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='total-divider'></div>
                            <button className='order-btn' onClick={placeOrder}>Place Order</button>
                            {showPaymentSelection && (
                                <div className="payment-selection">
                                    <div className='pay-header'>Payment Type</div>
                                    <div className='pay'>
                                        <button onClick={() => handlePaymentSelection('online')} className='pay-online'>Online Payment</button>
                                        <button onClick={() => handlePaymentSelection('cash')} className='pay-offline'>Cash on Visit</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='cart-right'></div>
            </div>
            <div className='cart-footer'>
                <Footer />
            </div>
        </>
    );
}

export default Cart;