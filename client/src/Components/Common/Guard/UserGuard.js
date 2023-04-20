import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext";

export const UserGuard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(user?.uid){
            navigate('/');
            // return
        }
    }, [user, navigate]);

    return (user?.uid ? <Outlet></Outlet> : null);

}