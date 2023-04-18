import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import "../style.css"

const AddDeviceForm = ({
  handleDeviceEdit,
  handleDeviceAdd,
  deviceData
}) => {
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  // Update fields with data
  useEffect(() => {
    if (deviceData) {
      setVendor(deviceData.vendor || "");
      setStatus(deviceData.status || "");
      setCreatedDate(deviceData.createdDate || "");
    } else {
      setVendor("");
      setStatus("");
      setCreatedDate("");
    }
  }, [deviceData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const device = {
      vendor: vendor,
      status: status,
      createdDate: createdDate,
    };

    if (deviceData) {
      const url = `http://localhost:4000/device/${deviceData._id}`;
      try {
        const response = await axios.put(url, device);
        handleDeviceEdit(deviceData._id, response.data.data);
      } catch (error) {
        console.error("Failed to update device:", error);
      }
    } else {
      const url = "http://localhost:4000/device";
      try {
        const response = await axios.post(url, device);
        handleDeviceAdd(response.data.data);
      } catch (error) {
        console.error("Failed to add device:", error);
      }
    }

    setVendor("");
    setStatus("");
    setCreatedDate("");
  };
  
  return (
  
      <form className="gateway-form" onSubmit={handleSubmit} >
        <Box sx={{ typography: 'subtitle2', fontWeight: 'Bold', fontSize: 'h6.fontSize' }}>
          {deviceData ? "Edit Device" : "Add Device"} 
        </Box>
        <br></br>
        <TextField id="outlined-basic vendor" 
          label="Vendor" 
          variant="outlined"
          value={vendor}
          onChange={(event) => setVendor(event.target.value)}
          />
        <br></br>
        <TextField 
          id="outlined-basic name" 
          label="Status" 
          variant="outlined"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          />
        <br></br>
        <TextField 
          id="outlined-basic ipv4Address" 
          label="Created Date"
          variant="outlined"
          value={createdDate}
          onChange={(event) => setCreatedDate(event.target.value)}
         />
        <br></br>
        <button type="submit" className="add-btn text-btn">
          {deviceData ? "Update" : "Add"}
        </button>
       
      </form>);
  
};

export default AddDeviceForm;
