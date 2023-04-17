import style from './Details.module.css';
export const Details = () => {
    return(
        <section id={style.details}> 
        <div className={style.imagePreviwe}>
            <img src="https://graweshop.at/media/catalog/product/cache/660767a06980f4089a4bbeb62065528f/j/a/jacke_1.jpg" alt="" />
        </div>
        <div className={style.addToCart}>
            
            <h3>Jacket</h3>
            <p className={style.category}>Category: over 48 600</p>

            <p>
                Unisex down-look jacket with hood; fine hem at waist and sleeves; two outer pockets. Inside: polyester padding with down effect.
            </p>       
            <form>
                <label htmlFor="quantity">Quatity:</label>
                <input name="quantity" type="number" />
            <button className="btn">Add to Cart</button>  
            </form>
        </div>
        </section>
    )
}