import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import "../reUsableCmponent/Tables/paymentTable.css";
import useBanner from "../../Hooks/banner/useBanner";
import Modal from "../reUsableCmponent/modal/Modal";
import { toast } from "react-toastify";
import { preRequestFun } from "../../api/s3Request";
import BannerTable from "../reUsableCmponent/Tables/bannerTable";
import Loader from "../Loader/Loader";

const BannerPage = () => {
  const [page, setPage] = useState(1);
  const [bannerLoading, setBannerLoading] = useState(false);
  const limit = 10;
  const {
    totalBanners,
    loading,
    banners,
    getBannersData,
    createBanner,
    updateBanner,
    deleteBanner
  } = useBanner({ page, limit });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState({});

  useEffect(() => {
    setBannerLoading(loading);
  }, [loading]);

  const toggleModal = () => {
    setImageFile(null);
    setIsModalVisible(!isModalVisible);
  };
  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getBannersData();
  }, [page]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.warning("Please upload an image.", {
        position: "top-right",
        autoClose: 2000
      });
      return;
    }
    setBannerLoading(true);
    const preReq = await preRequestFun(imageFile, "banner");
    if (preReq?.accessLink) {
      setBannerLoading(false);
      await createBanner({ image: preReq.accessLink });
      toggleModal();
      setImageUrl(null);
    } else {
      setBannerLoading(false);
      toast.error("Failed to upload image.", {
        position: "top-right",
        autoClose: 2000
      });
    }
  };

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        autoClose: 2000
      });
    }
  };
  const handleEditPreviewImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        autoClose: 2000
      });
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    toggleEditModal();
  };
  const handleEditFn = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return;
    }
    setBannerLoading(true);
    const preReq = await preRequestFun(imageFile, "banner");
    if (preReq?.accessLink) {
      setBannerLoading(false);
      await updateBanner(selectedBanner?._id, { image: preReq.accessLink });
      toggleEditModal();
      setImageUrl(null);
    } else {
      setBannerLoading(false);
      toast.error("Failed to upload image.", {
        position: "top-right",
        autoClose: 2000
      });
    }
  };

  const deleteFunction = async (id) => {
    await deleteBanner(id);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span
            className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
            onClick={toggleModal}>
            + Add New Banner
          </span>

          <Modal
            isVisible={isModalVisible}
            onClose={toggleModal}
            modalHeader={"Add Category"}>
            <form onSubmit={handleCreate} className="space-y-4">
              {bannerLoading && <Loader />}
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handlePreviewImage}
                  />
                  {imageUrl && (
                    <img
                      className="mt-2 w-100 h-auto"
                      src={imageUrl}
                      alt="previewImage"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <Modal
            isVisible={isEditModalVisible}
            onClose={toggleEditModal}
            modalHeader={"Edit banner"}>
            <form onSubmit={handleEditFn} className="space-y-4">
              {bannerLoading && <Loader />}
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleEditPreviewImage}
                  />
                  {(imageUrl || selectedBanner?.image) && (
                    <img
                      className="mt-2 w-100 h-auto"
                      src={imageUrl ?? selectedBanner?.image}
                      alt="previewImage"
                    />
                  )}
                </div>
              </div>
              {bannerLoading ? (
                <Loader />
              ) : (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
                    update
                  </button>
                </div>
              )}
            </form>
          </Modal>
        </div>
      </div>

      <div className="p-2">
        <BannerTable
          bannerData={banners}
          loading={bannerLoading}
          editFunction={handleEdit}
          deleteFunction={deleteFunction}
        />
      </div>
      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={totalBanners}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BannerPage;
