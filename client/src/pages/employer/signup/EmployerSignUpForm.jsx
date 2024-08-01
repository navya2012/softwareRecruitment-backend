
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

const EmployerSignUpForm = () => {
  const {employerHandleChange, employerFormData, setEmployerFormData} = useAuthContextData()
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
    const response = await dispatch(signUp(employerFormData, navigate));
    if (response.success) {
      setEmployerFormData({
        email: '',
        password: '',
        mobileNumber: '',
        companyName: '',
        companyType: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        agreeToTerms: false,
        role: 'employee'
      });
    }

}
  return (
    <>
      <Box className='form-page-styles'>
        <Typography variant="h4" sx={{ paddingBottom: '30px' }} >Sign Up for an Employer</Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" value="employer" required
            InputProps={{
              readOnly: true
            }}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Email" name="email" type="email" required
          value={employerFormData.email}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Mobile Number" name="mobileNumber" type="tel" required
          value={employerFormData.mobileNumber}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
          value={employerFormData.companyName}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Type" name="companyType" type="text" required
          value={employerFormData.companyType}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="Address: Street" name="address.street" type="text"
          value={employerFormData.address.street}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="City" name="address.city" type="text" required
          value={employerFormData.address.city}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="State" name="address.state" type="text" required
          value={employerFormData.address.state}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Country" name="address.country" type="text" required
          value={employerFormData.address.country}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="ZIP Code" name="address.zipCode" type="number"
          value={employerFormData.address.zipCode}
          onChange={employerHandleChange}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="Password" name="password" type={showPassword ? "text" : "password"}
            value={employerFormData.password}
            onChange={employerHandleChange}  
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
              checked={employerFormData.agreeToTerms}
              onChange={employerHandleChange}
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

        <p className='link-text-style'>Already have an account?{'   '}
          <Link to='/' className='link-style'>Login</Link>
        </p>
      </Box>
    </>
  )
}

export default EmployerSignUpForm