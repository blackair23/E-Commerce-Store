import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext";

export const AdminGuard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(user.role !== "admin"){
            navigate('/');
        }
    }, [user, navigate]);

    return (user.role === "admin" ? <Outlet></Outlet> : null);

}