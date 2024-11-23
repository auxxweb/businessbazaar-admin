import React from "react";
import TableView from "./TableView";

function EmpCard({ tableData,handleDelete,handleStatusUpdate,handleisFreeUpdate }) {
  return (
    <>
      <TableView
        tableData={tableData}
        handleDelete={handleDelete}
        handleStatusUpdate={handleStatusUpdate}
        handleisFreeUpdate={handleisFreeUpdate}
      />
    </>
  );
}

export default EmpCard;
