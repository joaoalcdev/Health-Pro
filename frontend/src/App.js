import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import Toast from './components/Notifications/Toast';
import Payments from './screens/Payments/Payments';
import Schedule from './screens/Schedule';
import Patients from './screens/Patients/Patients';
import PatientProfile from './screens/Patients/PatientProfile';
import Professionals from './screens/Professionals/Professionals';
import ProfessionalProfile from './screens/Professionals/ProfessionalProfile';
import NotFound from './screens/NotFound';
import Users from './screens/Users';
import Specialties from './screens/Specialties';
import Waitlist from './screens/Waitlist/Waitlist';
import ExternalServices from './screens/External Services/ExternalServices';

// AuthProvider
// import Login from './screens/Login';
import Login from './screens/Login.js';
import { AuthProvider } from './hooks/Auth';
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from './components/RootLayout';
import EventDetails from './screens/Events/EventDetails';

function App() {
  Aos.init();

  return (
    <>
      {/* Toaster */}
      <Toast />
      {/* Routes */}
      <BrowserRouter>
        <AuthProvider>
          <RootLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute roleId={3}><Schedule /></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute roleId={3}><Schedule /></ProtectedRoute>} />
              {/* users */}
              <Route path="/users" element={<ProtectedRoute roleId={1} ><Users /></ProtectedRoute>} />
              {/* waitlist */}
              <Route path="/waitlist" element={<ProtectedRoute roleId={2}><Waitlist /></ProtectedRoute>} />
              {/* external services */}
              <Route path="/external-services" element={<ProtectedRoute roleId={1}><ExternalServices /></ProtectedRoute>} />
              {/* payments */}
              <Route path="/payments" element={<ProtectedRoute roleId={1}><Payments /></ProtectedRoute>} />
              {/* patient */}
              <Route path="/patients" element={<ProtectedRoute roleId={2}><Patients /></ProtectedRoute>} />
              <Route path="/patients/preview/:id" element={<ProtectedRoute roleId={3}><PatientProfile /></ProtectedRoute>} />
              {/* professionals */}
              <Route path="/professionals" element={<ProtectedRoute roleId={1}><Professionals /></ProtectedRoute>} />
              <Route path="/professionals/preview/:id" element={<ProtectedRoute roleId={1}><ProfessionalProfile /></ProtectedRoute>} />
              {/* events */}
              <Route path="/events/details/:id" element={<ProtectedRoute roleId={3}><EventDetails /></ProtectedRoute>} />
              {/* reception */}
              {/* others */}
              <Route path="/specialties" element={<ProtectedRoute roleId={1}><Specialties /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RootLayout>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
