import React, { useState } from 'react'
import Modal from '../modal/Modal'
import Loader from '../../Loader/Loader'
import Placeholder from '../../../../src/images/more.png'
import PlaceholderCover from '../../../../src/images/Placeholder.jpg'


function TrashCategoryTable({ tableData,
    handleDeleteCategory,
    handleEditCategory,
    loading }) {
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)

    const handleDeleteModalClose = async (id) => {
        setSelectedCategoryId(null)
        setShowDeletePopup(false)
    }

    const handleDeleteFun = () => {
        handleDeleteCategory(selectedCategoryId)
        setShowDeletePopup(false)
    }

    const handleDeleteClick = async (id) => {
        setSelectedCategoryId(id)
        setShowDeletePopup(true)
    }
    return (
        <div className="overflow-x-auto w-full max-w-full p-4">
            {loading ? (
                <Loader />
            ) : (
                <table className="min-w-full table-auto mt-6">
                    <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
                        <tr>
                            <th className="px-4 py-4 text-left border-r border-gray-400">
                                Name
                            </th>
                            <th className="px-4 py-4 text-left border-r border-gray-400">
                                Image
                            </th>
                            <th className="px-4 py-4 text-left border-r border-gray-400">
                                Cover Image
                            </th>
                            <th className="px-4 py-4 text-left border-r border-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((category, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-[#d4e0ec] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                                >
                                    <td className="px-4 py-2 border-r border-gray-400">
                                        {category?.name}
                                    </td>
                                    <td className="px-4 py-2 border-r border-gray-400">
                                        <img
                                            src={category?.image && category?.image !== '' ? category?.image : Placeholder}
                                            alt={category?.image}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border-r border-gray-400">
                                        <img
                                            src={category?.coverImage && category?.coverImage !== '' ? category?.coverImage : PlaceholderCover}
                                            alt={category?.coverImage}
                                            className="w-20 h-10 rounded-full"
                                        />
                                    </td>

                                    <td className="px-4 py-2 border-r flex text-center border-gray-400">

                                        <button
                                            onClick={() => handleDeleteClick(category?._id)}
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
                                            Move to Categories
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
            )}
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
                <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
                    <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
                        Are you sure you want to move categories ?
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

export default TrashCategoryTable
