import React from "react";
import TableViewBusiness from "./TableViewBusiness";

function EmpCard1({ tableData,handleDelete,handleStatusUpdate,handleisFreeUpdate }) {
  return (
    <>
      <TableViewBusiness
        tableData={tableData}
        handleDelete={handleDelete}
        handleStatusUpdate={handleStatusUpdate}
        handleisFreeUpdate={handleisFreeUpdate}
      />
    </>
  );
}

export default EmpCard1;
