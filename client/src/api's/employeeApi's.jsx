import axios from 'axios'
import { toast } from 'react-toastify'
import '../CSSModules/formStyles/formPageStyles.css'
import { loginSuccess, setLoading} from '../redux/slices/authSlice'
import { setAllJobPosts, setExperienceSuccess, updateJobPostStatus } from '../redux/slices/employeeSlice'



const BASE_URL = "http://localhost:5000/api"

//update details
export const updateEmployeeDetails = (formData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const token = localStorage.getItem('loginToken');
        const response = await axios.patch(`${BASE_URL}/employee/update-details`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            const { updatedUser } = response.data
            if (formData.role === 'employee') {
                dispatch(loginSuccess({ loginDetails: updatedUser }));
            } else if (formData.role === 'employer') {
                dispatch(loginSuccess({ loginDetails: updatedUser }));
            }
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
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

//working experience
export const workingExperience = (experienceData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const token = localStorage.getItem('loginToken');
        const employeeId = JSON.parse(localStorage.getItem('employeeId'));
        const data = { ...experienceData, employee_id: employeeId };  
        const response = await axios.post(`${BASE_URL}/employee/working-experience`,data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setExperienceSuccess(data))
            return {
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
    finally {
        dispatch(setLoading(false));
    }
}

//get job posts
export const getAllJobPostsData = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/employee/get-recruitment-posts`)
        console.log(response)
        if (response && response.data && response.status === 200) {
            const result = response.data.getJobPostsData
            dispatch(setAllJobPosts(result))
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
    finally {
        dispatch(setLoading(false));
    }

}


//get job applied status
export const jobAppliedStatus = (jobId) => async (dispatch) => {
     dispatch(setLoading(true));
    try {
        const token = localStorage.getItem('loginToken');
        const employeeId = JSON.parse(localStorage.getItem('employeeId'));
        const response = await axios.patch(`${BASE_URL}/employee/update-job-applied-status/${jobId}`,
            {
                jobAppliedStatus:"Applied",
                employee_id: employeeId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        console.log('job status',response)
        if (response && response.data && response.status === 200) {
            dispatch(updateJobPostStatus({ jobId, status: 'Applied' }));
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        let errorMessage = '';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errorMessage
        };
    }
    finally {
         dispatch(setLoading(false));
    }
}