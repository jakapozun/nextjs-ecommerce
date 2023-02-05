import React, {createContext, useContext, useState} from "react";
import {toast} from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const incQty = () => {
        setQty( (prev) => prev + 1);
    }

    const decQty = () => {
        setQty( (prev) => {
            if(prev - 1 < 1) return 1;
            return prev - 1;
        })
    }

    const onAdd = (product, qty) => {
        const checkProductInCart = cartItems?.find( (item) => item._id === product._id);
        setTotalPrice((prev) => prev + product.price * qty);
        setTotalQuantities( (prev) => prev + qty);

        if(checkProductInCart){
            const updatedCartItems = cartItems?.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, quantity: cartProduct.quantity + qty
                }
            })

            setCartItems(updatedCartItems);
        } else{
            product.quantity = qty;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }


    return <Context.Provider value={
    {
        showCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd,setShowCart
    }
    }>
        {children}
    </Context.Provider>
}

export const useStateContext = () => useContext(Context);
