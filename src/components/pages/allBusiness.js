import { useEffect, useState } from "react";
import EmpCard from "../reUsableCmponent/EmpCard";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import { deleteApi, getApi, patchApi, patchApii } from "../../api/api";
import { setBusiness } from "../../Features/Business";
import { useDispatch, useSelector } from "react-redux";
import EmpCard1 from "../reUsableCmponent/EmpCard1";

function ContentArea() {
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [fileName, setFileName] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [page, setPage] = useState(1);
  const [reFetch, SetReFetch] = useState(false);
  const [reFetch1, SetReFetch1] = useState(false);
  const limit = 10;
  // const totalItems = 50;
  const dispatch = useDispatch();
  const businessData = useSelector(
    (state) => state.businessSlice?.business || []
  );
  // console.log(data,"dataaaa",totalCount);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedRole("");
    setSelectedDesignation("");
    setPage(1);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const Categories = await getApi(`category/all`, true);
        setCategoryData(Categories.data.data);
      } catch (error) {
        console.error("Error fetching business categories:", error);
      }
    };
    fetchCategoryData();
  }, [selectedDesignation]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const data = await getApi(
          `business/all?page=${page}&limit=${limit}${selectedDesignation !== null
            ? `&category=${selectedDesignation}`
            : ""
          }${searchClick && searchTerm ? `&searchTerm=${searchTerm}` : ""}`,
          true
        );

        // const Categories = await getApi(`category?page=${1}&limit=${100}`, true);
        // setCategoryData(Categories.data.data);
        // console.log(data,"businessData");

        dispatch(setBusiness(data.data));
      } catch (error) {
        console.error("Error fetching business profiles:", error);
      }
    };
    fetchBusinessData();
  }, [page, selectedDesignation, searchClick, reFetch,reFetch1]);

  const handleSearch = () => {
    setSearchClick(!searchClick);
  };

  const handleDelete = async (id) => {
    try {
      await deleteApi(`business/admin/${id}`);
      SetReFetch(!reFetch);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleStatusUpdate = async (id) => {
    try {
      await patchApi({ url: `business/admin/status/${id}`, body: {} });
      SetReFetch(!reFetch);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleisFreeUpdate = async (id) => {
    try {
      
      await patchApi({ url: `business/admin/isfree/${id}`, body: {} });
      SetReFetch1(!reFetch1);
    } catch (error) {
      console.log("Error Message:", error.message);
      console.log("Error Response:", error.response?.data);
    }
    
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Business</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 rounded-lg p-4 pt-0">
        <div className="lg:w-[300px] w-full">
          <select
            value={selectedDesignation}
            onChange={selectProfession}
            className="w-full p-2 appearance-none bg-white border border-gray-500 rounded focus:ring-indigo-500 focus:border-indigo-500 pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
              backgroundPosition: "right 10px center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="">All Categories</option>
            {categoryData?.map((category) => (
              <option key={`index-${category?.id}`} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto lg:mr-0 flex items-center space-x-4 justify-end pt-0">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
              placeholder="Search by name"
            />
          </span>
          <span className="flex items-center">
            <span
              onClick={handleSearch}
              className="cursor-pointer bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <EmpCard
          tableData={businessData}
          handleDelete={handleDelete}
          handleStatusUpdate={handleStatusUpdate}
          handleisFreeUpdate={handleisFreeUpdate}
        />
      </div>

      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={businessData?.totalCount}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default ContentArea;
