import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext); // Obtiene el estado de autenticación

  // Si no está autenticado, redirige a login
  if (!auth) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return children;
};

export default PrivateRoute;