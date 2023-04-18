import { getDocs } from 'firebase/firestore';
import { COLLECTION } from '../../config/collection';
import { Products } from '../Products/Products';
import style from './Home.module.css';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [products, setProducts] = useState(null);
    console.log(products)
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getDocs(COLLECTION);
                const filterdData = data.docs.map((doc) => ({...doc.data(), _id: doc.id}))
                setProducts(filterdData);
            } catch (err) {
                console.log(err)                
            }
        }
        getProducts();
    }, [])

    return (
        <section id={style.home}>
            <h2>All products</h2>
            {products ? 
            <Products products={products}></Products>
            : "No items"}
        </section>
    )
}