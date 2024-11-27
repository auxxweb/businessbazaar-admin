import { useEffect, useState } from "react";
import { getApi, patchApi, postApi } from "../../api/api";
import { toast } from "react-toastify";

const usePlans = (initialSearch = "") => {
  const [plans, setPlans] = useState([]);
  const [trashPlans, setTrashPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPlans, setTotalPlans] = useState(0);
  const [trashTotalPlans, setTrashTotalPlans] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [refetch, setRefetch] = useState(false);
  const limit = 10;

  const getAllPlans = async () => {
    setLoading(true);
    try {
      const plansData = await getApi(
        `plans?page=${page}&limit=${limit}&searchTerm=${encodeURIComponent(
          search
        )}`,
        true
      );
      setPlans(plansData?.data?.data);
      setTotalPlans(plansData?.data?.totalCount);
    } catch (error) {
      toast.error("Fetch plans failed");
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };


  const getTrashPlans = async () => {
    setLoading(true);
    try {
      const plansData = await getApi(
        `plans/trash-plans?page=${page}&limit=${limit}&searchTerm=${encodeURIComponent(
          search
        )}`,
        true
      );
      setTrashPlans(plansData?.data?.data);
      setTrashTotalPlans(plansData?.data?.totalCount);
    } catch (error) {
      toast.error("Fetch plans failed");
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };




  const getPlanById = async (planId) => {
    setLoading(true);
    try {
      const plansData = await getApi(`plans/${planId}`, true);

      setPlan(plansData?.data);
    } catch (error) {
      toast.error("Fetch plans failed");
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new plan
  const addPlan = async (newPlanData, modalToggle) => {
    console.log(newPlanData, "new-plan");

    setLoading(true);
    try {
      const response = await postApi({ url: "plans", body: newPlanData });
      const addedPlan = response?.data;
      console.log(addedPlan, "added-plans");

      if (addedPlan) {
        // Add the new plan to the plans list
        setPlans((prevPlans) => [addedPlan, ...prevPlans]);
        setTotalPlans((prevTotal) => prevTotal + 1);
        toast.success("Plan added successfully", {
          theme: "colored",
          style: {
            backgroundColor: "green", // Custom red color for error
            color: "#FFFFFF" // White text
          }
        });
        modalToggle();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "An error occurred. Please try again.",
        {
          theme: "colored",
          style: {
            backgroundColor: "#e74c3c", // Custom red color for error
            color: "#FFFFFF" // White text
          }
        }
      );
      console.error("Error adding plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const editPlan = async (planId = "", updatedPlanData = {}, modalToggle) => {
    setLoading(true);
    try {
      const response = await patchApi({
        url: `plans/${planId}`,
        body: updatedPlanData
      });
      const updatedPlan = response?.data;

      if (updatedPlan) {
        // Update the specific plan in the plans list
        setPlans((prevPlans) =>
          prevPlans.map((plan) => (plan._id === planId ? updatedPlan : plan))
        );
        toast.success("Plan updated successfully", {
          theme: "colored",
          style: {
            backgroundColor: "green",
            color: "#FFFFFF"
          }
        });
        modalToggle();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "An error occurred. Please try again.",
        {
          theme: "colored",
          style: {
            backgroundColor: "#e74c3c",
            color: "#FFFFFF"
          }
        }
      );
      console.error("Error updating plan:", error);
    } finally {
      setLoading(false);
    }
  };
  const deletePlan = async (planId, setShowDeletePopup) => {
    setLoading(true);
    try {
      const response = await patchApi({
        url: `plans/${planId}`,
        body: { isDeleted: true }
      });
      const updatedPlan = response?.data;

      if (updatedPlan) {
        setPlans((prevPlans) =>
          prevPlans.map((plan) =>
            plan._id === planId ? { ...plan, isDeleted: true } : plan
          )
        );
        setShowDeletePopup(false);
        setRefetch(!refetch);
        toast.success("Plan deleted successfully", {
          theme: "colored",
          style: {
            backgroundColor: "#1c980c",
            color: "#FFFFFF"
          }
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete plan. Please try again.",
        {
          theme: "colored",
          style: {
            backgroundColor: "#e74c3c",
            color: "#FFFFFF"
          }
        }
      );
      console.error("Error deleting plan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, [page, search, refetch]);


  useEffect(() => {
    getTrashPlans();
  }, [page, search, refetch]);


  return {
    plans,
    trashPlans,
    trashTotalPlans,
   
    loading,
    setPage,
    totalPlans,
    limit,
    search,
    setSearch,
    addPlan,
    getPlanById,
    plan,
    editPlan,
    deletePlan
  };
};

export default usePlans;
