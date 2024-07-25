import './App.css';
import EmployeeSignUpPage from './components/pages/auth/SignUp/EmployeeSignUp/EmployeeSignUpPage';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployerSignUpPage from './components/pages/auth/SignUp/EmployerSignUp/EmployerSignUpPage'

function App() {
  return (
   <>
   <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployerSignUpPage/>}/>
        <Route path='/employee' element={<EmployeeSignUpPage/>}/>
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
   </>
  );
}

export default App;
