import './App.css';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployerSignUpPage from './auth/SignUp/EmployerSignUp/EmployerSignUpPage';
import EmployeeSignUpPage from './auth/SignUp/EmployeeSignUp/EmployeeSignUpPage';
import ForgotPassword from './auth/forgotPassword/ForgotPassword';
import LoginPage from './auth/Login/LoginPage';


function App() {
  return (
   <>
   <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployerSignUpPage/>}/>
        <Route path='/employee' element={<EmployeeSignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
   </>
  );
}

export default App;
