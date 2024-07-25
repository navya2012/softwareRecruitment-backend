import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import '../../authStyles/signUpStyles.css'

const EmployerSignUpForm = () => {
  return (
    <>
      <Box component='form' className='signUp-styles' onSubmit={"handleSubmit"}>
        <Typography variant="h5" sx={{ paddingBottom: '20px' }} >Sign Up for an Account</Typography>
        <TextField variant="outlined" fullWidth margin="normal"
          label="Role" name="role" value="employer"
          InputProps={{
            readOnly: true
          }}
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Email" name="email"  type="email"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Mobile Number" name="mobile"  type="tel"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Company Name" name="companyName"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Company Type" name="companyType"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Address: Street" name="street"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="City" name="city"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="State" name="state"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="Country" name="country"  type="text"
          // value={formData.email}
          // onChange={handleChange}     
        />
        <TextField variant="outlined" fullWidth margin="normal"
          label="ZIP Code" name="zipcode"  type="number"
          // value={formData.email}
          // onChange={handleChange}     
        />
             <TextField variant="outlined" fullWidth margin="normal"
          label="Password" name="password"  type="password"
          // value={formData.email}
          // onChange={handleChange}     
        />
         <FormControlLabel
         sx={{padding:'20px 0'}}
        control={
          <Checkbox
            name="agreeToTerms"
            // checked={formData.agreeToTerms}
            // onChange={handleChange}
          />
        }
        label="By creating an account means you agree to the Terms & Conditions and our Privacy Policy"
      />
          <Button
        type="submit"
        variant="contained"
        // sx={{ width: '100%', backgroundColor:'#0557A2' }}
      >
        Sign Up
      </Button>
      </Box>
    </>
  )
}

export default EmployerSignUpForm