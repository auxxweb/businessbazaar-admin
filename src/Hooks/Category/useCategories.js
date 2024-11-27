import { useEffect, useState } from "react";
import { getApi } from "../../api/api";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [trashCategories, setTrashCategories] = useState([]);

  const [trashTotalCategories,setTrashTotalCategories]=useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [search, setSearch] = useState(""); // New state for search query

  const limit = 10;

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const categoryList = await getApi(
        `category?page=${page}&limit=${limit}&searchTerm=${search}`,
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

  const getTrashCategories = async () => {
    setLoading(true);
    try {
      const categoryList = await getApi(
        `category/trash-category?page=${page}&limit=${limit}&searchTerm=${search}`,
        true
      );
      setTrashCategories(categoryList.data.data);
      setTrashTotalCategories(categoryList?.data?.totalCount);
    } catch (error) {
      toast.error("Fetch categories failed");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  


  useEffect(() => {
    getAllCategories();
  }, [page, search]); // Trigger fetch when page or search changes

  useEffect(() => {
    getTrashCategories();
  }, [page, search]); // Trigger fetch when page or search changes


  return {
    categories,
    trashCategories,
    trashTotalCategories,
    loading,
    setPage,
    totalCategories,
    limit,
    getAllCategories,
    setSearch,
    getTrashCategories // Expose setSearch to update search query
  };
};

export default useCategories;
