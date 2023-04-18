import style from './Products.module.css';
// import { getDocs } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { COLLECTION } from '../../config/collection';


export const Products = ({products}) => {

    console.log('inside --------->', products)
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
