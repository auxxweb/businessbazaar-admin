import React from "react";
import TableView from "./TableView";

function EmpCard({ tableData,handleDelete,handleStatusUpdate }) {
  return (
    <>
      <TableView
        tableData={tableData}
        handleDelete={handleDelete}
        handleStatusUpdate={handleStatusUpdate}
      />
    </>
  );
}

export default EmpCard;
