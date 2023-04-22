import { useContext, useEffect, useState } from 'react';
import style from './Details.module.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
export const Details = () => {
    const { addToCartHandler } = useContext(CartContext);
    const { id, category }= useParams();
    console.log(id, category);
    const [product, setProduct] = useState('');
    const [value, setValue] = useState(1);

    const onChangeHandler = (e) => {
        if(Number(e.target.value) < 1){
            setValue(1)
        } else {
            setValue(e.target.value)
        }
    }

    useEffect(() => {
        console.log('rerender check')
        getDoc(doc(db, category, id))
            .then((res) => {
                let data = res.data();
                const filterdData = {data, _id: id};
                setProduct(filterdData);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id, category]);

    console.log(product)
    const addToCart = (e) => {
        e.preventDefault();
        console.log('quantity ->', value)
        addToCartHandler(product, value)
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
                <input  onChange={onChangeHandler} value={value} name="quantity" type="number" />
            <button className="btn">Add to Cart</button>  
            </form>
        </div>
        </section>
    )
}