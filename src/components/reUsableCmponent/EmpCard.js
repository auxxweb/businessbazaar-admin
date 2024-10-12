import React from "react";
import TableView from "./TableView";

function EmpCard({ tableData, selectedDesignation, selectedRole }) {
  return (
    <>
      <TableView
        tableData={tableData}
        selectedRole={selectedRole}
        selectedDesignation={selectedDesignation}
      />
    </>
  );
}

export default EmpCard;
