import React from 'react';
import '../Styles/Footer.css';
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='footer-container'>
        <div className='footer-header'>
            <h1>RENTIFY</h1>
        </div>
        <div className='foot-container'>
            <div className='foot-left'>
            <div className='contact'>
                <div className='left-head'>CONTACT</div>
                <div className='mobile'>
                    <div className='mobile-icon'><BsTelephone size={30}/></div>
                    <div className='mobile-number'>+91 1234567890</div>
                </div>
                <div className='address'>
                    <div className='address-icon'><CiLocationOn size={30}/></div>
                    <div className='address-line'>ABC, South Street, Chennai-600008</div>
                </div>
            </div>
            </div>
            <div className='vertical-divider'></div>
            <div className='foot-center'>
                <div className='center-head'>HOME RENTAL</div>
                <ul className='footer-list'>
                    <li>1BH</li>
                    <li>2BH</li>
                    <li>Flats</li>
                    <li>Apartments</li>
                    <li>Beach View</li>
                </ul>
            </div>
            <div className='vertical-divider'></div>
            <div className='foot-right'>
                <div className='right-head'>SOCIAL</div>
                <div className='social'>
                    <ul className='social-list'>
                    <li><FaInstagram size={30} /></li>
                    <li><FaFacebook size={30}/></li>
                    <li><FaYoutube size={30} /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer-copy'>&copy; Rentify India, All Rights Reserved</div>
        </div>
    );
}

export default Footer;
