import React, { useEffect, useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import usePlans from "../../Hooks/Plan/usePlans";
import PlanTable from "../reUsableCmponent/Tables/PlansTable";

const ProjetsPage = () => {
  const { plans, page, setPage, loading, totalPlans, limit } = usePlans();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [isGrid, setGrid] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDesignation, setSelectedDesignation] =
    useState("Total Plans : 3");
  const [fileName, setFileName] = useState("");

  const [searchText, setSearchText] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);

  useEffect(() => {
    setFilteredPlans(plans);
    setSearchText("");
  }, [plans]);

  useEffect(() => {
    if (!searchText) {
      setFilteredPlans(plans);
    }
  }, [searchText]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
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
  const handleSearch = () => {
    const filteredPlans = plans.filter((plan) =>
      plan?.plan?.includes(searchText)
    );
    setFilteredPlans(filteredPlans);
  };
  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Plans</h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
         
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add New Plan
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Employee Bulky"}
            >
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
                  className="bg-gray-200 p-3 w-full flex justify-center items-center mb-4 border border-gray-500 "
                >
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
        <input
          type="text"
          value={selectedDesignation}
          onChange={selectProfession}
          className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
          disabled
        />

        <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              value={searchText}
              onChange={handleSearchTextChange}
              className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
              placeholder="Plan Name"
            />
          </span>
          <span className="flex items-center">
            <span
              onClick={handleSearch} // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="m-4">
        <h1 className="mt-0 mb-8 text-2xl font-semibold">All Plans</h1>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
        <ProjectDetailsCard isGrid={isGrid} />
        <ProjectDetailsCard />
        <ProjectDetailsCard />
        <ProjectDetailsCard />
      </div> */}
        <div className="flex flex-wrap justify-center mt-4">
          <PlanTable tableData={filteredPlans} />
        </div>
      </div>
      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={totalPlans}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProjetsPage;
