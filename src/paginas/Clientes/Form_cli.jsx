import React, { useState, useEffect } from "react";
import '../../Estilos/Crear.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Form_cli = ({cliente}) => {
    const navigate = useNavigate({ });
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        cedula: "",
        fecha_nacimiento: "",
        ciudad: ""
    });
    useEffect(() => {
        if (cliente?._id) {
            setForm({
                nombre: cliente.nombre ?? "",
                apellido: cliente.apellido ?? "",
                email: cliente.email ?? "",
                telefono: cliente.telefono ? String(cliente.telefono) : "",
                direccion: cliente.direccion ?? "",
                cedula: cliente.cedula ? String(cliente.cedula) : "",
                fecha_nacimiento: cliente.fecha_nacimiento ? cliente.fecha_nacimiento.split('T')[0] : "",
                ciudad: cliente.ciudad ?? ""
            });
        }
    }, [cliente]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.cedula || !form.fecha_nacimiento || !form.direccion || !form.ciudad) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("No se ha encontrado un token válido");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const formData = {
                ...form,
                celular: String(form.celular),
                cedula: String(form.cedula),
            };


            if (cliente?._id) {
                const url = `https://examen-fin-carrera-backend.onrender.com/api/cliente/actualizar/${cliente._id}`;
                await axios.put(url, formData, { headers });
                toast.success("Actualización de cliente completada");
                navigate('/dashboard/clientes/listar_cli')
            } else {
                const url = "https://examen-fin-carrera-backend.onrender.com/api/cliente/crear";
                await axios.post(url, formData, { headers });
                toast.success("Registro de cliente completado");
                navigate('/dashboard/clientes/listar_cli');
            }
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                toast.error(error.response.data.mensaje || "Error en la solicitud", { autoClose: 2000 });
            } else {
                console.error("Error inesperado:", error.message);
                toast.error("Error inesperado en la solicitud", { autoClose: 2000 });
            }
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="container-est">
                <div className="title-est">
                    <p> En este módulo se pueden registrar o actualizar clientes :) </p>
                    <hr style={{ color: "gray" }} />
                </div>
                <form className="form-est" onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" id="nombre" onChange={handleChange} value={form.nombre} />

                    <label>Apellido:</label>
                    <input type="text" name="apellido" id="apellido" onChange={handleChange} value={form.apellido} />

                    <label>Email:</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={form.email} />

                    <label>Telefono:</label>
                    <input type="text" name="telefono" id="telefono" onChange={handleChange} value={form.telefono} />

                    <label>Direccion:</label>
                    <input type="text" name="direccion" id="direccion" onChange={handleChange} value={form.direccion} />

                    <label>Cédula:</label>
                    <input type="text" name="cedula" id="cedula" onChange={handleChange} value={form.cedula} />

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={handleChange} value={form.fecha_nacimiento} />

                    <label>Ciudad:</label>
                    <input type="text" name="ciudad" id="ciudad" onChange={handleChange} value={form.ciudad} />

                    <input className="btn-est" type="submit" value={cliente?._id ? "Actualizar" : "Registrar"} />
                </form>
            </div>
        </>
    )
}

export default Form_cli;