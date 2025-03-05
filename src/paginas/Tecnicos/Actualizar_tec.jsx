import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form_tec} from "./Form_tec";
import { toast } from "react-toastify";

const Actualizar_tec =()=>{
    const { id } = useParams();
    const [tecnico, settecnico] = useState(null);
    const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });

    useEffect(() => {
        
        const consultartecnico = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se ha encontrado un token válido");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const url = `http://localhost:3000/api/tecnico/${id}`;

                const respuesta = await axios.get(url, { headers });


                if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                    setMensaje({ respuesta: "tecnico no encontrado", tipo: "error" });
                    return;
                }

                settecnico(respuesta.data);
            } catch (error) {
                console.error("Error en la consulta del tecnico:", error);
                setMensaje({ respuesta: "Error al obtener el tecnico", tipo: "error" });
            }
        };

        if (id) consultartecnico();
    }, [id]);

    return (
        <>
            {tecnico ? (
                <Form_tec tecnico={tecnico} />
            ) : (
                mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
            )}
        </>
    );
};

export default Actualizar_tec;