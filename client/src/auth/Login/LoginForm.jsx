
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import '../authStyles/formPageStyles.css'
import { Link } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const LoginForm = () => {
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
        <Typography variant="h5" sx={{ paddingBottom: '20px' }} >Sign In to your Account</Typography>
        <Box component='form' onSubmit={"handleSubmit"}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Email" name="email" type="email"
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
          <Link className='link-style' style={{ float: 'right', paddingTop: '15px' }}>Forgot Password ?</Link>
          <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Sign In</Button>
        </Box>
        <div className='line-design'>
          <hr />
          <span className='text'>Or sign In with</span>
          <hr />
        </div>

        <p className='link-text-style'>Already have an account?
          <Link className='link-style'>Sign Up</Link>
        </p>
      </Box>
    </>
  )
}

export default LoginForm