import HeaderCSS from './Header.module.css';
import logo from '../../../images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


export const Header = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const logOut = () => {
        try {
            signOut(auth);
            navigate('/login');
        } catch (error) {
            console.log(error.message)
        }
    }
   
    return (
        <header>
            <div className={HeaderCSS.logoContainer}>
                <div className={HeaderCSS['burger-menu']}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <Link to='/'><img className={HeaderCSS.logo} src={logo} alt="Market" /></Link>
            </div>
            {user?.uid ? 
            <>
            <nav>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    {user.role? 
                    <li><Link to='/create'>Create</Link></li>
                    : 
                    <li>NoOne</li>
                    }
                    <li>Martketing</li>
                    <li>Eurolife</li>
                </ul>
            </nav>
            <div className={HeaderCSS.user}>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    <li><i className="fa-solid fa-magnifying-glass"></i></li>
                    <Link to='/cart'><li><i className="fa-solid fa-cart-shopping"></i></li></Link>
                    <Link to='/profile'><button className={HeaderCSS.profile}>Profile</button></Link>
                    <button onClick={logOut} className={HeaderCSS.profile}>Logout</button>
                </ul>
            </div>
            </>
            : ''
            }
        </header>
    )
};