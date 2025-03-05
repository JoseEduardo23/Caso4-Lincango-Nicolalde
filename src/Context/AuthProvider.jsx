import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AuthContext = createContext()

const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({})

    const perfil = async (token) =>{
        try{
            const url = `http://localhost:3000/api/perfil`
            const options = {
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            const response = await axios.get(url, options)
            toast.success(response.data.msg)
            setAuth(response.data)
        }catch(error){
            toast.error("Error al obtener el perfil")
            setAuth({})
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            perfil(token)
        }else{
            setAuth({})
        }
    },[setAuth])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
            >
                {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;