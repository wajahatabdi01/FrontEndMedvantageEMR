import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import GetBrandList from "../../../../../API/KnowMedsAPI/GetBrandList";

export default function InfinityScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Adjust the number of options per page

  const loadOptions = async (inputValue, callback) => {
    // Simulate fetching options from your data source
    const startIndex = (currentPage - 1) * pageSize;
    const stopIndex = startIndex + pageSize;
    const newOptions = await GetBrandList(startIndex, stopIndex);

    setCurrentPage(currentPage + 1);

    // Pass the new options to the callback
    callback(newOptions);
  };

  const fetchMoreOptions = async (startIndex, stopIndex) => {
    // Fetch more options based on the startIndex and stopIndex
    // Replace this with your actual data fetching logic
    const newOptions = [];

    for (let i = startIndex; i < stopIndex; i++) {
      newOptions.push({ value: i, label: `Option ${i}` });
    }

    return newOptions;
  };

  return (
    <AsyncSelect
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      placeholder="Search..."
    />
  );
}
