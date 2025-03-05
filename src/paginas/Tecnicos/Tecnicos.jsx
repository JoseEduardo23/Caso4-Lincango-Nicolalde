import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import '../../Estilos/Pantallas.css'; 
const Tecnicos = () => {
    const location = useLocation()
    const urlActual = location.pathname

    return (
        <div className="estudiantes-container">
            <h1>Modulo de técnicos</h1>
            <ul>
                <li className={`${urlActual === '/dashboard/tecnicos/crear_tec' ? 'active' : ''}`}>
                    <Link to="/dashboard/tecnicos/crear_tec">Ingresar técnico</Link>
                </li>

                <li className={`${urlActual === '/dashboard/tecnicos/listar_tec' ? 'active' : ''}`}>
                    <Link to="/dashboard/tecnicos/listar_tec">Listar tecnicos</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Tecnicos;