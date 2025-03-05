import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdList, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import '../../Estilos/Tabla.css'

const Tabla_cli = ()=>{
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [clientes, setclientes] = useState([])

    const listarclientes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:3000/api/cliente/clientes`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            setclientes(respuesta.data);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/cliente/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listarclientes();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listarclientes();
    }, []);

    // Mostrar mensaje si no hay clientes
    useEffect(() => {
        if (clientes.length === 0) {
            toast.error("No existen registros");
        }
    }, [clientes]);

    return (
        <>
            {clientes.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Nombre</th>
                            <th className="cabecera">Apellido</th>
                            <th className="cabecera">Email</th>
                            <th className="cabecera">Telefono</th>
                            <th className="cabecera">Cedula</th>
                            <th className="cabecera">Fecha de nacimiento</th>
                            <th className="cabecera">Ciudad</th>
                            <th className="cabecera">Direccion</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {clientes.map((cliente, index) => (
                            <tr className="tr-table" key={cliente._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">{cliente.nombre}</td>
                                <td className="cuerpo">{cliente.apellido}</td>
                                <td className="cuerpo">{cliente.email}</td>
                                <td className="cuerpo">{cliente.telefono}</td>
                                <td className="cuerpo">{cliente.cedula}</td>
                                <td className="cuerpo">{cliente.fecha_nacimiento}</td>
                                <td className="cuerpo">{cliente.ciudad}</td>
                                <td className="cuerpo">{cliente.direccion}</td>

                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/clientes/visualizar_cli/${cliente._id}`)} />

                                    {
                                        auth.rol === "Admin" &&
                                        (
                                            <>

                                                <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                    onClick={() => navigate(`/dashboard/clientes/actualizar_cli/${cliente._id}`)}
                                                />

                                                <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                    onClick={() => { handleDelete(cliente._id) }}
                                                />
                                            </>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay clientes registrados.</p>
            )}
        </>
    )
}

export default Tabla_cli;