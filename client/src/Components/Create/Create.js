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
        startNumber: '',
        category: 'all',
    });

    const onChangeHandler = (e) => {
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
                    <input onChange={onChangeHandler} type="text" name="name" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="price">Price:</label>
                    <input onChange={onChangeHandler} type="number" name="price" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="description">Description:</label>
                    <input onChange={onChangeHandler} type="text" name="description" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="img">ImageURL:</label>
                    <input onChange={onChangeHandler} type="text" name="img" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="stock">Stock:</label>
                    <input onChange={onChangeHandler} type="number" name="stock" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="startNumber">Start Number:</label>
                    <input onChange={onChangeHandler} type="number" name="startNumber" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="category">Category:</label>
                    <select onChange={onChangeHandler} className={style.select} name="category" id="">Category
                        <option value="all">All</option>
                        <option value="brokers">Brokers</option>
                        <option value="agents">Agents</option>
                    </select>
                </div>

                <button className="btn">Submit</button>
            </form>
        </section>
    )
}