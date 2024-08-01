import axios from 'axios'
import { toast } from 'react-toastify'
import { loginFailure, loginSuccess, setLoading, signUpEmployeeSuccess, signUpEmployerSuccess, signUpFailure } from '../redux/slices/userSlices'
import '../CSSModules/formStyles/formPageStyles.css'

const BASE_URL = "http://localhost:5000/api"

//sign up
export const signUp = (formData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, formData)
        if (response && response.data.token &&  response.status === 200) {
            const { token, signUpDetails } = response.data;
            //const userIdentifier = signUpDetails.email; 
            localStorage.setItem(`signUpToken`, token);
            // Store user details
            const userDetails = {
                role: signUpDetails.role,
                email: signUpDetails.email
            };
            localStorage.setItem(`userDetails`, JSON.stringify(userDetails));

            if (formData.role === 'employee') {
                dispatch(signUpEmployeeSuccess({ userDetails: signUpDetails }));
              } else if (formData.role === 'employer') {
                dispatch(signUpEmployerSuccess({ userDetails: signUpDetails }));
              }   
              
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                className: 'custom-toast'
            });
            navigate('/verify-otp')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        dispatch(signUpFailure(errorMessages));
        errorMessages && errorMessages.forEach(message => {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                className: 'custom-toast'
            });
        });
        return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
}

//verify otp
export const verifyOtp =  async ( otp, navigate) => {
    try{
        const token = localStorage.getItem('signUpToken');
        const response = await axios.post(`${BASE_URL}/auth/verify-otp`, 
            {
                "otp" : otp
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            navigate('/login')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error 
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errors 
        };
    }
}

//login
export const login =  ( formData, navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try{
        const response = await axios.post(`${BASE_URL}/auth/login`,formData)
        if (response &&  response.status === 200) {
            const { token, loginUsers } = response.data;
            localStorage.setItem('loginToken', token);
            localStorage.setItem('loginUsers', JSON.stringify(loginUsers));

            dispatch(loginSuccess({loginUsers}));

            if (loginUsers.role === 'employee') {
                navigate('/employee/dashboard');
            } else if (loginUsers.role === 'employer') {
                navigate('/employer/dashboard');
            }
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        console.log("login error", error);
    
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
    
        dispatch(loginFailure(errorMessages));
        errorMessages.forEach(message => {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                className: 'custom-toast'
            });
        });
        return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
    
}

//forgot password
export const forgotPassword =  async( email, navigate) => {
    try{
        const token = localStorage.getItem('signUpToken');
        const response = await axios.post(`${BASE_URL}/auth/forgot-password`,
            {
                "email":email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
             navigate('/verify-otp')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){
        const errors = error.response.data.error 
        console.log('forgot pwd error', errors)
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errors 
        };
    }
}

//reset password
export const resetPassword =async  (  oldPassword, newPassword, navigate)  => {
    console.log(oldPassword, newPassword)
    try{
        const token = localStorage.getItem('signUpToken');
        const response = await axios.post(`${BASE_URL}/auth/reset-password`,
            {
                "oldPassword":oldPassword,
                "newPassword":newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            // navigate('/verify-otp')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){ 
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }

        toast.error(errorMessages, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errorMessages 
        };
    }
}