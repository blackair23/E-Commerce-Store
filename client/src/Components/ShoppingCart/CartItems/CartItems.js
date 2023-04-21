import { useContext, useState } from 'react';
import style from './CartItems.module.css';
import { CartContext } from '../../../context/cartContext';
export const CartItems = ({ current }) => {
    const { cart, setCart } = useContext(CartContext);

    const [value, setValue] = useState(current.quantity);
    
    const onChangeHandler = (e) => {
        setValue(e.target.value);
    }

    const updateCartHandler = (current, message) => {
        let item = cart.find((x) => x._id === current._id);

        if(message === "decrease"){
            setValue((state) => Number(state) - 1)
            item.quantity -= 1;
        } else if(message === "increase") {
            setValue((state) => Number(state) + 1)
            // setValue(state - 1)
            item.quantity += 1;
        } else if (message === "update"){
            item.quantity = value;
        }
        
        let cartData = cart.map((i) => i._id === item._id ? item : i);

        if(message === "delete") {
            cartData = cart.filter(i => i._id !== item._id);
        }
        setCart(cartData);
    }

    return (
        <article className={style.cartItem}>
        <img src={current.data.img} alt="" />
        <p className={style.titel}>{current.data.name}</p>
        <div className={style.quantyti}>
            <button 
            onClick={() => updateCartHandler(current, "decrease")}
            disabled={current.quantity === 1} 
            className={style.primBtn}
            >-</button>
            <input type="number" onBlur={() => updateCartHandler(current, "update")} onChange={onChangeHandler} value={value} />
            <button onClick={() => updateCartHandler(current, "increase")} className={style.primBtn}  disabled={current.quantity === Number(current.data.stock)}>+</button>
            <button onClick={() => updateCartHandler(current, "delete")} className={style.primBtn}><i className="fa-solid fa-trash"></i></button>
        </div>
        </article>
    )
}