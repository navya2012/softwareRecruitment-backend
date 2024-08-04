import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useAuthContextData } from '../../../context/AuthProvider';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { updateEmployerDetails } from '../../../api\'s/employerApi\'s';


const EmployerProfileUpdateForm = ({ handleClose, setOpen }) => {
  const { updateEmployerFormData, setUpdateEmployerFormData,
    handleChangeUpdateEmployerFormData } = useAuthContextData()

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
    const response = await dispatch(updateEmployerDetails(updateEmployerFormData, navigate));
console.log(response)
    if (response.success) {
      setOpen(false)
      setUpdateEmployerFormData({
        _id: null,
        role: 'employer',
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
        employeesCount: '',
        headQuarters: '',
        otp: '',
        isVerified: false,
        agreeToTerms: false,
      });
    }
   
  }
  return (
    <>
      {
        updateEmployerFormData && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', }}>
              <Typography variant="h5" sx={{ paddingBottom: '30px' }} >Update Form for an Employer</Typography>
              <IconButton
                onClick={handleClose}
              >
                <CloseIcon fontSize='large' sx={{color:'black'}}/>
              </IconButton>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
              <TextField variant="outlined" fullWidth margin="normal"
                label="Role" name="role" value="employer" required
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Email" name="email" type="email" required
                value={updateEmployerFormData.email}
                onChange={handleChangeUpdateEmployerFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Mobile Number" name="mobileNumber" type="tel" required
                value={updateEmployerFormData.mobileNumber}
                onChange={handleChangeUpdateEmployerFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
          value={updateEmployerFormData.companyName}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Type" name="companyType" type="text" required
          value={updateEmployerFormData.companyType}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="Address: Street" name="address.street" type="text"
          value={updateEmployerFormData.address.street}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="City" name="address.city" type="text" required
          value={updateEmployerFormData.address.city}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="State" name="address.state" type="text" required
          value={updateEmployerFormData.address.state}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Country" name="address.country" type="text" required
          value={updateEmployerFormData.address.country}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="ZIP Code" name="address.zipCode" type="number"
          value={updateEmployerFormData.address.zipCode}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="No of Employees" name="employeesCount" type="number"
          value={updateEmployerFormData.employeesCount}
          onChange={handleChangeUpdateEmployerFormData}     
          />
          <TextField variant="outlined" fullWidth margin="normal" required
            label="Head Quarters" name="headQuarters" type="text"
          value={updateEmployerFormData.headQuarters}
          onChange={handleChangeUpdateEmployerFormData}     
          />
              <TextField variant="outlined" fullWidth margin="normal" required
                label="Password" name="password" type={showPassword ? "text" : "password"}
                value={updateEmployerFormData.password}
                onChange={handleChangeUpdateEmployerFormData}
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
              <Button type="submit" variant="contained">Submit</Button>
            </Box>
          </>
        )
      }

    </>
  )
}

export default EmployerProfileUpdateForm