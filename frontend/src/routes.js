import { BrowserRouter, Routes as RS, Route } from 'react-router-dom';
// Importing required pages
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import { AuthProvider, useAuth } from './utils/authcontext';
import ProtectedRoutes from './utils/ProtectedRoute';
import Navbar from './components/navbar';
import RecordPage from './pages/recordpage';
import AddRecord from './pages/addrecord';
import ViewRecord from './pages/editRecord';


const Routes = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
    <AuthProvider>
    {/* <Navbar /> */}
        <RS>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoutes>
                <RecordPage/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addrecord"
            element={
              <ProtectedRoutes>
                <AddRecord/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editrecord"
            element={
              <ProtectedRoutes>
                <ViewRecord/>
              </ProtectedRoutes>
            }
          />

        </RS>
       
        </AuthProvider>
    </BrowserRouter>
    
  );
};

export default Routes;


