import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import "../style.css"

const AddGatewayForm = ({
  gatewayToEdit,
  handleGatewayAdd,
  handleGatewayEdit,
}) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipv4Address, setIpv4Address] = useState("");
  const [gateway, setGateway] = useState(gatewayToEdit);
  useEffect(() => {
    if (gatewayToEdit) {
      setSerialNumber(gatewayToEdit.serialNumber || "");
      setName(gatewayToEdit.name || "");
      setIpv4Address(gatewayToEdit.ipv4Address || "");
      setGateway(gatewayToEdit);
    } else {
      setSerialNumber("");
      setName("");
      setIpv4Address("");
      setGateway(null);
    }
   
  }, [gatewayToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("gatewayToEdit._id:", gatewayToEdit._id);
    const url = `http://localhost:4000/gateway/${gatewayToEdit._id}`;

    const gatewayData = {
      serialNumber: serialNumber,
      name: name,
      ipv4Address: ipv4Address
    };

    if (gateway) {
      try {
        const response = await axios.put(url, gatewayData);
        handleGatewayEdit(response.data.data);
        setGateway(null);
      } catch (error) {
        console.error("Failed to update gateway:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/gateway",
          gatewayData
        );
        handleGatewayAdd(response.data.data);
      } catch (error) {
        console.error("Failed to add gateway:", error);
      }
    }

    setSerialNumber("");
    setName("");
    setIpv4Address("");
  };
 
  return (
  
      <form className="gateway-form" onSubmit={handleSubmit}>
        <Box sx={{ typography: 'subtitle2', fontWeight: 'Bold', fontSize: 'h6.fontSize' }}> {gateway ? "Edit Gateway" : "Add Gateway"}</Box>
        <br></br>
        <TextField id="outlined-basic serialNumber" 
          label="Serial Number" variant="outlined" 
          value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)}/>
        <br></br>
        <TextField id="outlined-basic name" 
          label="Name" variant="outlined" 
          value={name} onChange={(event) => setName(event.target.value)}/>
        <br></br>
        <TextField id="outlined-basic ipv4Address" 
          label="Ipv4 Address" variant="outlined" 
          value={ipv4Address} onChange={(event) => setIpv4Address(event.target.value)}/>
        <br></br>
        <button type="submit" className="add-btn text-btn">{gateway ? "Update" : "Add"}</button>
       
      </form>);
  
};

export default AddGatewayForm;
