import React, { useState } from "react";

const EditGatewayForm = ({ gateway, onUpdate, onCancel }) => {
  const [editedGateway, setEditedGateway] = useState(gateway);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedGateway({ ...editedGateway, [name]: value });
  };

  const handleUpdateClick = () => {
    onUpdate(editedGateway);
  };

  return (
    <div>
      <h2>Edit Gateway</h2>
      <form>
        <label>
          Serial Number:
          <input
            type="text"
            name="serialNumber"
            value={editedGateway.serialNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedGateway.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          IPv4 Address:
          <input
            type="text"
            name="ipv4Address"
            value={editedGateway.ipv4Address}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGatewayForm;
