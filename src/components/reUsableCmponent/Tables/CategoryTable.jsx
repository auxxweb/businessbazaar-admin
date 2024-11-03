import React from "react";

const CategoryTable = ({ tableData, selectedDesignation, selectedRole }) => {
    // const filteredEmployees = Array.isArray(tableData.data)
    //   ? tableData.data.filter(business => {
    //       const matchesCategory =
    //         !selectedDesignation ||
    //         business.category.name.toLowerCase() === selectedDesignation.toLowerCase();

    //       const searchTerm = selectedRole.toLowerCase();
    //       const matchesSearch =
    //         !selectedRole ||
    //         business.businessName.toLowerCase().includes(searchTerm) ||
    //         business.category.name.toLowerCase().includes(searchTerm) ||
    //         business.address.city.toLowerCase().includes(searchTerm);

    //       return matchesCategory && matchesSearch;
    //     })
    //   : [];

  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th align="left" className="p-2 border-b">
              Name
            </th>
            <th align="left" className="p-2 border-b">
              Image
            </th>
            <th align="left" className="p-2 border-b">
              Cover Image
            </th>
            <th align="left" className="p-2 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((category, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-[#dafff9]" : ""
                }`}
              >
                <td className="p-2 border-b">{category?.name}</td>
                <td className="p-2 border-b">
                  <img
                    src={category?.image}
                    alt={category?.image}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2 border-b">
                  <img
                    src={category?.coverImage}
                    alt={category?.coverImage}
                    className="w-10 h-10 rounded-full"
                  />
                </td>

                <td className="p-2 border-b">
                  <button className="text-blue-500 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No matching Category data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
