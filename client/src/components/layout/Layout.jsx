import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Box className="main-content">
        <Outlet />
      </Box>
    </>
  )
}

export default Layout