import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css"
import Popup from "../components/Popup";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "@fontsource/roboto";
import { Box, Link as MuiLink } from '@mui/material';
import AddDeviceForm from "../components/AddDevice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [popupForm, setPopupForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/device");
      setDevices(response.data.data);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
    }
  };

  const handleDeviceAdd = (newDevice) => {
    setDevices([...devices, newDevice]);
    setPopupForm({ trigger: true, device: null });
  };

  return (
    <div className="gateway-list-container">
      <div className="top-content">
      <Box sx={{ typography: 'subtitle2', fontWeight: 'Bold', fontSize: 'h6.fontSize' }}>DEVICE LIST</Box>
        <button className="add-gateway-btn text-btn" onClick={() => setPopupForm(true)}>Add Device</button>
      </div>
      {popupForm && (
        <Popup trigger={popupForm} setTrigger={setPopupForm}>
            <AddDeviceForm
            handleDeviceAdd={handleDeviceAdd}
           
            />
        </Popup>
      )}
     
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor: '#1f4d69'}}>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">vendor</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Created Date</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell> 
            <StyledTableCell align="center">Delete</StyledTableCell> 
            <StyledTableCell align="center"></StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
        {devices.map((device) => (
            <StyledTableRow key={device._id}>
              
              <StyledTableCell align="center">{device.uuid}</StyledTableCell>
              <StyledTableCell align="center">{device.vendor}</StyledTableCell>
              <StyledTableCell align="ceter">{device.status}</StyledTableCell>
              <StyledTableCell align="center">{device.createdDate}</StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon/>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteOutlineIcon />
              </StyledTableCell>
              <StyledTableCell>
                
             
              {/* <a href="" className="view-btn text-btn">View Devices</a> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
         
         </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeviceList;

