import { useState, useEffect } from "react";

const PaginationDropdown = ({ businesses, selectProfession }) => {
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter businesses based on the search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBusinesses(businesses.slice(0, currentPage * 10));
    } else {
      const filtered = businesses.filter((business) =>
        business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBusinesses(filtered.slice(0, currentPage * 10));
    }
  }, [searchQuery, businesses, currentPage]);

  // Handle scroll for infinite scroll functionality
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Simulate fetching more businesses (you'd replace this with actual API calls)
  useEffect(() => {
    if (loading) {
      // Mock async fetching more businesses
      setTimeout(() => {
        setLoading(false);
        if (filteredBusinesses.length >= businesses.length) {
          setHasMore(false);
        }
      }, 1000);
    }
  }, [loading, filteredBusinesses, businesses]);

  return (
    <div className="lg:w-[300px] w-full">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search Categories"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 rounded focus:ring-indigo-500 focus:border-indigo-500"
      />

      <select
        value={selectedDesignation}
        onChange={selectProfession}
        className="w-full p-2 appearance-none bg-white border border-gray-500 rounded focus:ring-indigo-500 focus:border-indigo-500 pr-10"
        onScroll={handleScroll}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
          backgroundPosition: "right 10px center",
          backgroundRepeat: "no-repeat"
        }}>
        <option value="">All Categories</option>
        {filteredBusinesses?.map((business) => (
          <option key={`index-${business?.id}`} value={business?._id}>
            {business?.businessName}
          </option>
        ))}
        {loading && <option>Loading...</option>}
        {!hasMore && <option>No more results</option>}
      </select>
    </div>
  );
};

export default PaginationDropdown;
