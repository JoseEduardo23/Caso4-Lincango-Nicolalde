import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from '../../components/Alerta/Mensaje';

const Visualizar_tic = () => {
    const { id } = useParams();
    const [ticket, setticket] = useState(null);
    const [mensaje, setMensaje] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const consultarticket = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No se encontró el token de autenticación.");
                }

                const url = `http://localhost:3000/api/ticket/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);

                if (!respuesta || !respuesta.data) {
                    throw new Error("Respuesta vacía o no válida del servidor.");
                }

                console.log(respuesta.data);
                setticket(respuesta.data.ticket || respuesta.data);

            } catch (error) {
                console.error(error);
                setMensaje({ respuesta: error.response?.data?.msg || error.message || "Error desconocido", tipo: false });
            } finally {
                setLoading(false);
            }
        };
        consultarticket();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!ticket) {
        return (
            <div>
                <Mensaje tipo={false}>
                    {mensaje.respuesta || "ticket no encontrado."}
                </Mensaje>
            </div>
        );
    }

    const {
        cliente,
        tecnicos,
        descripcion,
    } = ticket;

    return (
        <>
            <h1>Visualizar datos del ticket</h1>
            <div className="div-container">
                {ticket && Object.keys(ticket).length !== 0 ? (
                    <div className="visualizar-container">
                        {/* Mostrar las tecnicos si están disponibles */}
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Tecnicos: </span>
                            {tecnicos && tecnicos.length > 0 ? (
                                tecnicos.map((tecnico, index) => (
                                    <span key={index}>{tecnico.nombre || "Nombre no disponible"}{index < tecnicos.length - 1 ? ", " : ""}</span>
                                ))
                            ) : (
                                "No hay tecnicos disponibles"
                            )}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Estudiante: </span>
                            {cliente.nombre ? cliente.nombre : "Nombre no disponible"}
                            -
                            {cliente.apellido ? cliente.apellido : "Apellido no disponible"}
                        </p>

                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Cedula: </span>
                            {cliente.cedula ? cliente.cedula : "Cedula no disponible"}
                        </p>

                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                            {descripcion ? descripcion : "Descripcion no disponible"}
                        </p>
                    </div>
                ) : (
                    <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta || "ticket no encontrada."}</Mensaje>
                )}
            </div>
        </>
    );
}

export default Visualizar_tic