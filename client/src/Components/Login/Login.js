import style from './Login.module.css'

export const Login = () => {
    return (
        <section id={style.login}>
            <h2>Customer Login</h2>
            <form className={style.form}>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" />
                <button className={style.btn}>Login</button>
            </form>
        </section>
    )
}