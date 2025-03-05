import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
const Clientes = () => {
    const location = useLocation()
    const urlActual = location.pathname
    return (
        <div className="estudiantes-container">
            <h1>Modulo de técnicos</h1>
            <ul>
                <li className={`${urlActual === '/dashboard/clientes/crear_cli' ? 'active' : ''}`}>
                    <Link to="/dashboard/clientes/crear_cli">Ingresar clientes</Link>
                </li>

                <li className={`${urlActual === '/dashboard/clientes/listar_cli' ? 'active' : ''}`}>
                    <Link to="/dashboard/clientes/listar_cli">Listar clienres</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Clientes;