import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Pagination from "../Pagination";
import "../reUsableCmponent/Tables/paymentTable.css";
import useBanner from "../../Hooks/banner/useBanner";
import Modal from "../reUsableCmponent/modal/Modal";
import { toast } from "react-toastify";
import { preRequestFun } from "../../api/s3Request";
import BannerTable from "../reUsableCmponent/Tables/bannerTable";
import Loader from "../Loader/Loader";
import getCroppedImg from "../../utils/cropper.utils";

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
    deleteBanner,
  } = useBanner({ page, limit });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropImage,setCropImage]= useState(null)
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    setBannerLoading(loading);
  }, [loading]);

  const toggleModal = () => {
    setImageFile(null);
    setCropImage(null)
    setIsModalVisible(!isModalVisible);
  };
  const toggleEditModal = () => {
    setImageFile(null);
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
        autoClose: 2000,
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
      setCropImage(null)
    } else {
      setBannerLoading(false);
      toast.error("Failed to upload image.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setIsCropping(true);
    } else {
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  
  const handleEditPreviewImage = (e) => {

    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setIsCropping(true);
    } else {
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    toggleEditModal();
  };
  const handleEditFn = async (e) => {
    e.preventDefault();
    setBannerLoading(true);
    // If no new file is selected, use the existing image from `selectedBanner`
    let fileToUpload = selectedBanner.image;
    if(imageFile){
    const preReq = await preRequestFun(imageFile, "banner");
    fileToUpload= preReq.accessLink
    }
      setBannerLoading(false);
      
      await updateBanner(selectedBanner?._id, { image: fileToUpload });
      toggleEditModal(); // Close modal
      setImageUrl(null); // Reset state
      setImageFile(null);
  }
    

  

  const deleteFunction = async (id) => {
    await deleteBanner(id);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Banners</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span
            className="bg-[#105193] hover:bg-[#107D93] text-white rounded-full p-3 cursor-pointer"
            onClick={toggleModal}
          >
            + Add New Banner
          </span>

          <Modal
            isVisible={isModalVisible}
            onClose={toggleModal}
            modalHeader={"Add Banner"}
          >
            <form onSubmit={handleCreate} className="space-y-4">
              {bannerLoading && <Loader />}
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image <span style={{ color: "grey" }}>(Ratio 16 : 9)</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handlePreviewImage}
                  />
                  {cropImage && (
                    <img
                      className="mt-2 w-100 h-auto"
                      src={cropImage}
                      alt="previewImage"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <Modal
            isVisible={isEditModalVisible}
            onClose={toggleEditModal}
            modalHeader={"Edit banner"}
          >
            <form onSubmit={handleEditFn} className="space-y-4">
              {bannerLoading && <Loader />}
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image <span style={{ color: "grey" }}>(Ratio 16 : 9)</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    
                    className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleEditPreviewImage}
                  />
                  {(cropImage || selectedBanner?.image) && (
                    <img
                      className="mt-2 w-100 h-auto"
                      src={cropImage ?? selectedBanner?.image}
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
                    className="bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl"
                  >
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

      <Modal
        isVisible={isCropping}
        onClose={() => setIsCropping(false)}
        modalHeader={"Crop Image"}
      >
        <div
          className="crop-container position-relative"
          style={{
            height: "400px",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9} // Adjust aspect ratio as needed
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(croppedArea, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[150px] text-center rounded-3xl"
            onClick={async () => {
              const { blob, fileUrl } = await getCroppedImg(
                imageUrl,
                croppedAreaPixels
              );
              setImageUrl(fileUrl);
              setCropImage(fileUrl)
              setImageFile(blob);
              setIsCropping(false);
            }}
          >
            Crop & Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BannerPage;
