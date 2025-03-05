import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";


const Tabla_tic = ()=>{
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);

    const listarTickets = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `https://examen-fin-carrera-backend.onrender.com/api/ticket/tickets`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setTickets(respuesta.data);
        } catch (error) {
            toast.error("Error inesperado o no se pudo conectar");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `https://examen-fin-carrera-backend.onrender.com/ticket/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listarTickets();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listarTickets();
    }, []);

    // Mostrar mensaje si no hay tickets
    useEffect(() => {
        if (tickets.length === 0) {
            toast.error("No existen registros");
        }
    }, [tickets]);

    return (
        <>
            {tickets.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Tecnico</th>
                            <th className="cabecera">Cliente</th>
                            <th className="cabecera">Descripción</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {tickets.map((ticket, index) => (
                            <tr className="tr-table" key={ticket._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">
                                    {ticket.cliente?.nombre} {ticket.cliente?.apellido} ({ticket.cliente?.cedula})
                                </td>
                                <td className="cuerpo">
                                    {ticket.tecnicos?.map((tecnico, i) => (
                                        <div key={i}>
                                            {tecnico.nombre} ({tecnico.celular} )
                                        </div>
                                    ))}
                                </td>
                                <td className="cuerpo">{ticket.descripcion}</td>
                                <td className='py-2 text-center'>
                                    <MdNoteAdd
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/tickets/visualizar_tic/${ticket._id}`)}
                                    />

                                    {auth.rol === "Admin" && (
                                        <>
                                            <MdInfo
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/tickets/actualizar_tic/${ticket._id}`)}
                                            />
                                            <MdDeleteForever
                                                className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => handleDelete(ticket._id)}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay matrículas registradas.</p>
            )}
        </>
    );
};


export default Tabla_tic