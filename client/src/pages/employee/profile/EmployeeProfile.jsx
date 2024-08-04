import { Box, Paper, Typography, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContextData } from '../../../context/AuthProvider';
import EditIcon from '@mui/icons-material/Edit';
import EmployeeProfileUpdateForm from './EmployeeProfileUpdateForm';



const EmployeeProfile = () => {
  const { setUpdateEmployeeFormData } = useAuthContextData();
  const { userData } = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
    setUpdateEmployeeFormData({
      _id: userData._id,
      role: 'employee',
      email: userData.email,
      password: userData.password,
      mobileNumber: userData.mobileNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
      position: userData.position,
      currentCompany: userData.currentCompany,
      location: userData.location,
      otp: userData.otp,
      isVerified: userData.isVerified,
      agreeToTerms: userData.agreeToTerms,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
        <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
            <Typography variant="h4">Personal Information</Typography>
            <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Name of the Employee
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{userData.firstName} {userData.lastName}</Typography>
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
                Role
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{userData.position}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Current Company
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{userData.currentCompany}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{userData.location}</Typography>
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
          <EmployeeProfileUpdateForm handleClose={handleClose} setOpen={setOpen} />
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeProfile;
