import { useContext } from 'react';
import style from './Cart.module.css';
import { CartItems } from './CartItems/CartItems';
import { CartContext } from '../../context/cartContext';

export const Cart = () => {
    const { cart } = useContext(CartContext);
    return (
        <section id={style.cart}>
            <h2>Shopping Cart</h2>
                {cart.length > 0 ?
                <>
            <div className={style.header}>
                <p>Item</p>
                <p>Qty:</p>
            </div>
            <div className={style.items}>
                 {cart.map(c => <CartItems key={c._id} current={c}></CartItems>)} 
                <button className="btn">Checkout</button>
            </div>
                </>
                : 
                <h2>Cart is empty!</h2> }
        </section>
        
    )
}