import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../api/api";

const usePayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPaymentsData = async () => {
    setLoading(true);
    try {
      const response = await getApi(`payment`, true);
      setPayments(response.data);
    } catch (error) {
      toast.error("Fetch payment details failed");
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getPaymentsData()
  },[])

  return { payments };
};

export default usePayment;
