import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useAuthContextData } from '../../../context/AuthProvider';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { updateEmployeeDetails } from '../../../api\'s/employeeApi\'s';
import CloseIcon from '@mui/icons-material/Close';

const EmployeeProfileUpdateForm = ({ handleClose, setOpen }) => {
  const { updateEmployeeFormData, setUpdateEmployeeFormData,
    handleChangeUpdateEmployeeFormData } = useAuthContextData()

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
    const response = await dispatch(updateEmployeeDetails(updateEmployeeFormData, navigate));

    if (response.success) {
      setOpen(false)
      setUpdateEmployeeFormData({
        _id: null,
        role: 'employee',
        email: '',
        password: '',
        mobileNumber: '',
        firstName: '',
        lastName: '',
        position: '',
        currentCompany: '',
        location: '',
        otp: '',
        isVerified: false,
        agreeToTerms: false,
      });
    }
   
  }
  return (
    <>
      {
        updateEmployeeFormData && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', }}>
              <Typography variant="h4" sx={{ paddingBottom: '30px' }} >Update Form for an Employee</Typography>
              <IconButton
                onClick={handleClose}
              >
                <CloseIcon fontSize='large' sx={{color:'black'}}/>
              </IconButton>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
              <TextField variant="outlined" fullWidth margin="normal"
                label="Role" name="role" value="employee" required
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Email" name="email" type="email" required
                value={updateEmployeeFormData.email}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Mobile Number" name="mobileNumber" type="tel" required
                value={updateEmployeeFormData.mobileNumber}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="First Name" name="firstName" type="text" required
                value={updateEmployeeFormData.firstName}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Last Name" name="lastName" type="text" required
                value={updateEmployeeFormData.lastName}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Role" name="position" type="text" required
                value={updateEmployeeFormData.position}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Current Company" name="currentCompany" type="text" required
                value={updateEmployeeFormData.currentCompany}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal"
                label="Location" name="location" type="text" required
                value={updateEmployeeFormData.location}
                onChange={handleChangeUpdateEmployeeFormData}
              />
              <TextField variant="outlined" fullWidth margin="normal" required
                label="Password" name="password" type={showPassword ? "text" : "password"}
                value={updateEmployeeFormData.password}
                onChange={handleChangeUpdateEmployeeFormData}
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

export default EmployeeProfileUpdateForm