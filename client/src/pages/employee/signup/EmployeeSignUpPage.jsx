import React from 'react';
import { Grid } from '@mui/material';
import AuthCoverPage from '../../../common/authCoverPage/AuthCoverPage';
import EmployeeSignUpForm from './EmployeeSignUpForm';


const EmployeeSignUpPage = () => {
  return (
    <Grid container height="100vh">
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center">
        <EmployeeSignUpForm />
      </Grid>     
    </Grid>
  );
};

export default EmployeeSignUpPage;
