import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/Product.css'
import bg from '../Assets/bg.webp'
function Products() {
    const sliderRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 6000,
    };
    return (
        <div className='product-container'>
            <div className="product-left rev">Rentals</div>
            <div className="product-right reveal">
                <img src={bg} alt='' className='product-imag'/>
            </div>
            <div className="product-slider revv">
                <Slider {...settings} className='product-center' ref={sliderRef}>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                    <div className="cardsi">
                        <img src={bg} alt='' className='card-img'/>
                    </div>
                </Slider>
                <div className="slider-arrows">
                    <MdKeyboardArrowLeft className='slider-arrow left' onClick={() => sliderRef.current.slickPrev()} />
                    <MdKeyboardArrowRight className='slider-arrow right' onClick={() => sliderRef.current.slickNext()} />
                </div>
            </div>
        </div>
    )
}

export default Products