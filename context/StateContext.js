import React, {createContext, useContext, useState} from "react";
import {toast} from "react-hot-toast";
import cart from "../components/Cart";

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty( (prev) => prev + 1);
    }

    const decQty = () => {
        setQty( (prev) => {
            if(prev - 1 < 1) return 1;
            return prev - 1;
        })
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems?.find( (item) => item._id === id);
        index = cartItems.findIndex( (product) => product._id === id);
        const newCartItems = cartItems.filter( (item) => item._id !== id);
        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice( (prev) => prev + foundProduct.price)
            setTotalQuantities((prev) => prev + 1);
        } else if('dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice( (prev) => prev - foundProduct.price)
                setTotalQuantities((prev) => prev - 1);
            }
        }
    }

    const onRemove = (product) => {
        foundProduct = cartItems?.find( (item) => item._id === product._id);
        const newCartItems = cartItems.filter( (item) => item._id !== product._id);
        setTotalPrice( (prev) => prev - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prev) => prev - foundProduct.quantity);
        setCartItems(newCartItems);
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
        showCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd,setShowCart,toggleCartItemQuantity,onRemove
    }
    }>
        {children}
    </Context.Provider>
}

export const useStateContext = () => useContext(Context);
