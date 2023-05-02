import style from './Login.module.css';
import { auth, db } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import swal from 'sweetalert';


export const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const singIn = (e) => {
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                userLogin(res);
                getDoc(doc(db, 'users', res.user.uid))
                    .then((res) => {
                        userLogin(res.data());
                        navigate('/');
                    })
                    .catch((err)=> {
                        swal(err.message, {
                            icon: "error",
                        });
                    });
            })
            .catch((err)=> {
                swal(err.message, {
                    icon: "error",
                });
            })}
    
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