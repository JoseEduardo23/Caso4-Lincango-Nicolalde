import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from '../Context/AuthProvider';
import '../Estilos/Login.css'

import img1 from '../assets/fondo1.jpg'

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle submit se esta ejecutando")
        try {
            const url = `https://examen-fin-carrera-backend.onrender.com/api/login`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem("token", respuesta.data.token);
            console.log(respuesta.data);
            toast.success(respuesta.data.msg);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <>
            <ToastContainer />
            <form className="forml-container" onSubmit={handleSubmit}>
                <div className="div-login">
                    <div>
                        <p>BIENVENIDOS</p>
                    </div>
                    <label className="form-input">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Ingresa tu correo"
                    />

                    <label className="form-input">Clave:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="***********************"
                    />

                    <button type="submit" className="btn-login">Ingresar</button>
                </div>
                <img src={img1} alt="" className="img1"/>
            </form>
        </>
    );
};

export default Login;