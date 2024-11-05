import React, { useEffect, useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import useCategories from "../../Hooks/Category/useCategories";
import CategoryTable from "../reUsableCmponent/Tables/CategoryTable";
import { toast } from "sonner";
import { preRequestFun } from "../../api/s3Request";
import { postApi } from "../../api/api";

const Clients = () => {
  const {
    categories,
    page,
    setPage,
    loading,
    limit,
    totalCategories,
    getAllCategories,
  } = useCategories();

  const [filteredCategoies, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredCategories(categories);
    setSearchText("");
  }, [categories]);

  useEffect(() => {
    if (!searchText) {
      setFilteredCategories(categories);
    }
  }, [searchText]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const filteredCategory = categories.filter((category) =>
      category?.name?.includes(searchText)
    );
    setFilteredCategories(filteredCategory);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [name, setName] = useState("");

  const handlePreviewImage = async (e, type) => {
    const file = e.target.files[0];

    // Handle image upload if the image file is selected
    const imageFile = e.target.files[0]; // Access the selected image file
    if (imageFile && imageFile.size <= 5 * 1024 * 1024) {
      // Check if it's valid
      const preReq = await preRequestFun(file, "Category");

      if (type === "image") {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setImage(preReq?.accessLink);
      } else {
        setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
        setCoverImage(preReq?.accessLink);
      }
    } else {
      // Optionally, you could show an error toast here
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e5cc0e", // Custom red color for error
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
      });
      return; // Exit the function if there's no valid image
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!image || !coverImage || !name) {
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

    try {
      await postApi({
        url: "category",
        body: { name, image, coverImage },
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

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add New Category
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Category"}
            >
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
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Category Name"
                      onChange={handleNameChange}
                      required
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
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

                  <div className="mt-5">
                    <label
                      htmlFor="coverImage"
                      className="block text-sm font-medium text-gray-700"
                    >
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

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
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
            onClick={handleSearch}
          >
            Search
          </div>
        </span>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        <CategoryTable tableData={filteredCategoies} />
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
