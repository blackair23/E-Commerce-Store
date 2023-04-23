import style from './OEdit.module.css';
export const OEdit = ({onClose}) => {

    const onSubmit = () => {
        console.log('submit');
    }
    return (
        <>
        <div id={style.overlay}>
        <div className={style.backdrop} onClick={onClose}></div>
            <div className={style.formpopup}>
                <div className={style.formpart}>
                    <button onClick={onClose} className="close-btn"><i className="fa-solid fa-xmark"></i></button>
                    <form onSubmit={onSubmit}>
                        <h2>Edit</h2>
                        {/* <div className="form-element">
                            <label htmlFor="email">Email</label>
                            {emailErr.email && 
                            <p className="form-error"><i className="fa-solid fa-circle-exclamation fa-bounce"></i> Enter valid email!</p>
                            } 
                            <input type="text" id="email" name="email" placeholder="Enter email" value={values.email} onChange={onChangeHandler}  onBlur={(e) => setEmailErr(e, values)}/>
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Password</label>
                            {lengthErr.password && 
                            <p className="form-error"><i className="fa-solid fa-circle-exclamation fa-bounce"></i> Password must be atleast 3 charter!</p>
                            }
                            <input type="password" id="password" name="password" placeholder="Enter password" value={values.password} onChange={onChangeHandler} onBlur={(e) => setLengthErr(e, 2, values)}/>
                        </div> */}
                        <input className="btn primary-btn" type="submit" value="Log in"/>
                    </form>
                    <span>Don't have an acount?</span> 
                </div>
            </div>
        </div>
        </>
    );
}

