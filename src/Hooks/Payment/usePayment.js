import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../api/api";

const usePayment = ({page = 1, limit = 10, searchTerm = ""}) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);

  // Function to get payments data with pagination and search term
  const getPaymentsData = async () => {
    setLoading(true);
    try {
      const response = await getApi(
        `payment?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        true
      );
      console.log(response, "table-response");

      setPayments(response?.data?.data);
      setTotalPayments(response?.data?.totalCount); // Assuming 'totalCount' gives total number of items
    } catch (error) {
      toast.error("Failed to fetch payment details");
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentsData();
  }, [page, limit, searchTerm]); 

  return { payments, loading, totalPayments, };
};

export default usePayment;
