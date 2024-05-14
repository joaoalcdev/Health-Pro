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
import Appointments from './screens/Appointments';
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
import Doctors from './screens/Doctors/Doctors';
import DoctorProfile from './screens/Doctors/DoctorProfile';
import Receptions from './screens/Receptions';
import NewMedicalRecode from './screens/Patients/NewMedicalRecode';
import NotFound from './screens/NotFound';
import Users from './screens/Users';

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
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              {/* users */}
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              {/* invoce */}
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/invoices/create" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>} />
              <Route path="/invoices/edit/:id" element={<ProtectedRoute><EditInvoice /></ProtectedRoute>} />
              <Route path="/invoices/preview/:id" element={<ProtectedRoute><PreviewInvoice /></ProtectedRoute>} />
              {/* payments */}
              <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="/payments/edit/:id" element={<ProtectedRoute><EditPayment /></ProtectedRoute>} />
              <Route path="/payments/preview/:id" element={<ProtectedRoute><PreviewPayment /></ProtectedRoute>} />
              {/* patient */}
              <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
              <Route path="/patients/preview/:id" element={<ProtectedRoute><PatientProfile /></ProtectedRoute>} />
              <Route path="/patients/create" element={<ProtectedRoute><CreatePatient /></ProtectedRoute>} />
              <Route path="/patients/visiting/:id" element={<ProtectedRoute><NewMedicalRecode /></ProtectedRoute>} />
              {/* doctors */}
              <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
              <Route path="/doctors/preview/:id" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
              {/* reception */}
              <Route path="/receptions" element={<ProtectedRoute><Receptions /></ProtectedRoute>} />
              {/* others */}
              <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="/campaigns" element={<ProtectedRoute><Campaings /></ProtectedRoute>} />
              <Route path="/medicine" element={<ProtectedRoute><Medicine /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RootLayout>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
