import { getDocs } from 'firebase/firestore';
import style from './Products.module.css';
import { useEffect, useState } from 'react';
import { COLLECTION } from '../../config/collection';


export const Products = () => {
    const [products, setProducts] = useState('');
    
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getDocs(COLLECTION);
                const filterdData = data.docs.map((doc) => ({...doc.data(), _id: doc.id}))
                console.log(filterdData);
                setProducts(filterdData);
            } catch (err) {
                console.log(err)                
            }
        }
        getProducts();
    }, [])

    return (
        <section id={style.products}>
            {products.length > 0 ?  products.map((p) => (
                <article key={p._id}>
                    <img src={p.img} alt="" />
                    <p className={style.title}>{p.name}</p>
                    <p className={style.price}>€{p.price}</p>
                    <button className={style.button}>Add to Card</button>
                </article>
            )
            ): "No products Yet"}
        </section>
    )
}
