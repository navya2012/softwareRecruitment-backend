import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobAppliedPostsList } from '../../../api\'s/employerApi\'s'
import TableContainer from '@mui/material/TableContainer';
import { Box, Paper, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, } from "@mui/material";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
 fontSize:'16px',
 textAlign:'center',
  fontWeight:'500',

}));

const Headings = [
  { id: 'name', label: 'Employee Name', minWidth: 50},
  { id: 'email', label: 'Email', minWidth: 50 },
  { id: 'companyName', label: 'Company Name', minWidth: 50 },
  { id: 'role', label: 'Role', minWidth: 50},
  { id: 'jobAppliedDate', label: 'Date of Apply', minWidth: 50 }
];


const JobAppliedApplications = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { jobAppliedUsers } = useSelector((state) => state.employerReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Dispatching API call...');
    dispatch(getJobAppliedPostsList())
  }, [dispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };
  return (
    <>
      <Box >
        <Paper elevation={3} sx={{ width: '100%', padding: '60px 40px' }}>
          <Typography variant="h4" sx={{ padding: '20px 40px' }}>Job Posts</Typography>
          <TableContainer  >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Headings.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ 
                        minWidth: column.minWidth,
                        textAlign:'center',
                        fontWeight:'bold',
                        fontSize:'18px',
                        // fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jobAppliedUsers.length > 0 ? (
                  jobAppliedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, id) => (
                    <TableRow key={id} >
                      <StyledTableCell >
                        {data.jobAppliedStatus.employeeDetails.firstName === "" ? ("-") : data.jobAppliedStatus.employeeDetails.firstName}{"  "}
                        {data.jobAppliedStatus.employeeDetails.lastName === "" ? ("-") : data.jobAppliedStatus.employeeDetails.lastName}
                      </StyledTableCell>
                      <StyledTableCell >
                        {data.jobAppliedStatus.employeeDetails.email === "" ? ("-") : data.jobAppliedStatus.employeeDetails.email} 
                      </StyledTableCell>
                      <StyledTableCell >{data.companyName === "" ? ("-") : data.companyName}</StyledTableCell>
                      <StyledTableCell >{data.role === "" ? ("-") : data.role}</StyledTableCell>
                      <StyledTableCell >
                        {data.jobAppliedStatus.employeeDetails.jobAppliedDate === "" ? ("-") : formatDate(data.jobAppliedStatus.employeeDetails.jobAppliedDate)}
                        </StyledTableCell>
                    </TableRow>
                  ))
                ) : ("")}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[ 5, 10, 15, 20]}
            component="div"
            count={jobAppliedUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          >
          </TablePagination>
        </Paper>
      </Box>

    </>
  )
}

export default JobAppliedApplications