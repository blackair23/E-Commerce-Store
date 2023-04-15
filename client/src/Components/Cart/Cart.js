import style from './Cart.module.css';

export const Cart = () => {
    return (
        <section id={style.cart}>
            <h2>Shopping Cart</h2>
            <div className={style.header}>
                <p>Item</p>
                <p>Qty:</p>
            </div>
            <div className={style.items}>
                <article>
                    <img src="https://graweshop.at/media/catalog/product/cache/e429064c1cadfb2516d9207cdbda1031/g/r/gra-1012-jausenbox-sigg-metal-food-box-l-2.png" alt="" />
                    <p className={style.titel}>Lunch Box</p>
                    <div className={style.quantyti}>
                        <button className={style.primBtn}>-</button>
                        <input type="number" />
                        <button className={style.primBtn}>+</button>
                        <button className={style.primBtn}><i class="fa-solid fa-trash"></i></button>
                    </div>
                </article>
                <article>
                    <img src="https://graweshop.at/media/catalog/product/cache/e429064c1cadfb2516d9207cdbda1031/g/r/gra-1012-jausenbox-sigg-metal-food-box-l-2.png" alt="" />
                    <p className={style.titel}>Lunch Box</p>
                    <div className={style.quantyti}>
                        <button className={style.primBtn}>-</button>
                        <input type="number" />
                        <button className={style.primBtn}>+</button>
                        <button className={style.primBtn}><i class="fa-solid fa-trash"></i></button>
                    </div>
                </article>
                <button className={style.btn}>Checkout</button>
            </div>
        </section>
        
    )
}