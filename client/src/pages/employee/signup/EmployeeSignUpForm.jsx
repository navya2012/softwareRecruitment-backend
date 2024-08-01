
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import '../../../CSSModules/formStyles/formPageStyles.css'
import { Link } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAuthContextData } from '../../../context/AuthProvider';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../../api\'s/authApi\'s';

const EmployeeSignUpForm = () => {
  const { employeeFormData, employeeHandleChange, setEmployeeFormData } = useAuthContextData()
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(signUp(employeeFormData, navigate));
    if (response.success) {
      setEmployeeFormData({
        email: '',
        password: '',
        mobileNumber: '',
        firstName: '',
        lastName: '',
        agreeToTerms: false,
        role: 'employee'
      });
    }
  }
  return (
    <>
      <Box className='form-page-styles'>
        <Typography variant="h4" sx={{ paddingBottom: '30px' }} >Sign Up for an Employee</Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" value="employee" required
            InputProps={{
              readOnly: true
            }}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Email" name="email" type="email" required
            value={employeeFormData.email}
            onChange={employeeHandleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Mobile Number" name="mobileNumber" type="tel" required
            value={employeeFormData.mobileNumber}
            onChange={employeeHandleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="First Name" name="firstName" type="text" required
            value={employeeFormData.firstName}
            onChange={employeeHandleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Last Name" name="lastName" type="text" required
            value={employeeFormData.lastName}
            onChange={employeeHandleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="Password" name="password" type={showPassword ? "text" : "password"}
            value={employeeFormData.password}
            onChange={employeeHandleChange}
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
            required
            control={
              <Checkbox
                name="agreeToTerms"
                checked={employeeFormData.agreeToTerms}
                onChange={employeeHandleChange}
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

        <p className='link-text-style'>Already have an account?{'  '}
          <Link to='/login' className='link-style'>Login</Link>
        </p>
      </Box>
    </>
  )
}

export default EmployeeSignUpForm