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
              modalHeader={"Add Plan"}
            >
              <form>
              <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Plan Name
                    </label>
                    <input
                      type="text"
                      // value={name}
                      name="name"
                      id="name"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Plan Name"
                      onChange={{}}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Validity
                    </label>
                    <input
                      type="text"
                      // value={name}
                      name="validity"
                      id="name"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Select Validity"
                      onChange={{}}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      // value={name}
                      name="description"
                      id="name"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Description"
                      onChange={{}}
                      required
                    />
                  </div>

                 
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
          </span>
        </div>
      </div>

      <div className="flex rounded-lg p-0 pt-0">
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
