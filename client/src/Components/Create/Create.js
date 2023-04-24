import style from './Create.module.css';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';

export const Create = () => {
    
    const navigate = useNavigate();
    const [values, setValues] = useState({
        product: 'awards',
        document: false,
        name:'',
        description: '',
        img: '',
        stock: '',
        startNumber: 0,
        category: 'under 16 400',
        array: [],
    });

    const onChangeHandler = (e) => {
        if(e.target.name === 'document') {
            console.log( [e.target.name],': ',e.target.checked)
            setValues(state => ({...state, [e.target.name]: e.target.checked }))
        }else {
            console.log( [e.target.name],': ',e.target.value)
            setValues(state => ({...state, [e.target.name]: e.target.value}))
        }
    }

    const onSubmit= async (e) => {
        e.preventDefault();
        // console.log(values);
        if(values.product === "utils") {
            delete values.category
            console.log('utils -> ',values)
        } else if (values.product === "awards"){
            delete values.startNumber
            console.log('awards -> ',values)
        }
        try {
            let ref = collection(db, values.product)
            const u = await addDoc(ref, values);
            navigate(`/catalog/${u._key.path.segments[1]}/${values.product}`);
        } catch (err) {
            console.log(err)            
        }
    }

    return (
        <section id={style.create}>
            <h2>Create product</h2>
            <form onSubmit={onSubmit} className={style.createForm}>
            <div className={style.formElement}>
                    <label htmlFor="product">Category:</label>
                    <select onChange={onChangeHandler} className={style.select} value={values.product} name="product" id="">Category
                        <option value="awards">Award</option>
                        <option value="utils">Utils</option>
                    </select>
                </div>
                {values.product === "utils" &&
                <div>
                    <label htmlFor="document">Заявление: </label>
                    <input onChange={onChangeHandler}  value={values.document} type="checkbox" id="document" name="document" />
                </div>}

                <div className={style.formElement}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={onChangeHandler} value={values.name} type="text" name="name" />
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
                    values.product === "awards" &&

                    <div className={style.formElement}>
                    <label htmlFor="category">Category:</label>
                    <select onChange={onChangeHandler} className={style.select} value={values.category} name="category" id="">Category
                        <option value="under 16 400"> 16 400 </option>
                        <option value="16 400 - 24 600">16 400-24 600</option>
                        <option value="24 600 - 32 600">24 600-32 600</option>
                        <option value="32 600 - 48 600">32 600-48 600</option>
                        <option value="over 48 600">over 48 600</option>
                    </select>
                    </div>
                }

                {values.document === true && 
                    <div className={style.formElement}>
                    <label htmlFor="startNumber">Start Number:</label>
                    <input onChange={onChangeHandler} value={values.startNumber} type="number" name="startNumber" />
                    </div>
                }

                <button className="btn">Submit</button>
            </form>
        </section>
    )
}