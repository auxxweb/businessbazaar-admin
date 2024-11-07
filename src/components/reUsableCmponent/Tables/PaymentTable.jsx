import React from 'react'
import moment from 'moment'
import Loader from '../../Loader/Loader';

// Premium Loader Componen

const PaymentTable = ({ tableData, loading }) => {
  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      {/* Conditionally show loading spinner */}
      {loading ? (
        <Loader />
         // Show premium loader when loading
      ) : (
        <table className="min-w-full table-auto mt-6">
          <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
            <tr>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Business
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Email
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Plan
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Amount
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Payment Status
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Date
              </th>
              <th className="px-4 py-4 text-left border-r border-gray-400">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((payment, index) => (
                <tr
                  key={index}
                  className="odd:bg-teal-100 even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                >
                  <td className="px-4 py-2 border-r border-gray-400">
                    {payment?.business?.businessName}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    {payment?.business?.email}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    {payment?.plan?.plan}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    {payment?.plan?.amount}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    {payment?.paymentStatus}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                    {moment(payment?.date).format('DD/MM/YYYY')}
                  </td>
                  <td
                    className={`px-4 py-2 border-r border-gray-400 rounded-md text-center ${
                      moment(payment?.expiryDate).isBefore(moment())
                        ? 'text-red-600 bg-red-100 font-semibold'
                        : 'text-green-600 bg-green-100 font-semibold'
                    }`}
                  >
                    {moment(payment?.expiryDate).format('DD/MM/YYYY')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No matching plan data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PaymentTable
