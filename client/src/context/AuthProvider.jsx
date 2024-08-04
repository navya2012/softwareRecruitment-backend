
import React, { createContext, useContext, useState } from 'react'
import { clearError } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const AuthContext = createContext();

export const useAuthContextData = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  const [employeeFormData, setEmployeeFormData] = useState({
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
  })

  const [employerFormData, setEmployerFormData] = useState({
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
  })

  const employeeHandleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    dispatch(clearError());
  };

  const employerHandleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the field name is a nested field (e.g., address)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEmployerFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setEmployerFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    dispatch(clearError());
  };

  //update form
  const [updateEmployeeFormData, setUpdateEmployeeFormData] = useState({
    email: '',
    password: '',
    mobileNumber: '',
    firstName: '',
    lastName: '',
    position: '',
    currentCompany: '',
    location: '',
  })

  const handleChangeUpdateEmployeeFormData = (e) => {
    const { name, value } = e.target

    setUpdateEmployeeFormData({
      ...updateEmployeeFormData,
      [name]: value
    })
  }

  const [updateEmployerFormData, setUpdateEmployerFormData] = useState({
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
    headQuarters: ''
  })

  const handleChangeUpdateEmployerFormData = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the field name is a nested field (e.g., address)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUpdateEmployerFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setUpdateEmployerFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    dispatch(clearError());
  };

  return (
    <>
      <AuthContext.Provider value={{
        employeeFormData, setEmployeeFormData, employeeHandleChange, employerHandleChange, employerFormData, setEmployerFormData, updateEmployeeFormData, setUpdateEmployeeFormData,
        handleChangeUpdateEmployeeFormData, updateEmployerFormData, setUpdateEmployerFormData, handleChangeUpdateEmployerFormData
      }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider