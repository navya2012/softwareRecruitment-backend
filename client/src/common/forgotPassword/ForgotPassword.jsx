import React, { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import AuthCoverPage from '../authCoverPage/AuthCoverPage';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/slices/authSlice';
import { forgotPassword } from '../../api\'s/authApi\'s';


const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const response = await forgotPassword(email, navigate);
            if (response.success) {
                setEmail('')
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
                            Forgot Password
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit}>
                            <Typography variant="body2" sx={{ paddingBottom: '20px', color: '#7D8FB3' }} >
                                Enter the email address you used to create the account.
                            </Typography>
                            <TextField variant="outlined" fullWidth margin="normal"
                                label="Email" name="email" type="email" required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Send OTP</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ForgotPassword