import React, { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import Modal from "./modal/Modal";
import { formatDate } from "../../utils/app.utils";
import Placeholder from "../../../src/images/businesses-icon.png";

const TableView = ({ tableData, handleDelete, handleStatusUpdate, handleisFreeUpdate }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [enable, setEnable] = useState(true);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [showStatusPopup1, setShowStatusPopup1] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedBusinessId(id);
    setShowDeletePopup(true);
  };

  const handleDeleteFun = () => {
    handleDelete(selectedBusinessId);
    setShowDeletePopup(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
    setSelectedBusinessId(null);
  };

  const handleStatusUpdateClick = (id) => {
    setSelectedBusinessId(id);
    setShowStatusPopup(true);
  };

  const handleisFreeUpdateClick = (business) => {
    setSelectedBusinessId(business._id); // Use the business ID
    setEnable(business.isFree); // Update `enable` based on `isFree`
    setShowStatusPopup1(true);
  };

  const handleStatusModalClose = () => {
    setShowStatusPopup(false);
    setSelectedBusinessId(null);
  };
  const handleStatusModalClose1 = () => {
    setShowStatusPopup1(false);
    setSelectedBusinessId(null);
  };

  const handleStatusFn = () => {
    handleStatusUpdate(selectedBusinessId);
    setShowStatusPopup(false);
  };

  const handleisFreeFn = () => {
    handleisFreeUpdate(selectedBusinessId);
    setShowStatusPopup1(false);
    setEnable(true)
  }
  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="min-w-full table-auto mt-6">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Business
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Business ID
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Business Email
            </th>

            <th className="px-4 py-4 text-left border-r border-gray-400">
              Address
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Plan
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Joined Date
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Category
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              isFree
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Status
            </th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {tableData?.data?.length > 0 ? (
            tableData?.data?.map((business, index) => (
              <tr
                key={index}
                className="odd:bg-[#d4e0ec] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]">
                <td className="px-4 py-2  border-r border-gray-400">
                  <span className="flex  business-details">
                    <img
                      src={business?.logo && business?.logo !== "" ? business?.logo : Placeholder}
                      alt={business?.businessName}
                      className="w-10 h-10 rounded-full mr-2 mt-2"
                    />
                    <span className="items-center flex">
                      {business?.businessName}{" "}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {business?.businessId}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {business?.email}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {`${business?.address?.buildingName}, ${business?.address?.streetName}, ${business.address.city}, ${business.address.state}, ${business.address.pinCode}`}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {business?.selectedPlan?.plan}
                </td>
                <td className="px-2 py-2 border-r border-gray-400  items-center">
                  {formatDate(business?.createdAt)}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {business?.category?.name}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    onClick={() => handleisFreeUpdateClick(business)}
                    className={`py-2 px-5 flex space-x-2 items-center ${business?.isFree
                      ? "border-[#1DB290] text-[#1DB290]"
                        : "text-[#FF0404] border-[#FF0404]"
                      } rounded-full border`}>
                    <span>{business?.isFree ? "Enable" : "Disable"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>


                </td>
                <td className="px-4 py-4 border-r border-gray-400">
                  <button
                    onClick={() => handleStatusUpdateClick(business?._id)}
                    className={`py-2 px-5 flex space-x-2 items-center ${!business?.status
                      ? " text-[#FF0404] border-[#FF0404]"
                      : "  border-[#1DB290] text-[#1DB290]"
                      } rounded-full  border `}>
                    {" "}
                    <span>{business?.status ? "Active" : "Blocked"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button onClick={() => handleDeleteClick(business?._id)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2 fill-red-500"
                    />
                    
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No matching businesses found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Are you sure you want to move to business?
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDeleteModalClose}
              type="button"
              className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              No
            </button>
            <button
              onClick={handleDeleteFun}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Modal isVisible={showStatusPopup} onClose={handleStatusModalClose}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Are you sure you want to Block/UnBlock?
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleStatusModalClose}
              type="button"
              className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              No
            </button>
            <button
              onClick={handleStatusFn}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Modal isVisible={showStatusPopup1} onClose={handleStatusModalClose1}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            {enable
              ? "Are you sure you want to Disable...?"
              : "Are you sure you want to Enable...?"}
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleStatusModalClose1}
              type="button"
              className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              No
            </button>
            <button
              onClick={handleisFreeFn}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out">
              Yes
            </button>
          </div>
        </div>
      </Modal>





      <style>{`.business-details {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer and Edge */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
}

.business-details::-webkit-scrollbar {
  display: none; /* Hide scrollbar in WebKit browsers (Chrome, Safari, etc.) */
}`}</style>
    </div>
  );
};

export default TableView;
