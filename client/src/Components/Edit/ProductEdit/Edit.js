import style from './Edit.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../config/firebase';

export const Edit = () => {
    const { id, category } = useParams();

    const navigate = useNavigate();
    const [values, setValues] = useState({
        product: 'awards',
        name:'',
        price: '',
        description: '',
        img: '',
        stock: '',
        startNumber: 0,
        category: 'under 16400',
    });

    useEffect(() => {
        console.log('rerender check')
        getDoc(doc(db, category, id))
            .then((res) => {
                let data = res.data();
                const filterdData = {data, _id: id};
                setValues(filterdData.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id, category]);

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit= async (e) => {
        e.preventDefault();
        if(values.product === "utils") {
            delete values.category
            console.log('utils -> ',values)
        } else if (values.product === "awards"){
            delete values.startNumber
            console.log('awards -> ',values)
        }
        try {
            console.log('send to back ->', values);
            const ref = doc(db, category, id)
            await updateDoc(ref, values);
            alert('update succesful');
            navigate(`/catalog/${id}/${category}`);
        } catch (err) {
            console.log(err)            
        }
    }

    return (
        <section id={style.edit}>
            <h2>Edit product</h2>
            <div className={style.formElement}>
                    <label htmlFor="product">Category:</label>
                    <select disabled onChange={onChangeHandler} className={style.select} value={values.product} name="product" id="">Category
                        <option value="awards">Award</option>
                        <option value="utils">Utils</option>
                    </select>
                </div>

            <form onSubmit={onSubmit} className={style.editForm}>
                <div className={style.formElement}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={onChangeHandler} value={values.name} type="text" name="name" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="price">Price:</label>
                    <input onChange={onChangeHandler} value={values.price} type="number" name="price" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="description">Description:</label>
                    <input onChange={onChangeHandler} value={values.description} type="text" name="description" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="img">ImageURL:</label>
                    <input onChange={onChangeHandler} value={values.img} type="text" name="img" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="stock">Stock:</label>
                    <input onChange={onChangeHandler} type="number" value={values.stock} name="stock" />
                </div>
                {   
                    values.product === "utils" ?
                    
                    <div className={style.formElement}>
                    <label htmlFor="startNumber">Start Number:</label>
                    <input onChange={onChangeHandler} value={values.startNumber} type="number" name="startNumber" />
                    </div>
                    :
                    <div className={style.formElement}>
                    <label htmlFor="category">Category:</label>
                    <select onChange={onChangeHandler} className={style.select} value={values.category} name="category" id="">Category
                        <option value="under 16 400">under 16 400 </option>
                        <option value="16 400 - 24 600">16 400-24 600</option>
                        <option value="24 600 - 32 600">24 600-32 600</option>
                        <option value="32 600 - 48 600">32 600-48 600</option>
                        <option value="over 48 600">over 48 600</option>
                    </select>
                    </div>
                }



                <button className="btn">Edit</button>
            </form>
        </section>
    )
}