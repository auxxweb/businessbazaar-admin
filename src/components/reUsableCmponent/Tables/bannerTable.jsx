import React, { useState } from "react";
import moment from "moment";
import Loader from "../../Loader/Loader";
import Modal from "../modal/Modal";

const BannerTable = ({ bannerData, loading, editFunction, deleteFunction }) => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedBanner(id);
    setShowDeletePopup(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteFun = () => {
    deleteFunction(selectedBanner);
    handleDeleteModalClose();
  };

  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      {/* Conditionally show loading spinner */}
      {loading ? (
        <Loader /> // Show premium loader when loading
      ) : (
        <table className="min-w-full table-auto mt-6">
          <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
            <tr>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Created Date
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                image
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bannerData?.length > 0 ? (
              bannerData?.map((banner, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#d4e0ec] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                >
                  <td className="px-4 py-2 border-r border-gray-400">
                    {moment(banner?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    <img
                      src={banner?.image}
                      alt={banner?.image}
                      className="w-40 h-20 "
                    />
                  </td>
                  <td className="px-4 py-2 border-r flex text-center border-gray-400">
                    <button
                      // disabled={isLoadingBlock}
                      onClick={() => editFunction(banner)}
                    >
                      <img
                        alt="pics"
                        src="/icons/edit.svg"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    </button>
                    <button onClick={() => handleDeleteClick(banner?._id)}>
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
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No matching banner data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Are you sure you want to delete?
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
  );
};

export default BannerTable;
