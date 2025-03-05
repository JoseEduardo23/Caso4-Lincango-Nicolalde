import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import '../Estilos/Perfil.css'
import AuthContext from "../Context/AuthProvider";

const Perfil = () => {
    const {auth} = useContext(AuthContext)
    console.log(auth)

    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <h1>Perfil de {auth.nombre}</h1>
                <p>{auth.rol}</p>
            </header>
            <div className="self-start">
                <b>Nombre:</b><p className="inline-block ml-3">{auth.nombre}</p>
            </div>
            <div className="self-start">
                <b>Email:</b><p className="inline-block ml-3">{auth.email}</p>
            </div >
            <div className="self-start">
                <b>Cedula:</b><p className="inline-block ml-3">{auth.cedula}</p>
            </div>
            <Outlet />
        </div>
    );
}

export default Perfil;