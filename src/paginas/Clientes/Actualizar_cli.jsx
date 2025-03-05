import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form_cli from "./Form_cli";
import { toast } from "react-toastify";
const Actualizar_cli = ()=>{
        const { id } = useParams();
        const [cliente, setcliente] = useState(null);
        const [mensaje, setMensaje] = useState({ respuesta: "", tipo: "" });
    
        useEffect(() => {
            
            const consultarcliente = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        toast.error("No se ha encontrado un token válido");
                        return;
                    }
    
                    const headers = { Authorization: `Bearer ${token}` };
                    const url = `https://examen-fin-carrera-backend.onrender.com/api/cliente/${id}`;
    
                    const respuesta = await axios.get(url, { headers });
    
    
                    if (!respuesta.data || Object.keys(respuesta.data).length === 0) {
                        setMensaje({ respuesta: "cliente no encontrado", tipo: "error" });
                        return;
                    }
    
                    setcliente(respuesta.data);
                } catch (error) {
                    console.error("Error en la consulta del cliente:", error);
                    setMensaje({ respuesta: "Error al obtener el cliente", tipo: "error" });
                }
            };
    
            if (id) consultarcliente();
        }, [id]);
    
        return (
            <>
                {cliente ? (
                    <Form_cli cliente={cliente} />
                ) : (
                    mensaje.respuesta && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.respuesta}</p>
                )}
            </>
        );
    };
    

export default Actualizar_cli;