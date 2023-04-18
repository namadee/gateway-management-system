import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import "../style.css";

const AddGatewayForm = ({
  handleGatewayEdit,
  handleGatewayAdd,
  gatewayData,
}) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [ipv4Address, setIpv4Address] = useState("");
  const [serialNumberError, setSerialNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [ipv4AddressError, setIpv4AddressError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Update fields with data
  useEffect(() => {
    if (gatewayData) {
      setSerialNumber(gatewayData.serialNumber || "");
      setName(gatewayData.name || "");
      setIpv4Address(gatewayData.ipv4Address || "");
    } else {
      setSerialNumber("");
      setName("");
      setIpv4Address("");
    }
  }, [gatewayData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error and success messages
    setSerialNumberError("");
    setNameError("");
    setIpv4AddressError("");
    setSuccessMessage("");

    // Validation
    let isValid = true;
    if (!serialNumber) {
      setSerialNumberError("Serial Number is required");
      isValid = false;
    }
    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!ipv4Address) {
      setIpv4AddressError("IPv4 Address is required");
      isValid = false;
    } else if (!isValidIpv4Address(ipv4Address)) {
      setIpv4AddressError("IPv4 Address is not valid");
      isValid = false;
    }

    if (isValid) {
      const gateway = {
        serialNumber: serialNumber,
        name: name,
        ipv4Address: ipv4Address,
      };

      if (gatewayData) {
        const url = `http://localhost:4000/gateway/${gatewayData._id}`;
        try {
          const response = await axios.put(url, gateway);
          handleGatewayEdit(gatewayData._id, response.data.data);
          setSuccessMessage("Gateway updated successfully");
        } catch (error) {
          console.error("Failed to update gateway:", error);
        }
      } else {
        const url = "http://localhost:4000/gateway";
        try {
          const response = await axios.post(url, gateway);
          handleGatewayAdd(response.data.data);
          setSuccessMessage("Gateway added successfully");
        } catch (error) {
          console.error("Failed to add gateway:", error);
        }
      }

      setSerialNumber("");
      setName("");
      setIpv4Address("");
    }
  };

  const isValidIpv4Address = (value) => {
    // IPv4 validation logic
    // You can implement your own validation logic here
    return true;
  };

  return (
    <form className="gateway-form" onSubmit={handleSubmit}>
      <Box
        sx={{ typography: "subtitle2", fontWeight: "Bold", fontSize: "h6.fontSize" }}
      >
        {gatewayData ? "Edit Gateway" : "Add Gateway"}
      </Box>
      <br></br>
      <TextField
        id="outlined-basic serialNumber"
        label="Serial Number"
        variant="outlined"
                value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        error={Boolean(serialNumberError)}
        helperText={serialNumberError}
      />
      <br></br>
      <TextField
        id="outlined-basic name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={Boolean(nameError)}
        helperText={nameError}
      />
      <br></br>
      <TextField
        id="outlined-basic ipv4Address"
        label="IPv4 Address"
        variant="outlined"
        value={ipv4Address}
        onChange={(e) => setIpv4Address(e.target.value)}
        error={Boolean(ipv4AddressError)}
        helperText={ipv4AddressError}
      />
      <br></br>
      <button className="text-btn add-btn" type="submit">{gatewayData ? "Update" : "Add"}</button>
      {/* <Button className="text-btn" type="submit" variant="contained" color="primary">
        {gatewayData ? "Update" : "Add"}
      </Button> */}
      <br></br>
      {successMessage && (
        <Typography variant="body1" color="green">
          {successMessage}
        </Typography>
      )}
    </form>
  );
};

export default AddGatewayForm;

