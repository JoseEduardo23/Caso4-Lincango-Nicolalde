import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
const Tickets = () => {
    const location = useLocation()
    const urlActual = location.pathname
    return (
        <div className="estudiantes-container">
            <h1>Modulo de técnicos</h1>
            <ul>
                <li className={`${urlActual === '/dashboard/tickets/crear_tic' ? 'active' : ''}`}>
                    <Link to="/dashboard/tickets/crear_tic">Ingresar ticket</Link>
                </li>

                <li className={`${urlActual === '/dashboard/tickets/listar_tic' ? 'active' : ''}`}>
                    <Link to="/dashboard/tickets/listar_tic">Lista de tickets</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Tickets