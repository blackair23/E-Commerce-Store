import style from './Create.module.css';

export const Create = () => {
    return (
        <section id={style.create}>
            <h2>Create product</h2>
            <form className={style.createForm}>
                <div className={style.formElement}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="img">ImageURL:</label>
                    <input type="text" name="img" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" name="stock" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="startNumber">Start Number:</label>
                    <input type="number" name="startNumber" />
                </div>

                <div className={style.formElement}>
                    <label htmlFor="category">Category:</label>
                    <select className={style.select} name="category" id="">Category
                        <option value="all">All</option>
                        <option value="brokers">Brokers</option>
                        <option value="agents">Agents</option>
                    </select>
                </div>

                <button className="btn">Submit</button>
            </form>
        </section>
    )
}