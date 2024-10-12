import { useState } from "react";
import EmpCard from "../reUsableCmponent/EmpCard";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import { employeeData } from "../../api/constents";

function ContentArea() {
  // const [isGrid, setGrid] = useState(true)
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [fileName, setFileName] = useState("");

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const selectRole = () => {
    setSelectedRole("");
    setSelectedDesignation("");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };
  const totalItems = 5;
  const itemsPerPage = 4;
  const currentPage = 1;
  const handlePageChange = (page) => {
    console.log("Page changed:", page);
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Business</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}>
              + Add New Bussines
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Employee Bulky"}>
              <form>
                <div className="flex items-center border border-gray-500 rounded-md mb-4 mt-8">
                  <label className="w-[100px] p-2 mr-4 bg-gray-200 border border-r-gray-500 rounded-l-md cursor-pointer text-center">
                    Add File
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="w-full px-4 text-gray-500">
                    {fileName ? fileName : "Upload .xl File"}
                  </span>
                </div>

                <button
                  type="button"
                  className="bg-gray-200 p-3 w-full flex justify-center items-center mb-4 border border-gray-500 ">
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                        fill="black"
                      />
                    </svg>
                  </span>{" "}
                  Upload
                </button>
              </form>
            </Modal>
          </span>
        </div>
      </div>

      <div className="flex rounded-lg p-4 pt-0">
        <select
          value={selectedDesignation}
          onChange={selectProfession}
          className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            paddingRight: "40px"
          }}>
          <option
            value=""
            disabled
            selected
            className="text-gray-500 font-bold">
            Select Category
          </option>
          <option value="All">All</option>
          <option value="Web Designer">Resturant</option>
          <option value="Web Developer">Saloon</option>
          <option value="FrontEnd Developer">Resorts</option>
          <option value="BackEnd Developer">Super Markets</option>
        </select>

        <div className="ml-auto flex items-center space-x-4">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              value={selectedRole} // Bind the state to the input value
              onChange={handleInputChange} // Call handleInputChange on input change
              className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-500"
              placeholder="Business Name, Category, Location"
            />
          </span>
          <span className="flex items-center">
            <span
              onClick={selectRole} // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[260px] text-center">
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <EmpCard
        tableData={employeeData}
          selectedRole={selectedRole}
          selectedDesignation={selectedDesignation}
        />
      </div>
      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default ContentArea;
