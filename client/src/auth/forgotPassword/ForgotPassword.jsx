import React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import AuthCoverPage from '../CoverPage/AuthCoverPage';


const ForgotPassword = () => {
    return (
        <>
            <Grid container height="100vh">
                <Grid item xs={12} sm={6}>
                    <AuthCoverPage />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
                    <Box className='form-page-styles'>
                        <Typography variant="h5" sx={{ paddingBottom: '20px' }} >
                            Forgot Password
                        </Typography>
                        <Box component='form' onSubmit={"handleSubmit"}>
                            <Typography variant="p" sx={{ paddingBottom: '20px', color: '#7D8FB3' }} >
                                Enter the email address you used to create the account.
                            </Typography>
                            <TextField variant="outlined" fullWidth margin="normal"
                                label="Email" name="email" type="email"
                            // value={formData.email}
                            // onChange={handleChange}     
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