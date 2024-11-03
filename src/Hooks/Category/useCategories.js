import { useEffect, useState } from "react";
import { getApi } from "../../api/api";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const limit = 10;

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const categoryList = await getApi(
        `category?page=${page}&limit=${limit}`,
        true
      );
      setCategories(categoryList.data.data);
      setTotalCategories(categoryList?.data?.totalCount);
    } catch (error) {
      toast.error("Fetch categories failed");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [page]);
  return { categories, loading, setPage, totalCategories, limit };
};

export default useCategories;
