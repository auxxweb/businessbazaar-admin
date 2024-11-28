import React, { useState } from 'react'
import Modal from '../modal/Modal'

const TrashPlanTable = ({ tableData, handlePlanEdit, handlePlanDelete }) => {
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)

    const handleDeletePlan = (id) => {
        setSelectedPlan(id)
        setShowDeletePopup(true)
    }

    const handleDeleteModalClose = () => {
        setShowDeletePopup(false)
    }

    const handleDeleteFun = () => {
        handlePlanDelete(selectedPlan, setShowDeletePopup)
    }

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
                                className="odd:bg-[#d4e0ec] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
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
                                    className={`px-2 py-1 text-center ${plan?.isPremium
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
                                        onClick={() => handleDeletePlan(plan?._id)}
                                        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 17l3-3m0 0l3 3m-3-3V4m0 13v2m0-2H5m14-2h-4m4 2h-4m4-2V4m0 2v8"
                                            />
                                        </svg>
                                        Move to Plans
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
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
                <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
                    <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
                        Are you sure you want to move plans ...?
                    </h3>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleDeleteModalClose}
                            type="button"
                            className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out"
                        >
                            No
                        </button>
                        <button
                            onClick={handleDeleteFun}
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default TrashPlanTable
