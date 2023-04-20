import { useContext, useEffect, useState } from 'react';
import style from './Details.module.css';
import { doc, getDoc } from 'firebase/firestore';
// import { COLLECTION } from '../../config/collection';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
export const Details = () => {
    const { addToCartHandler } = useContext(CartContext);
    const { id }= useParams();
    const [product, setProduct] = useState('');
    
    useEffect(() => {
        getDoc(doc(db, 'products', id))
            .then((res) => {
                let data = res.data();
                const filterdData = {data, _id: id};
                setProduct(filterdData);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])
    console.log(product)
    const addToCart = (e) => {
        e.preventDefault();
        addToCartHandler(product)
    }

    return(
        <section id={style.details}> 
        <div className={style.imagePreviwe}>
            <img src={product.data?.img} alt="" />
        </div>
        <div className={style.addToCart}>
            
            <h3>{product.data?.name}</h3>
            <p className={style.category}>Category: over 48 600</p>

            <p>
                {product.data?.description}
            </p>       
            <form onSubmit={addToCart}>
                <label htmlFor="quantity">Quatity:</label>
                <input name="quantity" type="number" />
            <button className="btn">Add to Cart</button>  
            </form>
        </div>
        </section>
    )
}