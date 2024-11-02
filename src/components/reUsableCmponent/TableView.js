import React, { useEffect } from "react";

const TableView = ({ tableData, selectedDesignation, selectedRole }) => {
  const filteredEmployees = Array.isArray(tableData.data) ? tableData.data : [];

  // .filter(employee => {
  //     const matchesDesignation =
  //       selectedDesignation === "" ||
  //       selectedDesignation === "All" ||
  //       employee.role === selectedDesignation;

  //     const matchesRole =
  //       selectedRole === "" ||
  //       selectedRole === "All" ||
  //       employee.employId.toLowerCase().includes(selectedRole.toLowerCase()) ||
  //       employee.name.toLowerCase().includes(selectedRole.toLowerCase())
  //     return matchesDesignation && matchesRole;
  //   });
  //

  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th align="left" className="p-2 border-b">
              Logo
            </th>
            <th align="left" className="p-2 border-b">
              Business Name
            </th>
            <th align="left" className="p-2 border-b">
              Email
            </th>
            <th align="left" className="p-2 border-b">
              Primary Phone
            </th>
            <th align="left" className="p-2 border-b">
              Owner Name
            </th>
            <th align="left" className="p-2 border-b">
              Address
            </th>
            <th align="left" className="p-2 border-b">
              Category
            </th>
            <th align="left" className="p-2 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees?.map((business, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-[#dafff9]" : ""}`}
            >
              <td className="p-2 border-b">
                <img
                  src={business.logo}
                  alt={business.businessName}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-2 border-b">{business.businessName}</td>
              <td className="p-2 border-b">{business.email}</td>
              <td className="p-2 border-b">
                {business.contactDetails.primaryNumber}
              </td>
              <td className="p-2 border-b">{business.ownerName}</td>
              <td className="p-2 border-b">
                {`${business.address.buildingName}, ${business.address.streetName}, ${business.address.city}, ${business.address.state}, ${business.address.pinCode}`}
              </td>
              <td className="p-2 border-b">{business.category.name}</td>
              <td className="p-2 border-b">
                <button className="text-blue-500 hover:underline">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
