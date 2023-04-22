import style from './Header.module.css';
import logo from '../../../images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/cartContext';


export const Header = () => {

    const { user, userLogout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const navigate = useNavigate();
    const logOut = () => {
        try {
            signOut(auth);
            userLogout();
            navigate('/login');
        } catch (error) {
            console.log(error.message)
        }
    }
   
    return (
        <header>
            <div className={style.logoContainer}>
                <div className={style['burger-menu']}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <Link to='/'><img className={style.logo} src={logo} alt="Market" /></Link>
            </div>
            {user?._id ? 
            <>
            <nav>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    {user.role === "admin" ? 
                    <li><Link to='/create'>Create</Link></li>
                    : 
                    <li>NoOne</li>
                    }
                    <li><Link to='/utils'>Utils</Link></li>
                    <li><Link to='/'>Awards</Link></li>
                </ul>
            </nav>
            <div className={style.user}>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    <li><i className="fa-solid fa-magnifying-glass"></i></li>
                    <Link to='/cart' className={style.shopping}><li><i className="fa-solid fa-cart-shopping"></i></li>{cart.length > 0 ? <div className={style.badge}>{cart.reduce((a, c) => a + c.quantity, 0)}</div> : ""}</Link>
                    <Link to='/profile'><button className={style.profile}>Profile</button></Link>
                    <button onClick={logOut} className={style.profile}>Logout</button>
                </ul>
            </div>
            </>
            : ''
            }
        </header>
    )
};