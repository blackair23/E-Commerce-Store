import style from './Register.module.css';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';


export const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email:'',
        password: '',
        repass: '',
        city: '',
        role: 'office',
    });

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const signUp = (e) => {
        e.preventDefault();
        console.log(values);
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((res) => {
                console.log("res", res);
                
                let user = {email: res.user.email, _id: res.user.uid, city: values.city, role:values.role};
                console.log('refactored data -> ', user);
                setDoc(doc(db, 'users', user._id), user)
                    .then(()=>{
                        userLogin(user);
                        navigate('/');
                    })
                    .catch((err)=>{
                        alert(err.message)
                    })
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    return (
        <section id={style.register}>
            <h2>Customer Login</h2>
            <form className={style.form} onSubmit={signUp}>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" onChange={onChangeHandler} value={values.email}/>
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" onChange={onChangeHandler} value={values.password}/>
                <label htmlFor="repass">Comfirm Password:</label>
                <input name="repass" type="password" onChange={onChangeHandler} value={values.repass}/>
                <label htmlFor="city">City:</label>
                <input name="city" type="text" onChange={onChangeHandler} value={values.city}/>
                <label htmlFor="role">Role:</label>
                    <select onChange={onChangeHandler} value={values.role} name="role" id="">Role
                        <option value="office">Office</option>
                        <option value="broker">Broker</option>
                        <option value="eurolife">Eurolife</option>
                        <option value="admin">Admin</option>
                    </select>
                <button className={style.btn}>Register</button>
            </form>
        </section>
    )
}