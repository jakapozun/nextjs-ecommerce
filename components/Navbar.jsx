import React from 'react';
import Link from "next/link";
import {FaShoppingCart} from "react-icons/fa";
import {useStateContext} from "../context/StateContext";
import Cart from "./Cart";

const Navbar = () => {

    const {showCart,setShowCart, totalQuantities} = useStateContext();
    return (
        <div className={'navbar-container'}>
            <p className={'logo'}>
                <Link href={'/'}>
                    Headphones
                </Link>
            </p>
            <button type={'button'} className={'cart-icon'} onClick={() => setShowCart(true)}>
                <FaShoppingCart />
                <span className={'cart-item-qty'}>{totalQuantities}</span>
            </button>

            {
                showCart && <Cart />
            }
        </div>
    );
};

export default Navbar;
