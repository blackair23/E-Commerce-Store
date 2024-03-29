import { useEffect, useState } from 'react';
import style from './OEdit.module.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import swal from 'sweetalert';
export const OEdit = ({orderId, products, prodId, onClose}) => {
    // console.log(orderId, '-',products,'\n',prodId, '-')
    const [quantity, setQuantity] = useState('');
    const [currentProd, setCurProd] = useState(products.filter((p) => p._id === prodId)); // eslint-disable-line
    const [currentOrder, setCurOrd] = useState(currentProd[0].array.filter((o) => o.id === orderId));// eslint-disable-line

    useEffect(() => {
    //    console.log('currentProd -->',currentProd);
    //    console.log('currentOrder -->',currentOrder);
       setQuantity(currentOrder[0].quantity);
    }, [orderId, products, prodId])


    const onSubmit = async (e) => {
        e.preventDefault()
        // console.log('submit', quantity);
        let index = currentProd[0].array.findIndex((obj) => obj.id === orderId);
        // console.log(index);
        // console.log(currentProd[0].array[index]);
        // console.log('before->', currentProd[0].array[index]);
        currentProd[0].array[index].quantity = Number(quantity);
        // console.log('after->', currentProd[0].array[index]);
        // console.log(currentProd[0]);
        let change = currentProd[0].array;

        try {
            const ref = doc(db, currentProd[0].product, prodId);
            await updateDoc(ref, {array: change});
            swal('Update Successfull', {
                icon: "success",
            });
            onClose();
        } catch (err) {
            swal(err.message, {
                icon: "error",
            });
        }
    }
    return (
        <>
        <div id={style.overlay}>
        <div className={style.backdrop} onClick={onClose}></div>
            <div className={style.formpopup}>
                <div className={style.formpart}>
                    <button onClick={onClose} className={style.closeBtn}><i className="fa-solid fa-xmark"></i></button>
                    <form onSubmit={onSubmit}>
                        <h2>Edit</h2>
                        <div className={style.formElement}>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" id="quantity" name="quantity" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                        </div>
                        <input className="btn primary-btn" type="submit" value="Edit"/>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

