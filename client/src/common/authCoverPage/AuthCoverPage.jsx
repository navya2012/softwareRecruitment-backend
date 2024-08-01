import React from 'react'
import { Box } from '@mui/material';

const AuthCoverPage = () => {
  return (
    <>
       <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={{ backgroundColor: '#0557A2' }}
    >
      <img
        src={require("../../Assets/signup.png")} // Replace with your image URL
        alt="cover"
        style={{ maxWidth: '100%', maxHeight: '100%', width:'500px' }}
      />
    </Box>
    </>
  )
}

export default AuthCoverPage