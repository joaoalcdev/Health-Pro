// ********* Delight - Dentist Website is created by Zpunet ******************
// ********* If you get an error please contact us ******
// ******** Email:info@codemarketi.com *********
// ********* Website:www.codemarketi.com *********
// ********* Phone:+255 762 352 746 *********
// ********* Youtub Channel: https://www.youtube.com/channel/UCOYwYO-LEsrjqBs6xXSfq1w *********

// ******** Support my work with *********
// ********* https://www.patreon.com/zpunet *********
// ********* https://www.buymeacoffee.com/zpunet *********

// ********* This is the main component of the website *********

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import Dashboard from './screens/Dashboard';
import Toast from './components/Notifications/Toast';
import Payments from './screens/Payments/Payments';
import Schedule from './screens/Schedule';
import Patients from './screens/Patients/Patients';
import Campaings from './screens/Campaings';
import Services from './screens/Services';
import Invoices from './screens/Invoices/Invoices';
import Settings from './screens/Settings';
import CreateInvoice from './screens/Invoices/CreateInvoice';
import EditInvoice from './screens/Invoices/EditInvoice';
import PreviewInvoice from './screens/Invoices/PreviewInvoice';
import EditPayment from './screens/Payments/EditPayment';
import PreviewPayment from './screens/Payments/PreviewPayment';
import Medicine from './screens/Medicine';
import PatientProfile from './screens/Patients/PatientProfile';
import CreatePatient from './screens/Patients/CreatePatient';
import EditPatient from './screens/Patients/EditPatient';
import Professionals from './screens/Professionals/Professionals';
import ProfessionalProfile from './screens/Professionals/ProfessionalProfile';
import Doctors from './screens/Doctors/Doctors';
import DoctorProfile from './screens/Doctors/DoctorProfile';
import Receptions from './screens/Receptions';
import NewMedicalRecode from './screens/Patients/NewMedicalRecode';
import NotFound from './screens/NotFound';
import Users from './screens/Users';
import Specialties from './screens/Specialties';
import ImageUploader from './components/ImageUploader';

// AuthProvider
// import Login from './screens/Login';
import Login from './screens/Login.js';
import { AuthProvider } from './hooks/Auth';
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from './components/RootLayout';

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
              <Route path="/" element={<ProtectedRoute roleId={3}><Dashboard /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute roleId={3}><Dashboard /></ProtectedRoute>} />
              <Route path="/imageuploader" element={<ProtectedRoute roleId={3}><ImageUploader /></ProtectedRoute>} />
              {/* users */}
              <Route path="/users" element={<ProtectedRoute roleId={1} ><Users /></ProtectedRoute>} />
              {/* invoce */}
              <Route path="/invoices" element={<ProtectedRoute roleId={1}><Invoices /></ProtectedRoute>} />
              <Route path="/invoices/create" element={<ProtectedRoute roleId={1}><CreateInvoice /></ProtectedRoute>} />
              <Route path="/invoices/edit/:id" element={<ProtectedRoute roleId={1}><EditInvoice /></ProtectedRoute>} />
              <Route path="/invoices/preview/:id" element={<ProtectedRoute roleId={1}><PreviewInvoice /></ProtectedRoute>} />
              {/* payments */}
              <Route path="/payments" element={<ProtectedRoute roleId={1}><Payments /></ProtectedRoute>} />
              <Route path="/payments/edit/:id" element={<ProtectedRoute roleId={1}><EditPayment /></ProtectedRoute>} />
              <Route path="/payments/preview/:id" element={<ProtectedRoute roleId={1}><PreviewPayment /></ProtectedRoute>} />
              {/* patient */}
              <Route path="/patients" element={<ProtectedRoute roleId={2}><Patients /></ProtectedRoute>} />
              <Route path="/patients/preview/:id" element={<ProtectedRoute roleId={3}><PatientProfile /></ProtectedRoute>} />
              <Route path="/patients/edit/:id" element={<ProtectedRoute roleId={3}><EditPatient /></ProtectedRoute>} />
              <Route path="/patients/create" element={<ProtectedRoute roleId={2}><CreatePatient /></ProtectedRoute>} />
              <Route path="/patients/visiting/:id" element={<ProtectedRoute roleId={2}><NewMedicalRecode /></ProtectedRoute>} />
              {/* professionals */}
              <Route path="/professionals" element={<ProtectedRoute roleId={1}><Professionals /></ProtectedRoute>} />
              <Route path="/professionals/preview/:id" element={<ProtectedRoute roleId={1}><ProfessionalProfile /></ProtectedRoute>} />
              {/* doctors */}
              <Route path="/doctors" element={<ProtectedRoute roleId={1}><Doctors /></ProtectedRoute>} />
              <Route path="/doctors/preview/:id" element={<ProtectedRoute roleId={1}><DoctorProfile /></ProtectedRoute>} />
              {/* reception */}
              <Route path="/receptions" element={<ProtectedRoute roleId={1}><Receptions /></ProtectedRoute>} />
              {/* others */}
              <Route path="/schedule" element={<ProtectedRoute roleId={3}><Schedule /></ProtectedRoute>} />
              <Route path="/campaigns" element={<ProtectedRoute roleId={1}><Campaings /></ProtectedRoute>} />
              <Route path="/medicine" element={<ProtectedRoute roleId={1}><Medicine /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute roleId={1}><Services /></ProtectedRoute>} />
              <Route path="/specialties" element={<ProtectedRoute roleId={1}><Specialties /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute roleId={3}><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RootLayout>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
