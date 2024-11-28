import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import useCategories from "../../Hooks/Category/useCategories";
import CategoryTable from "../reUsableCmponent/Tables/CategoryTable";
import { toast } from "react-toastify";
import { preRequestFun } from "../../api/s3Request";
import { patchApi, postApi } from "../../api/api";
import "./category.css";
import Loader from "../Loader/Loader";
import getCroppedImg from "../../utils/cropper.utils";

const Clients = () => {
  const {
    categories,
    page,
    setPage,
    loading,
    limit,
    totalCategories,
    setSearch,
    getAllCategories,
  } = useCategories();

  // const [filteredCategoies, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
    coverImage: "",
  });
  const [handleClick, setHandleSelect] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
    setSearch(searchText);
  }, [handleClick]);

  useEffect(() => {
    setCatLoading(loading);
  }, [loading]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setHandleSelect(!handleClick);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEditCategory = async (id) => {
    setEdit(true);
    const selectedCategory = await categories?.find(
      (category) => category?._id === id
    );
    console.log(selectedCategory, "selectedCategory");
    setIsEditModalVisible(true);

    setUpdateData({
      ...updateData,
      name: selectedCategory?.name,
      coverImage: selectedCategory?.coverImage,
      image: selectedCategory?.image,
      categoryId: id,
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isCoverCropping, setIsCoverCropping] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setName("");
    setImageFile(null);
    setCoverImageFile(null);
  };
  const toggleEditModal = () => {
    setUpdateData({
      name: "",
      image: "",
      coverImage: "",
    });
    setImageFile(null);
    setCoverImageFile(null);
    setImageUrl(null);
    setCoverImageUrl(null);
    setIsEditModalVisible(!isEditModalVisible);
  };

  useEffect(() => {
    getAllCategories();
  }, [handleClick]);

  const handlePreviewImage = async (e, type) => {
    const imageFile = e.target.files[0]; // Access the selected image file

    // Check if the file is selected and its size is within the limit
    if (!imageFile || imageFile.size > 5 * 1024 * 1024) {
      // Optionally, you could show an error toast here
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e5cc0e", // Custom yellow color for warning
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
      });
      return; // Exit the function if the image is invalid
    }

    // Proceed with setting the image preview based on type
    if (type === "image") {
      setImageFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
      setIsCropping(true);
    } else if (type === "cover_image") {
      setCoverImageFile(imageFile);
      setCoverImageUrl(URL.createObjectURL(imageFile));
      setIsCoverCropping(true);
    } else {
      // Optionally, handle invalid 'type' values if necessary
      console.error("Invalid type specified");
    }
  };

  const handleNameChange = (e) => {
    isEdit
      ? setUpdateData({
          ...updateData,
          name: e.target.value,
        })
      : setName(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!imageFile || !name || !coverImageFile) {
        toast.warning("Please select all the fields", {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#e5cc0e", // Custom red color for error
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
        });
        return;
      }
      const preReq = await preRequestFun(imageFile, "category");

      const preReqC = await preRequestFun(coverImageFile, "category");

      await postApi({
        url: "category",
        body: {
          name,
          image: preReq?.accessLink,
          coverImage: preReqC?.accessLink,
        },
        authToken: true,
      });
      getAllCategories();
      setIsModalVisible(false);
      setCoverImage("");
      setImage("");
      setImageUrl("");
      setCoverImageUrl("");
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await patchApi({
        url: `category/${categoryId}`,
        body: {
          isDeleted: true,
        },
      });
      getAllCategories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to delete category",
        {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#e50e0e", // Custom red color for error
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
        }
      );
    }
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...updateData };

      if (imageFile) {
        setCatLoading(true);
        const preReq = await preRequestFun(imageFile, "category");
        console.log("preRequestFun response for image:", preReq); // Log response
        updatedData.image = preReq?.accessLink;
      }

      if (coverImageFile) {
        setCatLoading(true);
        const preReqC = await preRequestFun(coverImageFile, "category");
        console.log("preRequestFun response for cover image:", preReqC); // Log response
        updatedData.coverImage = preReqC?.accessLink;
      }
      setCatLoading(false);

      // You can directly use updatedData here for API call
      await patchApi({
        url: `category/${updatedData?.categoryId}`, // Ensure URL starts with '/'
        body: updatedData,
      });
      toggleEditModal();
      await getAllCategories(); // Wait for the categories to refresh

      toast.success("Category updated successfully", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#28a745", // Custom green color for success
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
      });
    } catch (error) {
      console.error("Error updating category:", error); // Log error for debugging
      toast.error(
        error?.response?.data?.message ?? "Failed to update category",
        {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#e50e0e", // Custom red color for error
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
        }
      );
    }
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#105193] hover:bg-[#107D93] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add New Category
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Category"}
            >
              <div className="modal-overlay">
                <div className="modal-content">
                  {/* Close button positioned in the top-right corner */}
                  <button className="modal-close-btn" onClick={toggleModal}>
                    ✕
                  </button>

                  <h2 className="modal-header">Add Category</h2>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          name="name"
                          id="name"
                          className="modal-input mt-1"
                          placeholder="Category Name"
                          onChange={handleNameChange}
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image{" "}
                          <span style={{ color: "grey" }}>(Ratio 1 : 1)</span>
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="modal-input mt-1"
                          onChange={(e) => handlePreviewImage(e, "image")}
                        />
                        {imageUrl && (
                          <img
                            className="mt-2 w-20 h-auto"
                            src={imageUrl}
                            alt="previewImage"
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="coverImage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cover Image{" "}
                          <span style={{ color: "grey" }}>(Ratio 16 : 9)</span>
                        </label>
                        <input
                          type="file"
                          name="coverImage"
                          id="coverImage"
                          className="modal-input mt-1"
                          onChange={(e) => handlePreviewImage(e, "cover_image")}
                        />
                        {coverImageUrl && (
                          <img
                            className="mt-2 w-20 h-auto"
                            src={coverImageUrl}
                            alt="previewImage"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button type="submit" className="modal-submit-btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>

            <Modal
              isVisible={isEditModalVisible}
              onClose={toggleEditModal}
              modalHeader={"Edit Category"}
            >
              <div className="modal-overlay">
                <div className="modal-content">
                  {/* Close button positioned in the top-right corner */}
                  <button className="modal-close-btn" onClick={toggleEditModal}>
                    ✕
                  </button>

                  <h2 className="modal-header">Edit Category</h2>

                  <form onSubmit={onEditSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={updateData?.name}
                          name="name"
                          id="name"
                          className="modal-input mt-1"
                          placeholder="Category Name"
                          onChange={handleNameChange}
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image
                          <span style={{ color: "grey" }}>(Ratio 1 : 1)</span>
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="modal-input mt-1"
                          onChange={(e) => handlePreviewImage(e, "image")}
                        />
                        {(imageUrl || updateData?.image) && (
                          <img
                            className="mt-2 w-20 h-auto"
                            src={imageUrl || updateData?.image}
                            alt="previewImage"
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="coverImage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cover Image{" "}
                          <span style={{ color: "grey" }}>(Ratio 16 : 9)</span>
                        </label>
                        <input
                          type="file"
                          name="coverImage"
                          id="coverImage"
                          className="modal-input mt-1"
                          onChange={(e) => handlePreviewImage(e, "cover_image")}
                        />
                        {(coverImageUrl || updateData?.coverImage) && (
                          <img
                            className="mt-2 w-20 h-auto"
                            src={coverImageUrl || updateData?.coverImage}
                            alt="previewImage"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {catLoading ? (
                        <Loader />
                      ) : (
                        <button type="submit" className="modal-submit-btn">
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
        {/* Parent div for span elements */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Category"
          />
        </span>
        <span className="flex items-center">
          <div
            className="cursor-pointer bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl"
            onClick={handleSearch}
          >
            Search
          </div>
        </span>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        <CategoryTable
          tableData={categories}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
          loading={catLoading}
        />
      </div>
      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={totalCategories}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        isVisible={isCropping || isCoverCropping}
        onClose={() => {
          setIsCropping(false);
          setIsCoverCropping(false);
        }}
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
            image={isCropping ? imageUrl : coverImageUrl}
            crop={crop}
            zoom={zoom}
            aspect={isCropping ? 1 : 16 / 9} // Adjust aspect ratio as needed
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
              if (isCropping) {
                const { blob, fileUrl } = await getCroppedImg(
                  imageUrl,
                  croppedAreaPixels
                );
                setImageUrl(fileUrl);
                setImageFile(blob);
                setIsCropping(false);
              } else {
                const { blob, fileUrl } = await getCroppedImg(
                  coverImageUrl,
                  croppedAreaPixels
                );
                setCoverImageUrl(fileUrl);
                setCoverImageFile(blob);
                setIsCoverCropping(false);
              }
            }}
          >
            Crop & Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Clients;
