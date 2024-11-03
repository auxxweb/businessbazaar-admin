import React from "react";

const PlanTable = ({ tableData, search }) => {
//   const filteredPlans = Array.isArray(tableData)
//     ? tableData.filter((plan) => {
//         const searchTerm = search.toLowerCase();
//         const matchesSearch = plan?.plan.toLowerCase().includes(searchTerm);

//         return matchesSearch;
//       })
//     : [];

  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th align="left" className="p-2 border-b">
              Name
            </th>
            <th align="left" className="p-2 border-b">
              Validity
            </th>
            <th align="left" className="p-2 border-b">
              Description
            </th>
            <th align="left" className="p-2 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((plan, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-[#dafff9]" : ""
                }`}
              >
                <td className="p-2 border-b">{plan?.plan}</td>

                <td className="p-2 border-b">{plan?.validity}</td>

                <td className="p-2 border-b">
                  {plan?.description?.toString()}
                </td>

                <td className="p-2 border-b">
                  <button className="text-blue-500 hover:underline">
                    Edit Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No matching plan data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
