import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../Context/AuthProvider';
import '../layout/Dashboard.css'
const Dashboard = () => {
  const [autenticado, setAutenticado] = useState(true); 
  const location = useLocation();
  const urlActual = location.pathname;

  const { auth } = useContext(AuthContext); 

  return (
    <div className="dashboard-container">
      
      <ul className="nabv">
        <p className="text-slate-400 text-center my-4 text-sm">
          <span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span> Bienvenido - {auth?.nombre}
        </p>
        <li className="text-center">
          <Link to='/dashboard/perfil' className={`${urlActual === '/dashboard/perfil' ? 'active' : ''}`}>Perfil</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/tecnicos' className={`${urlActual === '/dashboard/tecnicos' ? 'active' : ''}`}>Tecnicos</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/clientes' className={`${urlActual === '/dashboard/clientes' ? 'active' : ''}`}>Clientes</Link>
        </li>
        <li className="text-center">
          <Link to='/dashboard/tickets' className={`${urlActual === '/dashboard/tickets' ? 'active' : ''}`}>Tickets</Link>
        </li>
        <div>
          <Link to='/' onClick={() => { localStorage.removeItem("token") }}>Salir</Link>
        </div>
      </ul>

      <div className="content-area">
        {autenticado ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default Dashboard;