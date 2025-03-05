import React, { useState, useEffect } from "react";
import '../../Estilos/Crear.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const Form_tec = ({tecnico}) => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        cedula: "",
        fecha_nacimiento: "",
        genero: "",
        ciudad: "",
        direccion: "",
    })
    useEffect(() => {
        if (tecnico?._id) {
            setForm({
                nombre: tecnico.nombre ?? "",
                apellido: tecnico.apellido ?? "",
                email: tecnico.email ?? "",
                celular: tecnico.celular ? String(tecnico.celular) : "",
                cedula: tecnico.cedula ? String(tecnico.cedula) : "",
                fecha_nacimiento: tecnico.fecha_nacimiento ? tecnico.fecha_nacimiento.split('T')[0] : "",
                genero: tecnico.genero ?? "",
                ciudad: tecnico.ciudad ?? "",
                direccion: tecnico.direccion ?? ""
            });
        }
    }, [tecnico]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.apellido || !form.email || !form.celular || !form.cedula || !form.fecha_nacimiento || !genero || !ciudad || !direccion) {
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


            if (tecnico?._id) {
                const url = `http://localhost:3000/api/tecnico/actualizar/${tecnico._id}`;
                await axios.put(url, formData, { headers });
                toast.success("Actualización de tecnico completada");
                navigate('/dashboard/tecnicos/listar_tec')
            } else {
                const url = "http://localhost:3000/api/tecnico/crear";
                await axios.post(url, formData, { headers });
                toast.success("Registro de tecnico completado");
                navigate('/dashboard/tecnicos/listar_tec');
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
                    <p> En este módulo se pueden registrar o actualizar tecnicos :) </p>
                    <hr style={{ color: "gray" }} />

                </div>
                <form className="form-est" onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" id="nombre" onChange={handleChange} value={form.nombre} />

                    <label>Apellido:</label>
                    <input type="text" name="apellido" id="apellido" onChange={handleChange} value={form.apellido} />

                    <label>Email:</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={form.email} />

                    <label>Celular:</label>
                    <input type="text" name="celular" id="celular" onChange={handleChange} value={form.celular} />

                    <label>Cédula:</label>
                    <input type="text" name="cedula" id="cedula" onChange={handleChange} value={form.cedula} />

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={handleChange} value={form.fecha_nacimiento} />

                    <label>Genero:</label>
                    <input type="text" name="genero" id="genero" onChange={handleChange} value={form.genero} />

                    <label>Ciudad:</label>
                    <input type="text" name="ciudad" id="ciudad" onChange={handleChange} value={form.ciudad} />

                    <label>Direccion:</label>
                    <input type="text" name="direccion" id="direccion" onChange={handleChange} value={form.direccion} />

                    <input className="btn-est" type="submit" value={tecnico?._id ? "Actualizar" : "Registrar"} />
                </form>
            </div>


        </>
    )
}
