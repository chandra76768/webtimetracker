import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton } from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Dashboard.css'; // Import custom CSS file for styling

function Dashboard({ onBackClick }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [webActivities, setWebActivities] = useState([]);
  const [columns, setColumns] = useState([]);
  const [hideUser, setHideUser] = useState(true); // State to control user visibility

  useEffect(() => {
    // Fetch web activities data from the backend
    axios.get('http://localhost:9000/data')
      .then(response => {
        // Filter the data based on the user name stored in localStorage
        const userName = localStorage.getItem('userName');
        const filteredData = response.data.filter(activity => activity.user === userName);
        setWebActivities(filteredData);

        // Derive columns from the first row of data
        if (filteredData.length > 0) {
          const firstRow = filteredData[0];
          const dynamicColumns = Object.keys(firstRow).filter(key => key !== '_id' && key !== '__v' && key!=='mobile' && key!=='password').map(key => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
            minWidth: 170,
          }));
          setColumns(dynamicColumns);
        }
      })
      .catch(error => {
        console.error('Error fetching web activities data:', error);
      });
  }, []);

  // Function to format seconds into minutes or hours
  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    } else if (seconds >= 60) {
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleHideUser = () => {
    setHideUser(!hideUser);
  };

  return (
    <div className="dashboard-container">
      <IconButton onClick={onBackClick} className="back-button">
        <ArrowBackIcon />
      </IconButton>
      <h1 className="dashboard-title">Dashboard</h1>
      <Paper className="dashboard-paper">
        <TableContainer className="dashboard-table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                    className={index === 0 ? "dashboard-table-header highlight-heading" : "dashboard-table-header"}
                  >
                    <strong>{column.label}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {webActivities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex} className={rowIndex % 2 === 0 ? "dashboard-table-row even-row" : "dashboard-table-row odd-row"}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === 'date' ? row[column.id].slice(0, 10) : 
                          column.id === 'usage' ? formatTime(row[column.id]) : column.id === 'user' && hideUser ? (
                            <IconButton onClick={handleHideUser} className="hide-button">
                              <VisibilityOffIcon />
                            </IconButton>
                          ) : (
                            row[column.id]
                          )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={webActivities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="dashboard-pagination"
        />
      </Paper>
    </div>
  );
}

export default Dashboard;
