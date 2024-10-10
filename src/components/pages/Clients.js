import React, { useState } from 'react'
import Modal from '../reUsableCmponent/modal/Modal'
import EmpCard from '../reUsableCmponent/EmpCard'

const Clients = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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

        <Modal isVisible={isModalVisible} onClose={toggleModal} modalHeader={'Add Category'}>
        <form className="space-y-4">

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
       Category Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Category Name"
        required
      />
    </div>
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Image
      </label>
      <input
        type="text"
        name="location"
        id="location"
        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Image"
        required
      />
    </div>
  </div>


  <div className="flex justify-end">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
  </div>
</form>
        </Modal>
      </span>
    </div>

  </div>
  <div className="ml-auto lg:mr-4 flex items-center space-x-8 justify-end">
  {/* Parent div for span elements */}
  <span className="flex items-center justify-center">
    <input
      className="p-2 lg:w-[300px] w-full appearance-none bg-white border border-gray-500"
      placeholder="Category"
    />
  </span>
  <span className="flex items-center">
    <span
      className="cursor-pointer bg-[#0EB599] text-white p-2 lg:w-[250px] text-center"
    >
      Search
    </span>
  </span>
</div>

<div className="flex flex-wrap justify-center mt-4">
        <EmpCard
          selectedRole={''}
          selectedDesignation={'client'}
          isGrid={true}
        />
      </div>
  </>
  )
}

export default Clients
