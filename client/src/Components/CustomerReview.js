import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/CustomerReview.css'
import bg from '../Assets/bg.webp'
import first from '../Assets/first.png'
import second from '../Assets/second.png'
function CustomerReview() {
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
        <div className="review-container">
            <div className="review-left">Our Customer Loves Us</div>
            <div className="review-right">
                <div className="review-right-left">
                    <div className="right-header">
                        <div className="right-header-title">Be the First</div>
                        <div className="right-header-img">
                            <img src={first} alt='' className='right-head-img'/>
                        </div>
                    </div>
                    <div className="right-content">
                        <h3 className="right-content-txt">The built-in and extensible tools ensures customer to be first to book rooms.</h3>
                    </div>
                </div>
                <div className="review-right-right">
                    <div className="left-header">
                        <div className="left-header-title">Make them buy where<br/> they browse</div>
                        <div className="left-header-img">
                            <img src={second} alt='' className='left-head-img'/>
                        </div>
                    </div>
                    <div className="left-content">
                        <h3 className="left-content-txt">Make it easier for your buyers to shop from you,regardless of what social platform they're on.</h3>
                    </div>
                </div>
            </div>
            {/* <div className="review-slider revv">
                <Slider {...settings} className='review-center' ref={sliderRef}>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                    <div className="review-cardsi">
                        <img src={bg} alt='' className='review-img'/>
                    </div>
                </Slider>
                <div className='slider-arrows'>
                    <MdKeyboardArrowLeft className='slider-arrow left' onClick={() => sliderRef.current.slickPrev()} />
                    <MdKeyboardArrowRight className='slider-arrow right' onClick={() => sliderRef.current.slickNext()} />
                </div>
            </div> */}
            <div className="review-border"></div>
        </div>
    )
}

export default CustomerReview