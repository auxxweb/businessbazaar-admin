import { useEffect, useState } from "react";
import Modal from "./Modal";

const AddPlanModal = ({ isModalVisible, toggleModal, handleAddPlan, setPlansData, plansData }) => {


  const [descriptionInput, setDescriptionInput] = useState("");

  // Handle change for non-array fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setPlansData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle add description
  const addDescription = () => {
    if (descriptionInput.trim()) {
      setPlansData((prevData) => ({
        ...prevData,
        description: [...prevData.description, descriptionInput.trim()]
      }));
      setDescriptionInput(""); // Clear the input field
    }
  };

  // Remove a description item
  const removeDescription = (index) => {
    setPlansData((prevData) => ({
      ...prevData,
      description: prevData.description.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlan(plansData);
  };


  return (
    <Modal
      isVisible={isModalVisible}
      onClose={toggleModal}
      modalHeader={"Add Plan"}>
      <div className="overflow-y-auto max-h-[80vh]">
        {" "}
        {/* Add a max height and enable vertical scroll */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Plan Name */}
            <div>
              <label
                htmlFor="plan"
                className="block text-sm font-medium text-gray-700">
                Plan Name
              </label>
              <input
                type="text"
                value={plansData.plan}
                name="plan"
                id="plan"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Plan Name"
                onChange={handleFieldChange}
                required
              />
            </div>

            {/* Validity */}
            <div>
              <label
                htmlFor="validity"
                className="block text-sm font-medium text-gray-700">
                Validity (in years)
              </label>
              <input
                type="number"
                value={plansData.validity}
                name="validity"
                id="validity"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Validity"
                onChange={handleFieldChange}
                required
              />
            </div>


            {/* Actual Amount */}
            <div>
              <label
                htmlFor="actualAmount"
                className="block text-sm font-medium text-gray-700">
                Actual Amount
              </label>
              <input
                type="number"
                value={plansData.actualAmount}
                name="actualAmount"
                id="actualAmount"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Actual Amount"
                onChange={handleFieldChange}
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700">
                Offer Amount
              </label>
              <input
                type="number"
                value={plansData.amount}
                name="amount"
                id="amount"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Amount"
                onChange={handleFieldChange}
                required
              />
            </div>

            {/* Description Input and List */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="text"
                  value={descriptionInput}
                  id="description"
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add a description"
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addDescription}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                  Add
                </button>
              </div>
              {/* Description List */}
              <ul className="mt-4 space-y-2">
                {plansData.description.map((desc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm">
                    <span className="text-gray-700">{desc}</span>
                    <button
                      type="button"
                      onClick={() => removeDescription(index)}
                      className="text-red-500 hover:text-red-700 ml-2">
                      &#10005;
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Is Premium Checkbox */}
            {/* <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="isPremium"
                id="isPremium"
                checked={plansData.isPremium}
                onChange={(e) =>
                  setPlansData((prevData) => ({
                    ...prevData,
                    isPremium: e.target.checked
                  }))
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isPremium" className="ml-2 text-sm text-gray-700">
                Is Premium
              </label>
            </div> */}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full w-full max-w-xs">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPlanModal;
