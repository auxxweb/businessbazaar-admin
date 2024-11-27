import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi, postApi, deleteApi, patchApi } from "../../api/api";

const useBanner = ({ page = 1, limit = 10 }) => {
  const [banners, setBanners] = useState([]);
  const [trashBanners, setTrashBanners] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalBanners, setTotalBanners] = useState(0);
  const [trashTotalBanners, setTrashTotalBanners] = useState(0);
  // Fetch banners with pagination and search term
  const getBannersData = async () => {
    setLoading(true);
    try {
      const response = await getApi(`banner?page=${page}&limit=${limit}`, true);
      setBanners(response?.data?.data);
      setTotalBanners(response?.data?.totalCount); // Assuming 'totalCount' gives total number of items
    } catch (error) {
      toast.error("Failed to fetch banner details");
      console.error("Error fetching banner details:", error);
    } finally {
      setLoading(false);
    }
  };


  const getTrashBannersData = async () => {
    setLoading(true);
    try {
      const response = await getApi(`banner/trash-banner?page=${page}&limit=${limit}`, true);
      setTrashBanners(response?.data?.data);
      setTrashTotalBanners(response?.data?.totalCount); // Assuming 'totalCount' gives total number of items
    } catch (error) {
      toast.error("Failed to fetch banner details");
      console.error("Error fetching banner details:", error);
    } finally {
      setLoading(false);
    }
  };


  // Create a new banner
  const createBanner = async (bannerData) => {
    try {
      const response = await postApi({ url: "banner", body: bannerData }, true);
      toast.success("Banner created successfully");
      setBanners((prev) => [...prev, response?.data]);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error creating banner:", error);
    }
  };

  // Update an existing banner
  const updateBanner = async (bannerId, updatedData) => {
    try {
      await patchApi({ url: `banner/${bannerId}`, body: updatedData }, true);
      toast.success("Banner updated successfully");
      setBanners((prev) =>
        prev.map((banner) =>
          banner._id === bannerId ? { ...banner, ...updatedData } : banner
        )
      );
    } catch (error) {
      toast.error("Failed to update banner");
      console.error("Error updating banner:", error);
    }
  };

  // Delete a banner
  const deleteBanner = async (bannerId) => {
    try {
      await deleteApi(`banner/${bannerId}`, true);
      toast.success("Banner deleted successfully");
      setBanners((prev) => prev.filter((banner) => banner._id !== bannerId));
      setTotalBanners((prevTotal) => prevTotal - 1);
    } catch (error) {
      toast.error("Failed to delete banner");
      console.error("Error deleting banner:", error);
    }
  };

  useEffect(() => {
    getBannersData();
  }, [page, limit]);

  useEffect(() => {
    getTrashBannersData();
  }, [page, limit]);


  return {
    banners,
    getTrashBannersData,
    trashBanners,
    trashTotalBanners,
    loading,
    totalBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    getBannersData
  };
};

export default useBanner;
