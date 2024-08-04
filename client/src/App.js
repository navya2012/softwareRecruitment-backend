import './App.css';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider';
import ForgotPassword from './common/forgotPassword/ForgotPassword';
import ResetPassword from './common/resetPassword/ResetPassword';
import OTPVerification from './common/verifyOtp/OTPVerification';
import LoginPage from './common/login/LoginPage';
import EmployerSignUpPage from './pages/employer/signup/EmployerSignupPage';
import EmployeeSignUpPage from './pages/employee/signup/EmployeeSignUpPage';
import WelcomePage from './components/welcomePage/WelcomePage';
import EmployerDashboard from './pages/employer/dashboard/EmployerDashboard';
import EmployeeDashboard from './pages/employee/dashboard/EmployeeDashboard';
import Layout from './components/layout/Layout';
import PrivatePath from './common/privatePath/PrivatePath';
import ExperienceProvider from './context/ExperienceProvider';
import JobPosts from './pages/employer/jobPosts/JobPosts';
import JobPostsData from './pages/employee/jobPosts/JobPostsData';
import JobAppliedApplications from './pages/employer/applications/JobAppliedApplications';



function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ExperienceProvider>
          <BrowserRouter>
            <Routes>
            <Route element={<Layout />}>
            <Route path='/' element={<WelcomePage />} />
              <Route path='/employer/signup' element={<EmployerSignUpPage />} />
              <Route path='/employee/signup' element={<EmployeeSignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/verify-otp' element={<OTPVerification />} />
              <Route path='/employer/dashboard' element={<PrivatePath><EmployerDashboard /></PrivatePath> } />
              <Route path='/employee/dashboard' element={<PrivatePath><EmployeeDashboard /></PrivatePath>} />
              <Route path='/employer/jobs' element={<PrivatePath><JobPosts /></PrivatePath>} />
              <Route path='/employee/jobs' element={<PrivatePath><JobPostsData /></PrivatePath>} />
              <Route path='/employer/applications' element={<PrivatePath><JobAppliedApplications /></PrivatePath>} />
              </Route>
            </Routes>
          </BrowserRouter>
          </ExperienceProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
