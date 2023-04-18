import style from './Login.module.css';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const singIn = (e) => {
        e.preventDefault();
        console.log(email, password);
        // createUserWithEmailAndPassword(auth, email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                navigate('/');
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    return (
        <section id={style.login}>
            <h2>Customer Login</h2>
            <form className={style.form}>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={(e) => singIn(e)} className={style.btn}>Login</button>
            </form>
        </section>
    )
}