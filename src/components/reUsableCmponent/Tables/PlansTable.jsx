import React from 'react'

const PlanTable = ({ tableData, handlePlanEdit }) => {
  const handleDeletePlan = () => {}

  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="min-w-full table-auto mt-6">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Name
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Validity (in year)
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Description
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Amount
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              template
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((plan, index) => (
              <tr
                key={index}
                className="odd:bg-teal-100 even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
              >
                <td className="px-4 py-2 border-r border-gray-400">
                  {plan?.plan}
                </td>

                <td className="px-4 py-2 border-r border-gray-400">
                  {plan?.validity}
                </td>

                <td className="px-4 py-2 border-r border-gray-400">
                  <ul className="list-disc pl-5 space-y-1">
                    {plan?.description?.map((desc, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {plan?.amount}
                </td>

                <td
                  className={`px-2 py-1 text-center ${
                    plan?.isPremium
                      ? 'border border-yellow-500 text-yellow-600 font-bold   '
                      : 'border border-blue-500 text-blue-600 font-semibold '
                  }`}
                  style={{ minWidth: '80px' }} // Adjust to make the cell narrower
                >
                  {plan?.isPremium ? (
                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full">
                      Premium
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">
                      Basic
                    </span>
                  )}
                </td>

                <td className="px-4 py-2 border-r flex text-center border-gray-400">
                  <button
                    // disabled={isLoadingBlock}
                    onClick={() => handlePlanEdit(plan?._id)}
                  >
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeletePlan(plan?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2 fill-red-500"
                    />
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
  )
}

export default PlanTable
