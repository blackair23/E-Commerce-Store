import { useEffect, useState } from 'react';
import style from './Details.module.css';
import { doc, getDoc } from 'firebase/firestore';
// import { COLLECTION } from '../../config/collection';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
export const Details = () => {
    const { id }= useParams();
    const [product, setProduct] = useState('');
 
    useEffect(() => {
        getDoc(doc(db, 'products', id))
            .then((res) => {
                const filterdData = res.data();
                setProduct(filterdData);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    return(
        <section id={style.details}> 
        <div className={style.imagePreviwe}>
            <img src={product.img} alt="" />
        </div>
        <div className={style.addToCart}>
            
            <h3>{product.name}</h3>
            <p className={style.category}>Category: over 48 600</p>

            <p>
                {product.description}
            </p>       
            <form>
                <label htmlFor="quantity">Quatity:</label>
                <input name="quantity" type="number" />
            <button className="btn">Add to Cart</button>  
            </form>
        </div>
        </section>
    )
}