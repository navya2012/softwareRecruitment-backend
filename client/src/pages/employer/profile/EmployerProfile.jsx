import { Box, Paper, Typography, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmployerProfileUpdateForm from './EmployerProfileUpdateForm';


const EmployerProfile = () => {
    const { setUpdateEmployerFormData } = useAuthContextData();
    const { userData } = useSelector((state) => state.authReducer);
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        console.log('UserData:', userData);
        setOpen(true);
        setUpdateEmployerFormData({
            _id: userData._id,
            role: 'employer',
            email: userData.email,
            password: userData.password,
            mobileNumber: userData.mobileNumber,
            companyName: userData.companyName,
            companyType: userData.companyType,
            address: {
                street: userData.address.street,
                city: userData.address.city,
                state: userData.address.state,
                country: userData.address.country,
                zipCode: userData.address.zipCode
            },
            employeesCount: userData.employeesCount,
            headQuarters: userData.headQuarters,
            otp: userData.otp,
            isVerified: userData.isVerified,
            agreeToTerms: userData.agreeToTerms,
        });
    };

    const formatAddress = (address) => {
        return [address.street, address.city, address.state, address.country, address.zipCode]
          .filter(Boolean)  // Filter out any falsey values like null, undefined, ''
          .join(', ');      
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
                <Box sx={{ maxWidth: '650px', margin: '0 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
                        <Typography variant="h4">Personal Information</Typography>
                        <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Company Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.companyName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.email}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Mobile Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.mobileNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Company Type
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.companyType}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Address
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">
                            {formatAddress(userData.address)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                No of Employees
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.employeesCount}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Head Quarters
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{userData.headQuarters}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{
                maxHeight: '90vh',  
                overflowY: 'auto',
                backgroundColor: 'white',
                padding: '40px',  
                borderRadius: '8px',  
                boxShadow: 24,  
                width: '90%',  
                maxWidth: '750px'  
                }}
                >

                    <EmployerProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
                </Box>
            </Modal>
        </Box>
    );
};

export default EmployerProfile;
