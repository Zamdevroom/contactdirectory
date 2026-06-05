import { BrowserRouter, Routes as RS, Route } from 'react-router-dom';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './utils/authcontext';
import ProtectedRoutes from './utils/ProtectedRoute';
import RecordPage from './pages/recordpage';
import AddRecord from './pages/addrecord';
import ViewRecord from './pages/editRecord';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                <RecordPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addrecord"
            element={
              <ProtectedRoutes>
                <AddRecord />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editrecord"
            element={
              <ProtectedRoutes>
                <ViewRecord />
              </ProtectedRoutes>
            }
          />
        </RS>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
