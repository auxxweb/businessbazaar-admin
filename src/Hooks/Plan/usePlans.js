import { useEffect, useState } from "react";
import { getApi } from "../../api/api";
import { toast } from "react-toastify";

const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPlans, setTotalPlans] = useState(0)
  const limit = 10;

  const getAllPlans = async () => {
    setLoading(true);
    try {
      const plansData = await getApi(
        `plans?page=${page}&limit=${limit}`,
        true
      );
      setPlans(plansData.data.data);
      setTotalPlans(plansData?.data?.totalCount)
    } catch (error) {
      toast.error("Fetch plans failed");
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, [page]);
  return { plans, loading, setPage, totalPlans, limit };
};

export default usePlans;
