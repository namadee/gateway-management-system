import React from "react";

const GatewayTable = ({ gateways, onEditClick, onDeleteClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Name</th>
          <th>IPv4 Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {gateways.map((gateway) => (
          <tr key={gateway.id}>
            <td>{gateway.serialNumber}</td>
            <td>{gateway.name}</td>
            <td>{gateway.ipv4Address}</td>
            <td>
              <button onClick={() => onEditClick(gateway)}>Edit</button>
              <button onClick={() => onDeleteClick(gateway)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GatewayTable;
