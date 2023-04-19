import React, { useState } from "react";
import axios from "axios";

function AddGateway(props) {
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make API request to add new gateway
      const response = await axios.post("http://localhost:4000/gateway", {
        serialNumber,
        name,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }); // Replace "http://localhost:4000/gateway" with your actual backend API endpoint for adding a gateway
      
      // Trigger callback to close the form and update gateway list
      props.setTrigger(false);
      props.onGatewayAdded(response.data.data);
    } catch (error) {
      console.error("Failed to add gateway:", error);
    }
  };

  return props.trigger ? (
    <div className="gateway-form">
      <form>
        <div>
        <label htmlFor="serialNumber">Serial Number</label>
        <input
          id="serialNumber"
          name="serialNumber"
          type="text"
          value={serialNumber}
          onChange={handleSerialNumberChange}
        />
        <label htmlFor="name">Gateway Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <div>
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            close
          </button>
        </div>
      </div>
      </form>
    </div>
  ) : (
    ""
  );
}

export default AddGateway;
