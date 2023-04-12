import HeaderCSS from './Header.module.css';
import logo from '../../../images/logo.png';

export const Header = () => {
    return (
        <header>
            <img className={HeaderCSS.logo} src={logo} alt="Market" />
            <nav>
                <ul role="list">
                    <li>Essensials</li>
                    <li>Martketing Materials</li>
                    <li>Eurolife</li>
                </ul>
            </nav>
            <div className={HeaderCSS.user}>
                    <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                    <button className={HeaderCSS.profile}>Profile</button>
                </div>
        </header>
    )
};