import style from './Products.module.css';

export const Products = () => {
    return (
        <section id={style.products}>
            <article>
                <img src="https://graweshop.at/media/catalog/product/cache/9eae0d67cbb57d9c2490bd82b51bc1b0/j/a/jacke_1.jpg" alt="" />
                <p className={style.title}>Nalgene Bottle</p>
                <p className={style.price}>€14.08</p>
                <button className={style.button}>Add to Card</button>
            </article>
            <article>
                <img src="https://graweshop.at/media/catalog/product/cache/4cda8af9b9a0c7b7333166052a5e7ce3/g/r/gra-1008-nalgene-trinkflasche-2.jpg" alt="" />
                <p className={style.title}>Nalgene Bottle</p>
                <p className={style.price}>€14.08</p>
                <button className={style.button}>Add to Card</button>
            </article>
            <article>
                <img src="https://graweshop.at/media/catalog/product/cache/9eae0d67cbb57d9c2490bd82b51bc1b0/g/r/gra-2112-kappe.jpg" alt="" />
                <p className={style.title}>Nalgene Bottle</p>
                <p className={style.price}>€14.08</p>
                <button className={style.button}>Add to Card</button>
            </article>
            <article>
                <img src="https://graweshop.at/media/catalog/product/cache/4cda8af9b9a0c7b7333166052a5e7ce3/g/r/gra-1008-nalgene-trinkflasche-2.jpg" alt="" />
                <p className={style.title}>Nalgene Bottle</p>
                <p className={style.price}>€14.08</p>
                <button className={style.button}>Add to Card</button>
            </article>
        </section>
    )
}
