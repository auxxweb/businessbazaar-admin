import React, { useEffect, useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import usePlans from "../../Hooks/Plan/usePlans";
import PlanTable from "../reUsableCmponent/Tables/PlansTable";
import AddPlanModal from "../reUsableCmponent/modal/AddPlanModal";
import EditPlanModal from "../reUsableCmponent/modal/EditPlanModal";

const ProjetsPage = () => {
  const {
    plans,
    page,
    setPage,
    loading,
    totalPlans,
    limit,
    setSearch,
    addPlan,
    editPlan,
    deletePlan
  } = usePlans();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditIsModalVisible] = useState(false);

  const [selectedDesignation, setSelectedDesignation] = useState(
    `Total Plans : ${totalPlans}`
  );

  const handlePlanEdit = async (id) => {
    setSelectedPlan(id);
    setEditIsModalVisible(true);
  };

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSelectedDesignation(`Total Plans : ${totalPlans}`);
  }, [plans]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleEditModal = () => {
    setEditIsModalVisible(!isEditModalVisible);
  };

  const handleSearch = () => {
    setSearch(searchText);
  };

  const handleAddPlan = async (plansData) => {
    await addPlan(plansData, toggleModal);
  };

  const handleEditPlanFun = async (planUpdateData) => {
    await editPlan(selectedPlan, planUpdateData, toggleEditModal);
  };

  const handleDeletePlan = async (id,setShowDeletePopup) => {
    await deletePlan(id,setShowDeletePopup)
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#105193] hover:bg-[#107D93] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}>
              + Add New Plan
            </span>

            <AddPlanModal
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
              handleAddPlan={handleAddPlan}
            />
            <EditPlanModal
              isModalVisible={isEditModalVisible}
              toggleModal={toggleEditModal}
              handlePlanEdit={handleEditPlanFun}
              planId={selectedPlan}
            />
          </span>
        </div>
      </div>

      <div className="flex rounded-lg p-0 pt-0">
        <input
          type="text"
          value={selectedDesignation}
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
              className="cursor-pointer bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl">
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
          <PlanTable tableData={plans} handlePlanEdit={handlePlanEdit} handlePlanDelete={handleDeletePlan} />
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
