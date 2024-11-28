import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Modal from "../reUsableCmponent/modal/Modal";
import { resetLogin } from "../../Features/Authority";
import { useDispatch } from "react-redux";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sideBarOption, setSideBaroption] = useState("dashboard");

  // navigate('/browse');
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleLogout = () => {
    dispatch(resetLogin());
    navigate("/login");
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="bg-[#212529] w-[268px] h-[900px] space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 z-50"
    >
      {/* Sidebar content */}
      <div>
        {/* Close button for mobile */}
        <button
          className="lg:hidden text-white focus:outline-none absolute right-4 top-4"
          onClick={() => {
            setIsOpen(false);
            setSideBaroption("dashboard");
          }}>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Links */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer">
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.375 0.8125H17.9708L17.675 1.075L14.1875 4.5625H5.3125C4.47361 4.5625 3.69306 4.77222 2.97083 5.19167C2.24583 5.61111 1.67361 6.18333 1.25417 6.90833C0.834722 7.63056 0.625 8.41111 0.625 9.25V18.625C0.625 19.4639 0.834722 20.2458 1.25417 20.9708C1.67361 21.6931 2.24583 22.2639 2.97083 22.6833C3.69306 23.1028 4.47361 23.3125 5.3125 23.3125H14.6875C15.5264 23.3125 16.3083 23.1028 17.0333 22.6833C17.7556 22.2639 18.3264 21.6931 18.7458 20.9708C19.1653 20.2458 19.375 19.4639 19.375 18.625V0.8125ZM14.9792 6.4375L17.5 3.91667V18.625C17.5 19.4056 17.2264 20.0694 16.6792 20.6167C16.1319 21.1639 15.4681 21.4375 14.6875 21.4375H5.3125C4.53194 21.4375 3.86806 21.1639 3.32083 20.6167C2.77361 20.0694 2.5 19.4056 2.5 18.625V9.25C2.5 8.46944 2.77361 7.80556 3.32083 7.25833C3.86806 6.71111 4.53194 6.4375 5.3125 6.4375H14.9792ZM12.8125 9.25H7.1875C6.67917 9.25 6.24028 9.43611 5.87083 9.80833C5.49861 10.1778 5.3125 10.6167 5.3125 11.125V16.75C5.3125 17.2583 5.49861 17.6972 5.87083 18.0667C6.24028 18.4389 6.67917 18.625 7.1875 18.625H16.9417L14.6875 16.3417V11.125C14.6875 10.6167 14.5014 10.1778 14.1292 9.80833C13.7597 9.43611 13.3208 9.25 12.8125 9.25ZM7.1875 16.75V11.125H12.8125V16.75H7.1875Z"
                fill="#1DB290"
              />
            </svg>
            <span
              className={`text-custom-16 ${sideBarOption == "dashboard"
                ? "text-[#e7edf4]"
                : "text-[#909294]"
                }  hover:text-[#e7edf4] ml-4`}>
              Dashboard
            </span>
          </span>
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              {/* Main Button */}
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className="flex mr-14">
                  <span className="ml-[-10px]">
                    <svg
                      width="24"
                      height="20"
                      viewBox="0 0 16 18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0.75C7.04667 0.75 6.16778 0.984444 5.36333 1.45333C4.55889 1.92222 3.92222 2.55889 3.45333 3.36333C2.98444 4.16778 2.75 5.04667 2.75 6C2.75 6.89111 2.95667 7.71889 3.37 8.48333C3.78556 9.25 4.35222 9.87556 5.07 10.36C4.17889 10.7511 3.38556 11.29 2.69 11.9767C1.99667 12.6633 1.46222 13.4522 1.08667 14.3433C0.695556 15.2656 0.5 16.2344 0.5 17.25H2C2 16.1567 2.27 15.1522 2.81 14.2367C3.34778 13.3233 4.07333 12.5978 4.98667 12.06C5.90222 11.52 6.90667 11.25 8 11.25C9.09333 11.25 10.0978 11.52 11.0133 12.06C11.9267 12.5978 12.6522 13.3233 13.19 14.2367C13.73 15.1522 14 16.1567 14 17.25H15.5C15.5 16.2344 15.3044 15.2656 14.9133 14.3433C14.5378 13.4522 14.0033 12.6633 13.31 11.9767C12.6144 11.29 11.8211 10.7511 10.93 10.36C11.6478 9.87556 12.2144 9.25 12.63 8.48333C13.0433 7.71889 13.25 6.89111 13.25 6C13.25 5.04667 13.0156 4.16778 12.5467 3.36333C12.0778 2.55889 11.4411 1.92222 10.6367 1.45333C9.83222 0.984444 8.95333 0.75 8 0.75ZM8 2.25C8.68667 2.25 9.31556 2.41778 9.88667 2.75333C10.4578 3.08889 10.9111 3.54222 11.2467 4.11333C11.5822 4.68444 11.75 5.31333 11.75 6C11.75 6.68667 11.5822 7.31556 11.2467 7.88667C10.9111 8.45778 10.4578 8.91111 9.88667 9.24667C9.31556 9.58222 8.68667 9.75 8 9.75C7.31333 9.75 6.68444 9.58222 6.11333 9.24667C5.54222 8.91111 5.08889 8.45778 4.75333 7.88667C4.41778 7.31556 4.25 6.68667 4.25 6C4.25 5.31333 4.41778 4.68444 4.75333 4.11333C5.08889 3.54222 5.54222 3.08889 6.11333 2.75333C6.68444 2.41778 7.31333 2.25 8 2.25Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span
                    className={`text-custom-16 ${sideBarOption === "business" ? "text-[#e7edf4]" : "text-[#909294]"
                      } hover:text-[#e7edf4] ml-4`}
                  >
                    Business
                  </span>
                </div>
                <span className="text-[#909294] hover:text-[#e7edf4] cursor-pointer transition-transform duration-200">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 transform rotate-90"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 ml-7"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
                    </svg>
                  )}
                </span>
              </Disclosure.Button>

              {/* Additional Buttons */}
              {open && (
                <div className="flex flex-col p-4 space-y-2 rounded-md shadow-md">
                  <button
                    onClick={() => navigate("/business")}
                    className={`text-custom-14 text-start ${sideBarOption === "business" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                   All Business
                  </button>
                  <button
                    onClick={() => navigate("/trashbusiness")}
                    className={`text-custom-14 text-start ${sideBarOption === "business" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                  Trash Business
                  </button>
                </div>
              )}
            </>
          )}
        </Disclosure>


        <Disclosure>
          {({ open }) => (
            <>
              {/* Main Button */}
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className="flex mr-14">
                <span className="ml-[-10px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 22 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.62667 0.5C7.15778 0.5 6.72 0.616667 6.31333 0.85C5.90667 1.08556 5.58556 1.40667 5.35 1.81333C5.11667 2.22 5 2.65778 5 3.12667C5 3.59333 5.11667 4.03 5.35 4.43667C5.58556 4.84333 5.90667 5.16444 6.31333 5.4C6.72 5.63333 7.15778 5.75 7.62667 5.75C8.09333 5.75 8.53 5.63333 8.93667 5.4C9.34333 5.16444 9.66444 4.84333 9.9 4.43667C10.1333 4.03 10.25 3.59333 10.25 3.12667C10.25 2.65778 10.1333 2.22 9.9 1.81333C9.66444 1.40667 9.34333 1.08556 8.93667 0.85C8.53 0.616667 8.09333 0.5 7.62667 0.5ZM14.3767 0.5C13.9078 0.5 13.47 0.616667 13.0633 0.85C12.6567 1.08556 12.3356 1.40667 12.1 1.81333C11.8667 2.22 11.75 2.65778 11.75 3.12667C11.75 3.59333 11.8667 4.03 12.1 4.43667C12.3356 4.84333 12.6567 5.16444 13.0633 5.4C13.47 5.63333 13.9078 5.75 14.3767 5.75C14.8433 5.75 15.28 5.63333 15.6867 5.4C16.0933 5.16444 16.4144 4.84333 16.65 4.43667C16.8833 4.03 17 3.59333 17 3.12667C17 2.65778 16.8833 2.22 16.65 1.81333C16.4144 1.40667 16.0933 1.08556 15.6867 0.85C15.28 0.616667 14.8433 0.5 14.3767 0.5ZM7.62667 2C7.93778 2 8.20333 2.10889 8.42333 2.32667C8.64111 2.54667 8.75 2.81333 8.75 3.12667C8.75 3.43778 8.64111 3.70333 8.42333 3.92333C8.20333 4.14111 7.93778 4.25 7.62667 4.25C7.31333 4.25 7.04667 4.14111 6.82667 3.92333C6.60889 3.70333 6.5 3.43778 6.5 3.12667C6.5 2.81333 6.60889 2.54667 6.82667 2.32667C7.04667 2.10889 7.31333 2 7.62667 2ZM14.3767 2C14.6878 2 14.9533 2.10889 15.1733 2.32667C15.3911 2.54667 15.5 2.81333 15.5 3.12667C15.5 3.43778 15.3911 3.70333 15.1733 3.92333C14.9533 4.14111 14.6878 4.25 14.3767 4.25C14.0633 4.25 13.7967 4.14111 13.5767 3.92333C13.3589 3.70333 13.25 3.43778 13.25 3.12667C13.25 2.81333 13.3589 2.54667 13.5767 2.32667C13.7967 2.10889 14.0633 2 14.3767 2ZM4.25 5C3.70333 5 3.20333 5.13667 2.75 5.41C2.29667 5.68333 1.93333 6.04667 1.66 6.5C1.38667 6.95333 1.25 7.45333 1.25 8C1.25 8.40667 1.33222 8.79333 1.49667 9.16C1.66111 9.52667 1.88333 9.85111 2.16333 10.1333C1.64778 10.4778 1.24222 10.9233 0.946667 11.47C0.648889 12.0167 0.5 12.61 0.5 13.25H2C2 12.6256 2.21889 12.0944 2.65667 11.6567C3.09444 11.2189 3.62556 11 4.25 11C4.87444 11 5.40556 11.2189 5.84333 11.6567C6.28111 12.0944 6.5 12.6256 6.5 13.25H8C8 12.61 7.85111 12.0167 7.55333 11.47C7.25778 10.9233 6.85222 10.4778 6.33667 10.1333C6.61667 9.85111 6.83889 9.52667 7.00333 9.16C7.16778 8.79333 7.25 8.40667 7.25 8C7.25 7.45333 7.11333 6.95333 6.84 6.5C6.56667 6.04667 6.20333 5.68333 5.75 5.41C5.29667 5.13667 4.79667 5 4.25 5ZM8 13.25C7.5 13.9211 7.25 14.6711 7.25 15.5H8.75C8.75 14.8756 8.96889 14.3444 9.40667 13.9067C9.84444 13.4689 10.3756 13.25 11 13.25C11.6244 13.25 12.1556 13.4689 12.5933 13.9067C13.0311 14.3444 13.25 14.8756 13.25 15.5H14.75C14.75 14.6711 14.5 13.9211 14 13.25C13.7511 12.9056 13.4467 12.6167 13.0867 12.3833C13.3667 12.1011 13.5889 11.7767 13.7533 11.41C13.9178 11.0433 14 10.6567 14 10.25C14 9.70333 13.8633 9.20333 13.59 8.75C13.3167 8.29667 12.9533 7.93333 12.5 7.66C12.0467 7.38667 11.5467 7.25 11 7.25C10.4533 7.25 9.95333 7.38667 9.5 7.66C9.04667 7.93333 8.68333 8.29667 8.41 8.75C8.13667 9.20333 8 9.70333 8 10.25C8 10.6567 8.08222 11.0433 8.24667 11.41C8.41111 11.7767 8.63333 12.1011 8.91333 12.3833C8.55556 12.6167 8.25111 12.9056 8 13.25ZM14 13.25H15.5C15.5 12.6256 15.7189 12.0944 16.1567 11.6567C16.5944 11.2189 17.1256 11 17.75 11C18.3744 11 18.9056 11.2189 19.3433 11.6567C19.7811 12.0944 20 12.6256 20 13.25H21.5C21.5 12.61 21.3511 12.0167 21.0533 11.47C20.7578 10.9233 20.3522 10.4778 19.8367 10.1333C20.1167 9.85111 20.3389 9.52667 20.5033 9.16C20.6678 8.79333 20.75 8.40667 20.75 8C20.75 7.45333 20.6133 6.95333 20.34 6.5C20.0667 6.04667 19.7033 5.68333 19.25 5.41C18.7967 5.13667 18.2967 5 17.75 5C17.2033 5 16.7033 5.13667 16.25 5.41C15.7967 5.68333 15.4333 6.04667 15.16 6.5C14.8867 6.95333 14.75 7.45333 14.75 8C14.75 8.40667 14.8322 8.79333 14.9967 9.16C15.1611 9.52667 15.3833 9.85111 15.6633 10.1333C15.1478 10.4778 14.7422 10.9233 14.4467 11.47C14.1489 12.0167 14 12.61 14 13.25ZM4.25 6.5C4.67222 6.5 5.02778 6.64444 5.31667 6.93333C5.60556 7.22222 5.75 7.57778 5.75 8C5.75 8.42222 5.60556 8.77778 5.31667 9.06667C5.02778 9.35556 4.67222 9.5 4.25 9.5C3.82778 9.5 3.47222 9.35556 3.18333 9.06667C2.89444 8.77778 2.75 8.42222 2.75 8C2.75 7.57778 2.89444 7.22222 3.18333 6.93333C3.47222 6.64444 3.82778 6.5 4.25 6.5ZM17.75 6.5C18.1722 6.5 18.5278 6.64444 18.8167 6.93333C19.1056 7.22222 19.25 7.57778 19.25 8C19.25 8.42222 19.1056 8.77778 18.8167 9.06667C18.5278 9.35556 18.1722 9.5 17.75 9.5C17.3278 9.5 16.9722 9.35556 16.6833 9.06667C16.3944 8.77778 16.25 8.42222 16.25 8C16.25 7.57778 16.3944 7.22222 16.6833 6.93333C16.9722 6.64444 17.3278 6.5 17.75 6.5ZM11 8.75C11.4222 8.75 11.7778 8.89444 12.0667 9.18333C12.3556 9.47222 12.5 9.82778 12.5 10.25C12.5 10.6722 12.3556 11.0278 12.0667 11.3167C11.7778 11.6056 11.4222 11.75 11 11.75C10.5778 11.75 10.2222 11.6056 9.93333 11.3167C9.64444 11.0278 9.5 10.6722 9.5 10.25C9.5 9.82778 9.64444 9.47222 9.93333 9.18333C10.2222 8.89444 10.5778 8.75 11 8.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span
                    className={`text-custom-16 ${sideBarOption === "business" ? "text-[#e7edf4]" : "text-[#909294]"
                      } hover:text-[#e7edf4] ml-4`}
                  >
                    Categories
                  </span>
                </div>
                <span className="text-[#909294] hover:text-[#e7edf4] cursor-pointer transition-transform duration-200">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 transform rotate-90"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 ml-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
                    </svg>
                  )}
                </span>
              </Disclosure.Button>

              {/* Additional Buttons */}
              {open && (
                <div className="flex flex-col p-4 space-y-2 rounded-md shadow-md">
                  <button
                    onClick={() => navigate("/categories")}
                    className={`text-custom-14 text-start ${sideBarOption === "category" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                   All Categories
                  </button>
                  <button
                    onClick={() => navigate("/trashcategories")}
                    className={`text-custom-14 text-start ${sideBarOption === "category" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                    Trash Categories
                  </button>
                </div>
              )}
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              {/* Main Button */}
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className="flex mr-14">
                <span className="ml-[-10px]">
                    {/* Plans Icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-colors duration-200"
                    >
                      <path
                        d="M19.9534 0.0466668L18.43 0C17.7745 0 17.1022 0.031111 16.4133 0.0933332C15.4289 0.186667 14.64 0.32 14.0467 0.493333C13.1711 0.742222 12.4911 1.10889 12.0067 1.59333C11.3045 2.29778 9.77335 4.18889 7.41335 7.26667L6.75668 8.13333L5.47001 8.06333C4.98557 8.03222 4.52446 8.11444 4.08668 8.31C3.6489 8.50333 3.28113 8.78778 2.98335 9.16333L1.41335 11.0867L0.640015 12.07L4.32001 12.7967L7.20335 15.68L7.69668 18.14L7.95335 19.36L10.8367 17.0167C11.2122 16.7189 11.4967 16.3511 11.69 15.9133C11.8856 15.4756 11.9678 15.0144 11.9367 14.53L11.8667 13.2667L12.7567 12.5867C14.2567 11.4467 15.3745 10.5789 16.11 9.98333C17.25 9.07889 18.0233 8.42333 18.43 8.01667C18.9145 7.53222 19.2811 6.85222 19.53 5.97667C19.6878 5.38333 19.8133 4.57889 19.9067 3.56333C20 2.54778 20.0233 1.60222 19.9767 0.726667L19.9534 0.0466668ZM17.75 1.5C17.8745 1.5 18.0389 1.50778 18.2433 1.52333H18.4767V1.59333C18.4922 2.18667 18.4689 2.80444 18.4067 3.44667C18.3445 4.18 18.2111 4.88667 18.0067 5.56667C17.8045 6.24667 17.5856 6.70333 17.35 6.93667C17.0389 7.25 16.3289 7.86 15.22 8.76667C14.22 9.56222 13.0945 10.4367 11.8433 11.39L7.97668 14.3433L5.68002 12.0467L5.89001 11.7667C6.82779 10.5 7.72668 9.30445 8.58668 8.18C9.54002 6.92889 10.4222 5.80333 11.2333 4.80333C12.1245 3.69444 12.7345 2.97667 13.0633 2.65C13.3122 2.39889 13.7811 2.17222 14.47 1.97C15.1256 1.76556 15.82 1.63222 16.5533 1.57C17.0689 1.52333 17.4678 1.5 17.75 1.5ZM14.3267 4.15C13.9067 4.15 13.5522 4.29778 13.2633 4.59333C12.9722 4.89111 12.8267 5.25111 12.8267 5.67333C12.8267 6.09333 12.9722 6.45222 13.2633 6.75C13.5522 7.04778 13.9067 7.19667 14.3267 7.19667C14.7489 7.19667 15.1089 7.04778 15.4067 6.75C15.7022 6.45222 15.85 6.09333 15.85 5.67333C15.85 5.25111 15.7022 4.89111 15.4067 4.59333C15.1089 4.29778 14.7489 4.15 14.3267 4.15ZM5.37668 9.56333L5.65668 9.58667L4.36668 11.2733L3.36001 11.0633L4.13335 10.1267C4.2889 9.93778 4.47668 9.79222 4.69668 9.69C4.91446 9.59 5.14113 9.54778 5.37668 9.56333ZM4.72001 14.5067L3.66335 13.4533C3.1789 13.9378 2.75779 14.6956 2.40001 15.7267C2.22668 16.2267 2.10113 16.68 2.02335 17.0867L1.79001 18.1867L3.29001 17.8833C3.60113 17.8211 3.91335 17.7356 4.22668 17.6267C5.24224 17.2822 6.00779 16.8522 6.52335 16.3367L5.47001 15.28C5.18779 15.5622 4.65668 15.8444 3.87668 16.1267C4.17224 15.3133 4.45335 14.7733 4.72001 14.5067ZM8.72668 15.6333L10.4133 14.3433L10.4367 14.6267C10.4522 14.8756 10.4133 15.1056 10.32 15.3167C10.2267 15.5278 10.0867 15.7111 9.90001 15.8667L8.93668 16.64L8.72668 15.6333Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span
                    className={`text-custom-16 ${sideBarOption === "business" ? "text-[#e7edf4]" : "text-[#909294]"
                      } hover:text-[#e7edf4] ml-4`}
                  >
                    Plans
                  </span>
                </div>
                <span className="text-[#909294] hover:text-[#e7edf4] cursor-pointer transition-transform duration-200">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 transform rotate-90"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 ml-14"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
                    </svg>
                  )}
                </span>
              </Disclosure.Button>

              {/* Additional Buttons */}
              {open && (
                <div className="flex flex-col p-4 space-y-2 rounded-md shadow-md">
                  <button
                    onClick={() => navigate("/plans")}
                    className={`text-custom-14 text-start ${sideBarOption === "plans" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                    All Plans
                  </button>
                  <button
                    onClick={() => navigate("/trashplans")}
                    className={`text-custom-14 text-start ${sideBarOption === "plans" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                    Trash Plans
                  </button>
                </div>
              )}
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className=" flex mr-14">
                  <span className="ml-[-10px]">
                    <svg
                      width="21"
                      height="15"
                      viewBox="0 0 21 15"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.6333 0C14.7422 0.0311111 13.8356 0.164444 12.9133 0.4C12.3667 0.524444 11.5856 0.766666 10.57 1.12667L10.5467 1.15C9.46889 1.50778 8.64889 1.75778 8.08667 1.9C7.13333 2.13333 6.18778 2.25 5.25 2.25C3.84333 2.28111 2.42111 2.04667 0.983333 1.54667L0 1.19667V14.0167L0.493333 14.2033C1.80444 14.6567 3.13222 14.9144 4.47667 14.9767C4.67889 14.9922 4.88222 15 5.08667 15C6.08667 15 7.10222 14.8756 8.13333 14.6267C8.74222 14.4844 9.60889 14.2178 10.7333 13.8267H10.7567C11.9144 13.4222 12.8056 13.1489 13.43 13.0067C14.4456 12.7889 15.4533 12.7033 16.4533 12.75C17.64 12.7967 18.82 13.0311 19.9933 13.4533L21 13.8033V0.983334L20.5067 0.796667C19.2111 0.327778 17.8833 0.0699999 16.5233 0.0233332C16.2411 0.00777768 15.9444 0 15.6333 0ZM15.68 1.5C15.9444 1.48444 16.2056 1.48444 16.4633 1.5C16.7211 1.51556 17.0067 1.53889 17.32 1.57C17.4133 1.97667 17.6278 2.31667 17.9633 2.59C18.3011 2.86333 18.6889 3 19.1267 3C19.2511 3 19.3756 2.98444 19.5 2.95333V9.79667C19.3756 9.76556 19.2511 9.75 19.1267 9.75C18.6733 9.75 18.27 9.89889 17.9167 10.1967C17.5656 10.4922 17.3511 10.8589 17.2733 11.2967C17.04 11.2811 16.79 11.2656 16.5233 11.25C15.3989 11.2033 14.2667 11.3044 13.1267 11.5533C12.4222 11.7111 11.4689 12.0011 10.2667 12.4233C9.09333 12.8278 8.20222 13.0933 7.59333 13.22C6.56222 13.4533 5.54667 13.5467 4.54667 13.5C4.28222 13.4844 3.99333 13.4611 3.68 13.43C3.58667 13.0078 3.37222 12.6644 3.03667 12.4C2.69889 12.1333 2.31222 12 1.87667 12C1.75 12 1.62444 12.0156 1.5 12.0467V5.20333C1.62444 5.23444 1.75 5.25 1.87667 5.25C2.34333 5.25 2.74889 5.10111 3.09333 4.80333C3.43778 4.50778 3.64889 4.13333 3.72667 3.68C4.28889 3.74222 4.79667 3.76556 5.25 3.75C6.31222 3.73444 7.36667 3.60111 8.41333 3.35C9.02222 3.21 9.89 2.94444 11.0167 2.55333H11.04C11.9933 2.21111 12.7278 1.97667 13.2433 1.85C14.07 1.63222 14.8822 1.51556 15.68 1.5ZM10.5 3.75C9.95333 3.75 9.44889 3.91778 8.98667 4.25333C8.52667 4.58889 8.16444 5.04667 7.9 5.62667C7.63333 6.20444 7.5 6.82889 7.5 7.5C7.5 8.17111 7.63333 8.79667 7.9 9.37667C8.16444 9.95444 8.52667 10.4111 8.98667 10.7467C9.44889 11.0822 9.95333 11.25 10.5 11.25C11.0467 11.25 11.5511 11.0822 12.0133 10.7467C12.4733 10.4111 12.8356 9.95444 13.1 9.37667C13.3667 8.79667 13.5 8.17111 13.5 7.5C13.5 6.82889 13.3667 6.20444 13.1 5.62667C12.8356 5.04667 12.4733 4.58889 12.0133 4.25333C11.5511 3.91778 11.0467 3.75 10.5 3.75ZM10.5 5.25C10.9067 5.25 11.2578 5.47222 11.5533 5.91667C11.8511 6.36333 12 6.89111 12 7.5C12 8.10889 11.8511 8.63667 11.5533 9.08333C11.2578 9.52778 10.9067 9.75 10.5 9.75C10.0933 9.75 9.74222 9.52778 9.44667 9.08333C9.14889 8.63667 9 8.10889 9 7.5C9 6.89111 9.14889 6.36333 9.44667 5.91667C9.74222 5.47222 10.0933 5.25 10.5 5.25ZM16.1267 5.25C15.8133 5.25 15.5467 5.35889 15.3267 5.57667C15.1089 5.79667 15 6.06333 15 6.37667C15 6.68778 15.1089 6.95333 15.3267 7.17333C15.5467 7.39111 15.8133 7.5 16.1267 7.5C16.4378 7.5 16.7033 7.39111 16.9233 7.17333C17.1411 6.95333 17.25 6.68778 17.25 6.37667C17.25 6.06333 17.1411 5.79667 16.9233 5.57667C16.7033 5.35889 16.4378 5.25 16.1267 5.25ZM4.87667 7.5C4.56333 7.5 4.29667 7.60889 4.07667 7.82667C3.85889 8.04667 3.75 8.31333 3.75 8.62667C3.75 8.93778 3.85889 9.20333 4.07667 9.42333C4.29667 9.64111 4.56333 9.75 4.87667 9.75C5.18778 9.75 5.45333 9.64111 5.67333 9.42333C5.89111 9.20333 6 8.93778 6 8.62667C6 8.31333 5.89111 8.04667 5.67333 7.82667C5.45333 7.60889 5.18778 7.5 4.87667 7.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => {
                      navigate("/paymentpage");
                      setSideBaroption("payments");
                    }}
                    className={`text-custom-16 ${sideBarOption == "payments"
                      ? "text-[#e7edf4]"
                      : "text-[#909294]"
                      }  hover:text-[#e7edf4] ml-4`}>
                    Payment
                  </span>
                </div>
              </Disclosure.Button>
            </>
          )}
        </Disclosure>


        <Disclosure>
          {({ open }) => (
            <>
              {/* Main Button */}
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className="flex mr-14">
                <span className="ml-[-10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor">
                      <path d="M4 4h16c1.1 0 1.99.9 1.99 2L22 18c0 1.1-.89 2-1.99 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4z" />
                    </svg>
                  </span>
                  <span
                    className={`text-custom-16 ${sideBarOption === "banner" ? "text-[#e7edf4]" : "text-[#909294]"
                      } hover:text-[#e7edf4] ml-4`}
                  >
                    Banner
                  </span>
                </div>
                <span className="text-[#909294] hover:text-[#e7edf4] cursor-pointer transition-transform duration-200">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 transform rotate-90"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 ml-10"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
                    </svg>
                  )}
                </span>
              </Disclosure.Button>

              {/* Additional Buttons */}
              {open && (
                <div className="flex flex-col p-4 space-y-2 rounded-md shadow-md">
                  <button
                    onClick={() => navigate("/banner")}
                    className={`text-custom-14 text-start ${sideBarOption === "banner" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                    All Banner
                  </button>
                  <button
                    onClick={() => navigate("/trashbanner")}
                    className={`text-custom-14 text-start ${sideBarOption === "banner" ? "text-[#e7edf4]" : "text-[#909294]"
                    } hover:text-[#e7edf4] ml-4`}
                  >
                 Trash Banner
                  </button>
                </div>
              )}
            </>
          )}
        </Disclosure>

       
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className=" flex mr-14">
                  <span className="ml-[-10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none">
                      <path
                        fill="currentColor"
                        d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM10.5 8.5H13.5V13.5H10.5V8.5ZM10.5 14.5H13.5V16H10.5V14.5Z"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => {
                      navigate("/terms");
                      setSideBaroption("terms");
                    }}
                    className={`text-custom-16 ${sideBarOption == "terms"
                      ? "text-[#e7edf4]"
                      : "text-[#909294]"
                      }  hover:text-[#e7edf4] ml-2`}>
                    Terms&conditions
                  </span>
                </div>
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className=" flex mr-14">
                  <span className="ml-[-10px]">
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.665 21L7.245 17.64C7.0175 17.5525 6.8033 17.4475 6.6024 17.325C6.4015 17.2025 6.20445 17.0712 6.01125 16.9312L2.8875 18.2437L0 13.2562L2.70375 11.2087C2.68625 11.0862 2.6775 10.9683 2.6775 10.8549V10.1461C2.6775 10.0321 2.68625 9.91375 2.70375 9.79125L0 7.74375L2.8875 2.75625L6.01125 4.06875C6.20375 3.92875 6.405 3.7975 6.615 3.675C6.825 3.5525 7.035 3.4475 7.245 3.36L7.665 0H13.44L13.86 3.36C14.0875 3.4475 14.302 3.5525 14.5036 3.675C14.7052 3.7975 14.9019 3.92875 15.0938 4.06875L18.2175 2.75625L21.105 7.74375L18.4012 9.79125C18.4187 9.91375 18.4275 10.0321 18.4275 10.1461V10.8538C18.4275 10.9679 18.41 11.0862 18.375 11.2087L21.0787 13.2562L18.1912 18.2437L15.0938 16.9312C14.9012 17.0712 14.7 17.2025 14.49 17.325C14.28 17.4475 14.07 17.5525 13.86 17.64L13.44 21H7.665ZM9.5025 18.9H11.5763L11.9437 16.1175C12.4862 15.9775 12.9895 15.772 13.4536 15.5012C13.9177 15.2302 14.342 14.9019 14.7262 14.5162L17.325 15.5925L18.3487 13.8075L16.0912 12.1012C16.1787 11.8562 16.24 11.5983 16.275 11.3274C16.31 11.0565 16.3275 10.7807 16.3275 10.5C16.3275 10.2193 16.31 9.94385 16.275 9.67365C16.24 9.40345 16.1787 9.14515 16.0912 8.89875L18.3487 7.1925L17.325 5.4075L14.7262 6.51C14.3412 6.1075 13.917 5.7708 13.4536 5.4999C12.9902 5.229 12.4869 5.0232 11.9437 4.8825L11.6025 2.1H9.52875L9.16125 4.8825C8.61875 5.0225 8.1158 5.2283 7.6524 5.4999C7.189 5.7715 6.76445 6.09945 6.37875 6.48375L3.78 5.4075L2.75625 7.1925L5.01375 8.8725C4.92625 9.135 4.865 9.3975 4.83 9.66C4.795 9.9225 4.7775 10.2025 4.7775 10.5C4.7775 10.78 4.795 11.0512 4.83 11.3137C4.865 11.5762 4.92625 11.8387 5.01375 12.1012L2.75625 13.8075L3.78 15.5925L6.37875 14.49C6.76375 14.8925 7.1883 15.2295 7.6524 15.5012C8.1165 15.7727 8.61945 15.9782 9.16125 16.1175L9.5025 18.9ZM10.605 14.175C11.62 14.175 12.4862 13.8162 13.2037 13.0988C13.9212 12.3812 14.28 11.515 14.28 10.5C14.28 9.485 13.9212 8.61875 13.2037 7.90125C12.4862 7.18375 11.62 6.825 10.605 6.825C9.5725 6.825 8.7017 7.18375 7.9926 7.90125C7.2835 8.61875 6.9293 9.485 6.93 10.5C6.9307 11.515 7.28525 12.3812 7.99365 13.0988C8.70205 13.8162 9.5725 14.175 10.605 14.175Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => {
                      navigate("/settingandconfi");
                      setSideBaroption("settingandconfi");
                    }}
                    className={`text-custom-16 ${sideBarOption == "settingandconfi"
                      ? "text-[#e7edf4]"
                      : "text-[#909294]"
                      }  hover:text-[#e7edf4] ml-2`}>
                    Settings & Config
                  </span>
                </div>
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between text-custom-16 text-[#909294] hover:text-[#e7edf4] lg:2xl px-4 py-2">
                <div className=" flex mr-14">
                  <span className="ml-[-10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M16 17l5-5-5-5M21 12H9" />
                      <path d="M9 21H4a2 2 0 01-2-2V5a2 2 0 012-2h5" />
                    </svg>
                  </span>
                  <span
                    onClick={toggleModal}
                    className={`text-custom-16 ${sideBarOption == "logout"
                      ? "text-[#e7edf4]"
                      : "text-[#909294]"
                      }  hover:text-[#e7edf4] ml-2`}>
                    Logout
                  </span>
                </div>
              </Disclosure.Button>
            </>
          )}
        </Disclosure>

        {/* <Modal
          isVisible={isModalVisible}
          onClose={toggleModal}
          modalHeader={"Are you you want to logout?"}>
          <button
            onClick={() => handleLogout()}
            type="button"
            className="bg-gray-200 p-3 w-full flex justify-center items-center mb-4 border border-gray-500 ">
            logout
          </button>
        </Modal> */}
        <Modal isVisible={isModalVisible} onClose={toggleModal}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              padding: '20px',
              maxWidth: '400px',
              margin: 'auto',
              position: 'relative',
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px',
              }}
            >
              Are you sure you want to Logout?
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  border: '2px solid #34d399', // Green border
                  color: '#34d399', // Green text
                  backgroundColor: 'transparent',
                  fontWeight: '600',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#34d399')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                No
              </button>
              <button
                onClick={() => handleLogout()}
                type="button"
                style={{
                  backgroundColor: '#f87171', // Red background
                  color: '#fff',
                  fontWeight: '600',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#ef4444')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#f87171')}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </Transition>
  );
}

export default Sidebar;
