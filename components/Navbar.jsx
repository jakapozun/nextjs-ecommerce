import React from 'react';
import Link from "next/link";
import {FaShoppingCart} from "react-icons/fa";

const Navbar = () => {
    return (
        <div className={'navbar-container'}>
            <p className={'logo'}>
                <Link href={'/'}>
                    Headphones
                </Link>
            </p>
            <button type={'button'} className={'cart-icon'}>
                <FaShoppingCart />
                <span className={'cart-item-qty'}>5</span>
            </button>
        </div>
    );
};

export default Navbar;
