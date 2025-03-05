import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import '../../Estilos/Formulariomatri.css'
const Form_tic = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cedula, setCedula] = useState("");
    const [ccedulaT, setCcedulaT] = useState("");
    const [cliente, setCliente] = useState(null);
    const [tecnico, setTecnico] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [ticket, setTicket] = useState(null);
    const [form, setForm] = useState({
        descripcion: "",
    });

    useEffect(() => {
        if (id) {
            const cargarTicket = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const url = `http://localhost:3000/api/ticket/${id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const respuesta = await axios.get(url, options);

                    if (respuesta.data) {
                        setTicket(respuesta.data);
                        setForm({ descripcion: respuesta.data.descripcion });

                        if (respuesta.data.cliente) {
                            setCliente(respuesta.data.cliente);
                            setCedula(respuesta.data.cliente.cedula);
                        }

                        if (respuesta.data.tecnico && respuesta.data.tecnico.length > 0) {
                            setTecnico(respuesta.data.tecnico[0]);
                            setCcedulaT(respuesta.data.tecnico[0].codigo);
                        }
                    }
                } catch (error) {
                    console.error("Error al cargar la matrícula:", error);
                    toast.error("Error al cargar la matrícula.");
                }
            };
            cargarTicket();
        }
    }, [id]);

    const buscarCliente = async () => {
        setMensaje("");

        if (!cedula.trim()) {
            setMensaje("Por favor, ingrese una cédula válida.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:3000/api/cliente/clientes";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);
            console.log("Respuesta del servidor:", respuesta.data);

            if (!Array.isArray(respuesta.data)) {
                setMensaje("Error: La respuesta no es una lista de clientes.");
                return;
            }

            const clienteEncontrado = respuesta.data.find(
                (user) => user.cedula.toString().trim() === cedula.trim()
            );

            if (clienteEncontrado) {
                setCliente(clienteEncontrado);
                toast.success("Cliente encontrado con éxito.");
            } else {
                setCliente(null);
                toast.error("Cliente no encontrado.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error("Error al buscar el cliente.");
        }
    };

    const buscarTecnico = async () => {
        setMensaje("");

        if (!ccedulaT.trim()) {
            setMensaje("Por favor, ingrese un código de tecnico válido.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:3000/api/tecnico/tecnicos";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);

            if (!Array.isArray(respuesta.data)) {
                setMensaje("Error: La respuesta no es una lista de tecnico.");
                return;
            }

            const tecnicoEncontrada = respuesta.data.find(
                (mat) => mat.cedula.toString().trim() === ccedulaT.trim()
            );

            if (tecnicoEncontrada) {
                setTecnico(tecnicoEncontrada);
                toast.success("Tecnico encontrado.");
            } else {
                setTecnico(null);
                toast.error("Tecnico no encontrado.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error("Error al buscar la tecnico.");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cliente || !tecnico) {
            toast.error("Por favor, asegúrese de que el cliente y la tecnico estén encontrados.");
            return;
        }

        if (!form.descripcion.trim()) {
            toast.error("Por favor, ingrese una descripción válida.");
            return;
        }

        const dataToSubmit = {
            cliente: [cliente._id],
            tecnico: tecnico._id,
            descripcion: form.descripcion
        };
        console.log("Datos a enviar:", dataToSubmit);

        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            let url;
            let metodo;
            if (ticket?._id) {
                url = `http://localhost:3000/api/ticket/actualizar/${ticket._id}`;
                metodo = axios.put;
            } else {
                url = "http://localhost:3000/api/ticket/crear";
                metodo = axios.post;
                
            }

            const respuesta = await metodo(url, dataToSubmit, { headers });
            toast.success(ticket?._id ? "Matrícula actualizada con éxito." : "Registro de matrícula completado.");
            navigate('/dashboard/tickets/listar_tic');
        } catch (error) {
            console.error("Error en la solicitud:", error.response?.data || error.message);
            toast.error(error.response?.data?.msg || "Error en la solicitud");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="ticket-form">
                    <div className="form-group">
                        <div>
                            <label className="form-label">Cédula del cliente</label>
                            <input
                                type="text"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                className="input-field"
                            />
                            <button type="button" onClick={buscarCliente} className="search-button">
                                Buscar Cliente
                            </button>
                        </div>

                        {cliente && (
                            <div className="student-details">
                                <h3>Detalles del Cliente:</h3>
                                <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
                                <p><strong>Cédula:</strong> {cliente.cedula}</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <div>
                            <label className="form-label">Código del tecnico</label>
                            <input
                                type="text"
                                value={ccedulaT}
                                onChange={(e) => setCcedulaT(e.target.value)}
                                className="input-field"
                            />
                            <button type="button" onClick={buscarTecnico} className="search-button">
                                Buscar Tecnico
                            </button>
                        </div>

                        {tecnico && (
                            <div className="tecnico-details">
                                <h3>Detalles de la Tecnico:</h3>
                                <p><strong>Tecnico:</strong> {tecnico.nombre}</p>
                                <p><strong>Apellido:</strong> {tecnico.apellido}</p>
                                <p><strong>Celular:</strong> {tecnico.celular}</p>
                            </div>
                        )}
                    </div>

                    {mensaje && <p className={`message ${cliente || tecnico ? "success" : "error"}`}>{mensaje}</p>}

                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input className="submit-btn" type="submit" value={ticket?._id ? "Actualizar" : "Registrar"} />
                </form>
            </div>
        </>
    );
};

export default Form_tic