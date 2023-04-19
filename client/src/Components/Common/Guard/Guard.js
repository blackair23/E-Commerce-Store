import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext";

export const Guard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(!user){
            navigate('/login');
            // return
        }
    }, [user, navigate]);

    return (user ? <Outlet></Outlet> : null);

}