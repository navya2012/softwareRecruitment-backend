
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import '../../authStyles/formPageStyles.css'
import { Link } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const EmployeeSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <Box className='form-page-styles'>
        <Typography variant="h5" sx={{ paddingBottom: '20px' }} >Sign Up for an Account</Typography>
        <Box component='form' onSubmit={"handleSubmit"}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" value="employee"
            InputProps={{
              readOnly: true
            }}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Email" name="email" type="email"
          // value={formData.email}
          // onChange={handleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Mobile Number" name="mobile" type="tel"
          // value={formData.email}
          // onChange={handleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="First Name" name="firstName" type="text"
          // value={formData.email}
          // onChange={handleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Last Name" name="lastName" type="text"
          // value={formData.email}
          // onChange={handleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Password" name="password" type={showPassword ? "text" : "password"}
            // value={formData.email}
            // onChange={handleChange}   
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                  </IconButton>
                </InputAdornment>

              )
            }}
          />
          <FormControlLabel
            sx={{ padding: '20px 0' }}
            control={
              <Checkbox
                name="agreeToTerms"
              // checked={formData.agreeToTerms}
              // onChange={handleChange}
              />
            }
            label="By creating an account means you agree to the Terms & Conditions and our Privacy Policy"
          />
          <Button type="submit" variant="contained">Sign Up</Button>
        </Box>
        <div className='line-design'>
          <hr />
          <span className='text'>Or sign up with</span>
          <hr />
        </div>

        <p className='link-text-style'>Already have an account?
          <Link className='link-style'>Sign In</Link>
        </p>
      </Box>
    </>
  )
}

export default EmployeeSignUpForm