import HeaderCSS from './Header.module.css';
import logo from '../../../images/logo.png';

export const Header = () => {
    return (
        <header>
            <div className={HeaderCSS.logoContainer}>
                <div className={HeaderCSS['burger-menu']}>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <img className={HeaderCSS.logo} src={logo} alt="Market" />
            </div>
            <nav>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    <li>Essentials</li>
                    <li>Martketing</li>
                    <li>Eurolife</li>
                </ul>
            </nav>
            <div className={HeaderCSS.user}>
                {/* eslint-disable-next-line */}
                <ul role="list">
                    <li><i className="fa-solid fa-magnifying-glass"></i></li>
                    <li><i className="fa-solid fa-cart-shopping"></i></li>
                    <button className={HeaderCSS.profile}>Profile</button>
                </ul>

                    
            </div>
        </header>
    )
};