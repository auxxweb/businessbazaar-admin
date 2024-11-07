import React, { useState } from "react";
import usePayment from "../../Hooks/Payment/usePayment";
import PaymentTable from "../reUsableCmponent/Tables/PaymentTable";
import Pagination from "../Pagination";
import "../reUsableCmponent/Tables/paymentTable.css"

const PaymentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { payments, loading, totalPayments } = usePayment({
    page,
    limit,
    searchTerm: search
  });

  const handleSearch = () => {
    setSearch(searchTerm);
  };
  const handleInputChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Payment Details
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 rounded-lg p-4 pt-0">
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
              className="cursor-pointer bg-[#105193] hover:bg-[#107D93] text-white p-2 lg:w-[100px] text-center rounded-3xl">
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="p-2">
        <PaymentTable tableData={payments} loading={loading} />
      </div>
      <div className="m-auto flex justify-end mt-8">
        <Pagination
          totalItems={totalPayments}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PaymentPage;
