import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../api/api";

const useBusiness = (
  initialSearch = "",
  initialPage = 1,
  initialLimit = 10
) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const getBusinessData = async () => {
    setLoading(true);
    try {
      const response = await getApi(
        `business/dropdown?page=${page}&limit=${limit}&searchTerm=${encodeURIComponent(
          searchTerm
        )}`,
        true
      );
      console.log(response, "business-response");

      setBusinesses(response?.data?.data || []);
      setTotalBusinesses(response?.data?.totalCount || 0);
    } catch (error) {
      toast.error("Failed to fetch business details");
      console.error("Error fetching business details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessData();
  }, [page, limit, searchTerm]); // Refetch data on page, limit, or search term change

  return {
    businesses,
    loading,
    totalBusinesses,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    limit,
    setLimit
  };
};

export default useBusiness;
