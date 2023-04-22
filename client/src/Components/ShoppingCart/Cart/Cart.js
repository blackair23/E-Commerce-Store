import { useContext } from 'react';
import style from './Cart.module.css';
import { CartItems } from '../CartItems/CartItems';
import { CartContext } from '../../../context/cartContext';
import { AuthContext } from '../../../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const checkOut = async () => {
        const checkout = {
            userId: user._id,
            city: user.city,
            email: user.email,
            role: user.role,
            orderedProd: cart,
        }
        console.log('checkout ->',checkout);
        
        try {
            let ref = collection(db, 'orders');
            await addDoc(ref, checkout);
            setCart([]);
        } catch (err) {
            alert(err.message);
        }
    }

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
                <button onClick={checkOut} className="btn">Checkout</button>
            </div>
                </>
                : 
                <h2>Cart is empty!</h2> }
        </section>
        
    )
}