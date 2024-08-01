import './App.css';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider';
import ForgotPassword from './common/forgotPassword/ForgotPassword';
import ResetPassword from './common/resetPassword/ResetPassword';
import OTPVerification from './common/verifyOtp/OTPVerification';
import LoginPage from './common/login/LoginPage';
import Navbar from './components/Navbar/Navbar';
import EmployerSignUpPage from './pages/employer/signup/EmployerSignupPage';
import EmployeeSignUpPage from './pages/employee/signup/EmployeeSignUpPage';
import WelcomePage from './components/welcomePage/WelcomePage';
import EmployerDashboard from './pages/employer/dashboard/EmployerDashboard';
import EmployeeDashboard from './pages/employee/dashboard/EmployeeDashboard';


function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
          <Navbar/>
            <Routes>
            <Route path='/' element={<WelcomePage />} />
              <Route path='/employer/signup' element={<EmployerSignUpPage />} />
              <Route path='/employee/signup' element={<EmployeeSignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/verify-otp' element={<OTPVerification />} />
              <Route path='/employer/dashboard' element={<EmployerDashboard />} />
              <Route path='/employee/dashboard' element={<EmployeeDashboard />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
