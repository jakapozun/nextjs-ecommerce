import React from 'react';
import {FaFacebook, FaInstagram} from "react-icons/fa";

const Footer = () => {
    return (
        <div className={'footer-container'}>
            <p>2023 Next Ecommerce</p>
            <p className={'icons'}>
                <FaInstagram />
                <FaFacebook />
            </p>
        </div>
    );
};

export default Footer;
