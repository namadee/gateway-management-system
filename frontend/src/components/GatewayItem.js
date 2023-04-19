import React from 'react';

const GatewayItem = ({ gateway, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete();
  };

  const handleEdit = () => {
    onEdit();
  };

  return (
    <li>
      <div>
        <h2>{gateway.name}</h2>
        <p>Serial: {gateway.serial}</p>
        <p>IPv4: {gateway.ipv4}</p>
        <p>Actions:</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default GatewayItem;
