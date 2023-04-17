import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css"
import AddGatewayForm from "./AddGatewayForm";
import Popup from "./Popup";
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
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



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

const GatewayList = () => {
  const [gateways, setGateways] = useState([]);
  const [popupForm, setPopupForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/gateway");
      setGateways(response.data.data);
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
    }
  };

  const handleDelete = async (gatewayId) => {
    try {
      await axios.delete(`http://localhost:4000/gateway/${gatewayId}`);
      setGateways(gateways.filter((gateway) => gateway._id !== gatewayId));
    } catch (error) {
      console.error("Failed to delete gateway:", error);
    }
  };

  const handleGatewayAdd = (newGateway) => {
    setGateways([...gateways, newGateway]);
    setPopupForm({ trigger: true, gateway: null });
  };


  const handleEdit = async (gatewayId) => {
    const gatewayToEdit = gateways.find((gateway) => gateway._id === gatewayId);
    setPopupForm({ trigger: true, gateway: gatewayToEdit });
   
  };
  
  

  return (
    <div className="gateway-list-container">
      <div className="top-content">
      <Box sx={{ typography: 'subtitle2', fontWeight: 'Bold', fontSize: 'h6.fontSize' }}>GATEWAY LIST</Box>
        <button className="add-gateway-btn text-btn" onClick={() => setPopupForm(true)}>Add Gateway</button>
      </div>
     
      {popupForm && (
  <Popup trigger={popupForm} setTrigger={setPopupForm}>
    <AddGatewayForm
      handleGatewayAdd={handleGatewayAdd}
      handleEdit={handleEdit}
      gatewayToEdit={popupForm.gateway}
    />
  </Popup>
)}

      
     
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor: '#1f4d69'}}>
            <StyledTableCell align="center">Serial Number</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">ipv4 Address</StyledTableCell>
            <StyledTableCell align="center">Devices</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell> 
            <StyledTableCell align="center">Delete</StyledTableCell> 
            <StyledTableCell align="center"></StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
        {gateways.map((gateway) => (
            <StyledTableRow key={gateway._id}>
              
              <StyledTableCell align="center">{gateway.serialNumber}</StyledTableCell>
              <StyledTableCell align="center">{gateway.name}</StyledTableCell>
              <StyledTableCell align="center">{gateway.ipv4Address}</StyledTableCell>
              <StyledTableCell align="center">{gateway.devices.length}</StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon onClick = {() => handleEdit(gateway._id)} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteOutlineIcon onClick={() => handleDelete(gateway._id)} />
              </StyledTableCell>
              <StyledTableCell>
              <Link className="view-btn text-btn" to="/DeviceList" style={{ textDecoration: 'none' }}>View Devices</Link>

              </StyledTableCell>
            </StyledTableRow>
          ))}
         
         </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GatewayList;
