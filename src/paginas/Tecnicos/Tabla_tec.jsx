import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { MdDeleteForever, MdList, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import '../../Estilos/Tabla.css'
const Tabla_tec = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [tecnicos, settecnicos] = useState([])

    const listartecnicos = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `https://examen-fin-carrera-backend.onrender.com/api/tecnico/tecnicos`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.get(url, options);
            settecnicos(respuesta.data);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar este registro?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `https://examen-fin-carrera-backend.onrender.com/api/tecnico/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };

                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });

                listartecnicos();
            }
        } catch (error) {
            toast.error("Error inesperado");
        }
    };

    useEffect(() => {
        listartecnicos();
    }, []);

    // Mostrar mensaje si no hay tecnicos
    useEffect(() => {
        if (tecnicos.length === 0) {
            toast.error("No existen registros");
        }
    }, [tecnicos]);

    return (
        <>
            {tecnicos.length > 0 ? (
                <table className="tab-container">
                    <thead>
                        <tr className="cuerpo-tab">
                            <th className="cabecera">N°</th>
                            <th className="cabecera">Nombre</th>
                            <th className="cabecera">Apellido</th>
                            <th className="cabecera">Email</th>
                            <th className="cabecera">Celular</th>
                            <th className="cabecera">Cedula</th>
                            <th className="cabecera">Fecha de nacimiento</th>
                            <th className="cabecera">Genero</th>
                            <th className="cabecera">Ciudad</th>
                            <th className="cabecera">Direccion</th>
                            <th className="cabecera">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tab-cuerpo">
                        {tecnicos.map((tecnico, index) => (
                            <tr className="tr-table" key={tecnico._id}>
                                <td className="cuerpo">{index + 1}</td>
                                <td className="cuerpo">{tecnico.nombre}</td>
                                <td className="cuerpo">{tecnico.apellido}</td>
                                <td className="cuerpo">{tecnico.email}</td>
                                <td className="cuerpo">{tecnico.celular}</td>
                                <td className="cuerpo">{tecnico.cedula}</td>
                                <td className="cuerpo">{tecnico.fecha_nacimiento}</td>
                                <td className="cuerpo">{tecnico.genero}</td>
                                <td className="cuerpo">{tecnico.ciudad}</td>
                                <td className="cuerpo">{tecnico.direccion}</td>

                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/tecnicos/visualizar_tec/${tecnico._id}`)} />

                                    {
                                        auth.rol === "Admin" &&
                                        (
                                            <>

                                                <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                    onClick={() => navigate(`/dashboard/tecnicos/actualizar_tec/${tecnico._id}`)}
                                                />

                                                <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                    onClick={() => { handleDelete(tecnico._id) }}
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
                <p>No hay tecnicos registrados.</p>
            )}
        </>
    )
}
export default Tabla_tec