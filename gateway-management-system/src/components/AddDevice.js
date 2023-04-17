import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import "../style.css"

const AddDeviceForm = ({
  handleDeviceAdd,
}) => {
  
  return (
  
      <form className="gateway-form" >
        <Box sx={{ typography: 'subtitle2', fontWeight: 'Bold', fontSize: 'h6.fontSize' }}> "Add Device"</Box>
        <br></br>
        <TextField id="outlined-basic serialNumber" 
          label="Serial Number" variant="outlined" 
          />
        <br></br>
        <TextField id="outlined-basic name" 
          label="Name" variant="outlined" 
          />
        <br></br>
        <TextField id="outlined-basic ipv4Address" 
          label="Ipv4 Address" variant="outlined" 
         />
        <br></br>
        <button type="submit" className="add-btn text-btn">Save</button>
       
      </form>);
  
};

export default AddDeviceForm;
