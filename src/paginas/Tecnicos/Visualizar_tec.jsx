import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from '../../components/Alerta/Mensaje';
import '../../Estilos/Visualizar.css'

const Visualizar_tec = () =>{
    const {id} = useParams()
    const [tecnico, setTecnico] = useState([])
    const [mensaje, setMensaje] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const consultartecnico = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No se encontró el token de autenticación.");
                }
                
                const url = `https://examen-fin-carrera-backend.onrender.com/api/tecnico/${id}`;
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
                setTecnico(respuesta.data.tecnico || respuesta.data);

            } catch (error) {
                toast.error(error.response.data.msg)
                setMensaje({ respuesta: error.response?.data?.msg || error.message || "Error desconocido", tipo: false });
            } finally {
                setLoading(false);
            }
        };
        consultartecnico();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!tecnico) {
        return (
            <div>
                <Mensaje tipo={false}>
                    {mensaje.respuesta || "tecnico no encontrado."}
                </Mensaje>
            </div>
        );
    }

    const {
        nombre,
        apellido,
        email,
        celular,
        cedula,
        fecha_nacimiento,
        genero,
        ciudad,
        direccion
    } = tecnico;

    return (
        <>
            <h1>Visualizar datos del tecnico</h1>
            <div className="div-container">
                {tecnico && Object.keys(tecnico).length !== 0 ? (
                    <div className="visualizar-container">
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Nombre: </span>
                            {nombre ? nombre : "Nombre no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Apellido: </span>
                            {apellido ? apellido : "Apellido no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Email: </span>
                            {email ? email : "Email no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Celular: </span>
                            {celular ? celular : "Celular no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Cédula: </span>
                            {cedula ? cedula : "Cédula no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Fecha de Nacimiento: </span>
                            {fecha_nacimiento ? new Date(fecha_nacimiento).toLocaleDateString() : "Fecha no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Género: </span>
                            {genero ? new Date(genero).toLocaleDateString() : "genero no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Ciudad: </span>
                            {ciudad ? ciudad : "Ciudad no disponible"}
                        </p>
                        <p className="text">
                            <span className="text-gray-600 uppercase font-bold">* Direccion: </span>
                            {direccion ? direccion : "Direccion no disponible"}
                        </p>
                    </div>
                ) : (
                    <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta || "tecnico no encontrado."}</Mensaje>
                )}
            </div>
        </>
    )
}
export default Visualizar_tec