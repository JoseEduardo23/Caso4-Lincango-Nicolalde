import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './layout/Dashboard.jsx';
import Perfil from './paginas/Perfil.jsx';


/*- Modulo - Login -*/
import Login from './paginas/login.jsx';

/*- Modulo -Tecnicos -*/
import Tecnicos from './paginas/Tecnicos/Tecnicos.jsx';
import Crear_tec from './paginas/Tecnicos/Crear_tec.jsx'
import Listar_tec from './paginas/Tecnicos/Listar_tec.jsx';
import Actualizar_tec from './paginas/Tecnicos/Actualizar_tec.jsx';
import Visualizar_tec from './paginas/Tecnicos/Visualizar_tec.jsx';


/*- Modulo - Tickets -*/
import Tickets from './paginas/Tickets/Tickets.jsx';
import Crear_tic from './paginas/Tickets/Crear_tic.jsx';
import Listar_tic from './paginas/Tickets/Listar_tic.jsx';
import Actualizar_tic from './paginas/Tickets/Actualizar_tic.jsx';
import Visualizar_tic from './paginas/Tickets/Visualizar_tic.jsx';


/*- Modulo - Clientes -*/
import Clientes from './paginas/Clientes/Clientes.jsx';
import Crear_cli from './paginas/Clientes/Crear_cli.jsx';
import Listar_cli from './paginas/Clientes/Listar_cli.jsx';
import Actualizar_cli from './paginas/Clientes/Actualizar_cli.jsx';
import Visualizar_cli from './paginas/Clientes/Visualizar_cli.jsx';

function App(){
    return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              
              <Route path="/dashboard/*" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }>
                <Route path="perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
    
                <Route path="tecnicos" element={<PrivateRoute><Tecnicos /></PrivateRoute>} >
                  <Route path="crear_tec" element={<PrivateRoute><Crear_tec /></PrivateRoute>} />
                  <Route path="listar_tec" element={<PrivateRoute><Listar_tec /></PrivateRoute>} />
                  <Route path="actualizar_tec/:id" element={<PrivateRoute><Actualizar_tec /></PrivateRoute>} />
                  <Route path="visualizar_tec/:id" element={<PrivateRoute><Visualizar_tec /></PrivateRoute>} />
                </Route>

                <Route path="clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} >
                  <Route path="crear_cli" element={<PrivateRoute><Crear_cli /></PrivateRoute>} />
                  <Route path="listar_cli" element={<PrivateRoute><Listar_cli /></PrivateRoute>} />
                  <Route path="actualizar_cli/:id" element={<PrivateRoute><Actualizar_cli /></PrivateRoute>} />
                  <Route path="visualizar_cli/:id" element={<PrivateRoute><Visualizar_cli /></PrivateRoute>} />
                </Route>

                <Route path="tickets" element={<PrivateRoute><Tickets /></PrivateRoute>} >
                  <Route path="crear_tic" element={<PrivateRoute><Crear_tic /></PrivateRoute>} />
                  <Route path="listar_tic" element={<PrivateRoute><Listar_tic /></PrivateRoute>} />
                  <Route path="actualizar_tic/:id" element={<PrivateRoute><Actualizar_tic /></PrivateRoute>} />
                  <Route path="visualizar_tic/:id" element={<PrivateRoute><Visualizar_tic /></PrivateRoute>} />
                </Route>



              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
    }

export default App