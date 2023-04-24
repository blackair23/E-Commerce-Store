import { useContext } from 'react';
import style from './Cart.module.css';
import { CartItems } from '../CartItems/CartItems';
import { CartContext } from '../../../context/cartContext';
import { AuthContext } from '../../../context/AuthContext';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
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
            status: 'Processed',
            timestamp: serverTimestamp(),
        }
        console.log('checkout ->',checkout);

        // checkout.orderedProd.map((c) => {
        //     console.log(c._id, '\n', c.quantity, '\n', c.data.stock,'\n', 'total -> ',Number(c.data.stock) - Number(c.quantity)); 
        //     console.log(c._id, '\n', c.data.startNumber, '\n', c.quantity,'\n', 'total -> ',Number(c.data.startNumber) + Number(c.quantity - 1))
        // });
        
        try {
            
            let ref = collection(db, 'orders');
            let order = await addDoc(ref, checkout);
            console.log('order -> ', order);
            checkout.orderedProd.map(async (c) => {
                const ref = doc(db, 'utils', c._id)
                console.log({id: order._key.path.segments[1], quantity: Number(c.quantity)})
                await updateDoc(ref, { 
                    // startNumber: Number(c.data.startNumber) + Number(c.quantity - 1),
                    // stock: Number(c.data.stock) - Number(c.quantity),
                    array: arrayUnion({id: order._key.path.segments[1], quantity: Number(c.quantity)})
                })
            })
            alert('ready');
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