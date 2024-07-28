import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../Styles/Filter.css'

function FilterResults({val,location}) {
    const navigate=useNavigate();
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(12);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/items/${location}`);
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location]);

    const filteredItems = items.filter((item) => {
        const priceRange = val.price && val.price.length > 0 ? val.price[0].split('-').map(Number) : null;
        const isPriceInRange = priceRange
            ? item.price >= priceRange[0] && item.price <= priceRange[1]
            : true;

        return (
            (!val.category || val.category.length === 0 || val.category.includes(item.category))&&
            (!val.available || val.available.length === 0 || val.available.includes(item.available)) &&
            (!val.bathrooms || val.bathrooms.length === 0 || val.bathrooms.includes(item.bathrooms)) &&
            (!val.ageOfProperty || val.ageOfProperty.length === 0 || val.ageOfProperty.includes(item.ageOfProperty)) &&
            (!val.amenities || val.amenities.length === 0 || val.amenities.some((amenities)=>item.amenities.includes(amenities))) &&
            (!val.area || val.area.length === 0 || val.area.includes(item.area)) &&
            (!val.furnishes || val.furnishes.length === 0 || val.furnishes.includes(item.furnished)) &&
            isPriceInRange
        );
    });


    const visibleItemsData = filteredItems.slice(0, visibleItems);

    const handleExploreMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 12);
    };

    const getUserEmail = () => {
        const token = localStorage.getItem('token');
        let user = [];
        user = token.split(',');
        return user[1];
    };

    const addToCart = async (itemId) => {
        try {
            const userEmail = getUserEmail();
            console.log(userEmail);
            await axios.post('http://localhost:4000/user/addToCart', {
                userEmail: userEmail,
                productId: itemId
            });
            navigate('/cart')
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div>
            <section className="card-container">
                {visibleItemsData.map((item)=>(
                    <section className="card-list" key={item.id}>
                        <Link to={`/productDetails/${location}/${item._id}`} className='link-to-more' key={item.id}>
                            <img src={require(`../Uploads/${item.images[0]}`)} alt={item.name} className='card-img-result' />
                        </Link>
                        <div className="card-details">
                            <div className="card-title">{item.name}</div>
                            <div className="card-title">{item.area}</div>
                            <section className="card-price">
                                <div className="price-item">
                                    &#8377;{item.price}
                                </div>
                                <div className="sqft-item">{item.sqft}</div>
                                <div className="category item">{item.category}</div>
                                <div className="time-posted">{item.time}</div>
                                <div className="contact">{item.number}</div>
                                <div className="bag" onClick={() => addToCart(item._id)}>
                                    <BsBagHeartFill className="bag-icon" size={20} />
                                </div>
                            </section>
                        </div>
                    </section>
                ))}
            </section>
            {visibleItems < filteredItems.length && (
                <div className="explore-more-container">
                    <button className="explore-more-results" onClick={handleExploreMore}>
                        Explore more
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilterResults