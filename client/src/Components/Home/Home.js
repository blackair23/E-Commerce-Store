import { Products } from '../Products/Products';
import style from './Home.module.css';

export const Home = () => {
 
    return (
        <section id={style.home}>
            <h2>All products</h2>

            <Products></Products>
        </section>
    )
}