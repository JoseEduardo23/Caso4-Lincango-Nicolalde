import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Formulario_tic from "./Form_tic";
import { toast } from "react-toastify";

const Actualizar_tic = () => {
    const { id } = useParams();
    const [ticket, setticket] = useState(null);
    const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });

    useEffect(() => {

        const consultarticket = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se ha encontrado un token válido");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const url = `https://examen-fin-carrera-backend.onrender.com/api/ticket/${id}`;

                const respuesta = await axios.get(url, { headers });


                if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                    setMensaje({ respuesta: "ticket no encontrado", tipo: "error" });
                    return;
                }

                setticket(respuesta.data);
            } catch (error) {
                console.error("Error en la consulta del ticket:", error);
                setMensaje({ respuesta: "Error al obtener el ticket", tipo: "error" });
            }
        };

        if (id) consultarticket();
    }, [id]);

    return (
        <>
            {ticket ? (
                <Formulario_tic ticket={ticket} />
            ) : (
                mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
            )}
        </>
    )
}

export default Actualizar_tic