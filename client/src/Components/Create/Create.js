import style from './Create.module.css';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { COLLECTION } from '../../config/collection';
import { useNavigate } from 'react-router-dom';

export const Create = () => {
    
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name:'',
        price: '',
        description: '',
        img: '',
        stock: '',
        category: '16400',
    });

    const onChangeHandler = (e) => {
        console.log(e.target.value);
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit= async (e) => {
        e.preventDefault();
        console.log(values);
        try {
            await addDoc(COLLECTION, values);
            navigate('/');
        } catch (err) {
            console.log(err)            
        }
    }

    return (
        <section id={style.create}>
            <h2>Create product</h2>
            <form onSubmit={onSubmit} className={style.createForm}>
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
                
                {/* <div className={style.formElement}>
                    <label htmlFor="startNumber">Start Number:</label>
                    <input onChange={onChangeHandler} value={values.startNumber} type="number" name="startNumber" />
                </div> */}

                <div className={style.formElement}>
                    <label htmlFor="category">Category:</label>
                    <select onChange={onChangeHandler} className={style.select} value={values.category} name="category" id="">Category
                        <option value="16400"> 16 400 </option>
                        <option value="16400 - 24600">16 400-24 600</option>
                        <option value="24600 - 32600">24 600-32 600</option>
                        <option value="32600 - 48600">32 600-48 600</option>
                        <option value="48 600">48 600</option>
                    </select>
                </div>

                <button className="btn">Submit</button>
            </form>
        </section>
    )
}