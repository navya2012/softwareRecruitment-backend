
import { Box, Button, TextField, Typography, InputAdornment, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import '../../CSSModules/formStyles/formPageStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useDispatch } from 'react-redux';
import { clearError } from '../../redux/slices/authSlice';
import { login } from '../../api\'s/authApi\'s';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();

  const handleChange = (e) => {
      const {name, value} = e.target
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      dispatch(clearError());
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await dispatch(login(formData, navigate));
        if (response.success) {
          setFormData({
            email: '',
            password: '',
          });
        }
  }
  return (
    <>
      <Box className='form-page-styles'>
      <Typography variant="h3" sx={theme.typography.welcomeHeader}>
          Welcome to <span style={{ color: '#364BC6' }}>INKPROG</span>
        </Typography>
        <Typography variant="h6" component="h6" sx={theme.typography.welcomeSubheader}>
          Login  . . .
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Email" name="email" type="email"
          value={formData.email}
          onChange={handleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Password" name="password" type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}   
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
          <Link to='/forgot-password'  className='link-style' style={{ float: 'right', paddingTop: '15px' }}>Forgot Password ?</Link>
          <Button type="submit" variant="contained" sx={{ marginTop: '40px' }}>Sign In</Button>
        </Box>
        <div className='line-design'>
          <hr />
          <span className='text'>Or sign In with</span>
          <hr />
        </div>

        <Box className='link-text-style'> Don't have an account?{'  '}
          <Link to='/' className='link-style'>Sign Up</Link>
        </Box>
      </Box>
    </>
  )
}

export default LoginForm