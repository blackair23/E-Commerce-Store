import style from './Create.module.css';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import swal from 'sweetalert';

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
            swal(err.message, {
                icon: "error",
            });             
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
                        <option value="5400 - 10800">5 400 - 10 800</option>
                        <option value="10800 - 16200">10 800 - 16 200</option>
                        <option value="16200 - 21600">16 200 - 21 600</option>
                        <option value="21600 - 32400">21 600 - 32 400</option>
                        <option value="32400 - 43200">32 400 - 43 200</option>
                        <option value="43200 - 48600">43 200 - 48 600</option>
                        <option value="over 48600">over 48 600</option>
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