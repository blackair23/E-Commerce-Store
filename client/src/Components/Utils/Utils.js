import style from './Utils.module.css';
import { useEffect, useState } from "react"
import { Products } from "../Products/Products"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";


export const Utils = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getDocs(collection(db, 'utils'));
                const filterdData = data.docs.map((doc) => ({...doc.data(), _id: doc.id}))
                setProducts(filterdData);
            } catch (err) {
                alert(err.message)
            }
        }
        getProducts();
    }, [])

    return (
        <section id={style.utils}>
            <h2>All Materials</h2>
            {products ? 
            <Products products={products}></Products>
            : "No items"}
        </section>
    )
}