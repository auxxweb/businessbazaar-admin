import React, { useEffect, useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import useCategories from "../../Hooks/Category/useCategories";
import CategoryTable from "../reUsableCmponent/Tables/CategoryTable";
import { toast } from "sonner";
import { preRequestFun } from "../../api/s3Request";
import { patchApi, postApi } from "../../api/api";

const Clients = () => {
  const {
    categories,
    page,
    setPage,
    loading,
    limit,
    totalCategories,
    setSearch,
    getAllCategories
  } = useCategories();

  // const [filteredCategoies, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
    coverImage: ""
  });
  const [handleClick,setHandleSelect]=useState(false)


useEffect(()=>{
  setSearch(searchText)
},[handleClick])

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setHandleSelect(!handleClick)
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
      categoryId: id
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [isEdit, setEdit] = useState(false);

  useEffect(()=>{
getAllCategories()
  },[handleClick])

  const handlePreviewImage = async (e, type) => {
    const file = e.target.files[0];

    // Handle image upload if the image file is selected
    const imageFile = e.target.files[0]; // Access the selected image file
    if (imageFile && imageFile.size <= 5 * 1024 * 1024) {
      // Check if it's valid
      const preReq = await preRequestFun(file, "Category");

      if (type === "image") {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        isEdit
          ? setUpdateData({
              ...updateData,
              image: preReq?.accessLink
            })
          : setImage(preReq?.accessLink);
      } else {
        setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
        isEdit
          ? setUpdateData({
              ...updateData,
              coverImage: preReq?.accessLink
            })
          : setCoverImage(preReq?.accessLink);
      }
    } else {
      // Optionally, you could show an error toast here
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e5cc0e", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
      return; // Exit the function if there's no valid image
    }
  };

  const handleNameChange = (e) => {
    isEdit
      ? setUpdateData({
          ...updateData,
          name: e.target.value
        })
      : setName(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!image || !coverImage || !name) {
      toast.warning("Please select all the fields", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e5cc0e", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
      return;
    }

    try {
      await postApi({
        url: "category",
        body: { name, image, coverImage },
        authToken: true
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
          isDeleted: true
        }
      });
      getAllCategories();
    } catch (error) {
      toast.error("Failed to delete category", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e50e0e", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
    }
  };

  const onEditSubmit = async () => {
    try {
      await patchApi({
        url: `category/${updateData?.categoryId}`,
        body: {
          ...updateData
        }
      });
      getAllCategories();
    } catch (error) {
      toast.error("Failed to Update category", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e50e0e", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
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
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}>
              + Add New Category
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Category"}>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      name="name"
                      id="name"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Category Name"
                      onChange={handleNameChange}
                      required
                    />
                  </div>

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
                      className="block text-sm font-medium text-gray-700">
                      Cover Image
                    </label>
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
            <Modal
              isVisible={isEditModalVisible}
              onClose={toggleEditModal}
              modalHeader={"Edit Category"}>
              <form onSubmit={onEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={updateData?.name}
                      name="name"
                      id="name"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Category Name"
                      onChange={handleNameChange}
                      required
                    />
                  </div>

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
                      onChange={(e) => handlePreviewImage(e, "image")}
                    />
                    {(imageUrl || updateData?.image) && (
                      <img
                        className="mt-2 w-20 h-auto"
                        src={imageUrl ?? updateData?.image}
                        alt="previewImage"
                      />
                    )}
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="coverImage"
                      className="block text-sm font-medium text-gray-700">
                      Cover Image
                    </label>
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => handlePreviewImage(e, "cover_image")}
                    />
                    {(coverImageUrl || updateData?.coverImage) && (
                      <img
                        className="mt-2 w-20 h-auto"
                        src={coverImageUrl ?? updateData?.coverImage}
                        alt="previewImage"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
                    Submit
                  </button>
                </div>
              </form>
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
            className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl"
            onClick={handleSearch}>
            Search
          </div>
        </span>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        <CategoryTable
          tableData={categories}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
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
    </>
  );
};

export default Clients;
