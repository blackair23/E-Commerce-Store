import { useContext, useEffect, useState } from 'react';
import style from './Details.module.css';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/AuthContext';
export const Details = () => {
    const { addToCartHandler } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { id, category }= useParams();
    console.log(id, category);
    const [product, setProduct] = useState('');
    const [value, setValue] = useState(1);
    const navigate = useNavigate();
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
                console.log('value check -> ',filterdData);
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

    const deleteHandler = async () => {

        try {
            const ref = doc(db, category, id);
            await deleteDoc(ref);
            if(category === 'utils'){
                navigate(`/utils`)
            } else {
                navigate(`/`)
            }
            alert('deleted');
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <section id={style.details}> 
        <div className={style.imagePreviwe}>
            <img src={product.data?.img} alt="" />
        </div>
        <div className={style.addToCart}>
            
            <h3>{product.data?.name}</h3>
            {product.data?.category ? 
            <p className={style.category}>Category: {product.data?.category}</p>
            :
            ""
            }

            <p>
                {product.data?.description}
            </p>       
            <form onSubmit={addToCart}>
                <label htmlFor="quantity">Quatity:</label>
                <input  onChange={onChangeHandler} value={value} name="quantity" type="number" />
            <button className="btn">Add to Cart</button>  
            </form>
            {
                user.role === 'admin' &&
                <div className={style.adminPanel}>
                    <Link to={`/edit/${id}/${category}`} className={style.edit}>Edit</Link>
                    <button onClick={deleteHandler} className={style.del}>Delete</button>
                </div>
            }
        </div>
        </section>
    )
}