import React, { useReducer, useRef } from 'react'
import { Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { setLoading } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api\'s/authApi\'s';


const ResetPassword = () => {
    const passwordReducer = (state, action) => {
        switch (action.type) {
            case 'TOGGLE_PASSWORD':
                return { ...state, showPassword: !state.showPassword };
            case 'SET_FIELD':
                return { ...state, [action.field]: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(passwordReducer, {oldPassword: '', newPassword: '',  showPassword: false });
    const navigate = useNavigate()
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    const handleClickShowPassword = () => {
        dispatch({ type: 'TOGGLE_PASSWORD' });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = () => {
        // Access values directly from refs
        dispatch({ type: 'SET_FIELD', field: 'oldPassword', payload: oldPasswordRef.current.value });
        dispatch({ type: 'SET_FIELD', field: 'newPassword', payload: newPasswordRef.current.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const oldPassword = oldPasswordRef.current.value;
            const newPassword = newPasswordRef.current.value;
            const response = await resetPassword(oldPassword, newPassword, navigate);
            if (response.success) {
                dispatch({ type: 'SET_FIELD', field: 'oldPassword', payload: '' });
                dispatch({ type: 'SET_FIELD', field: 'newPassword', payload: '' });
            }
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <Grid container height="100vh">
                <Grid item xs={12} sm={6}>
                    <AuthCoverPage />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
                    <Box className='form-page-styles'>
                        <Typography variant="h4" sx={{ paddingBottom: '20px' }} >
                            Set Your Password
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField variant="outlined" fullWidth margin="normal"
                                label="Old Password" name="oldPassword" 
                                type={state.showPassword ? "text" : "password"}
                                inputRef={oldPasswordRef}
                            onChange={handleChange}  
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {state.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>

                                    )
                                }}
                            />

                            <TextField variant="outlined" fullWidth margin="normal"
                                label="New Password" name="newPassword" 
                                type={state.showPassword ? "text" : "password"}
                                inputRef={newPasswordRef}
                            onChange={handleChange} 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {state.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>

                                    )
                                }}
                            />

                            <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Reset Password</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ResetPassword