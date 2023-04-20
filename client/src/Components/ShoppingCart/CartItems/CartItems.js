import { useContext } from 'react';
import style from './CartItems.module.css';
import { CartContext } from '../../../context/cartContext';
export const CartItems = ({ current }) => {
    const { cart, setCart } = useContext(CartContext);

    const updateCartHandler = (current, message) => {
        let item = cart.find((x) => x._id === current._id);

        if(message === "decrease"){
            item.quantity -= 1;
        } else if(message === "increase") {
            item.quantity += 1;
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
            <input type="number" value={current.quantity} />
            <button onClick={() => updateCartHandler(current, "increase")} className={style.primBtn}  disabled={current.quantity === current.data.stock}>+</button>
            <button onClick={() => updateCartHandler(current, "delete")} className={style.primBtn}><i className="fa-solid fa-trash"></i></button>
        </div>
        </article>
    )
}