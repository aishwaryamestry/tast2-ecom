import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const FilterSidebar = ({ categories, filters, setFilters, onClearFilters }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((cat) => cat !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (min, max) => {
    setFilters({ ...filters, price: { min, max } });
  };

  const handleRatingsChange = (rating) => {
    setFilters({ ...filters, ratings: rating });
  };

  // Persist filters in local storage
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl max-h-full">
      <h2 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
        Filters
      </h2>
      <button onClick={onClearFilters} className="text-red-500 underline mt-2">
        Clear Filters
      </button>

      {/* Categories */}
      <div className="mt-4">
        <h3
          className="cursor-pointer flex items-center justify-between"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          Categories
          <span
            className={`transform transition-transform ${
              isCategoriesOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </h3>
        {isCategoriesOpen && (
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <label key={category} className="block">
                <input
                  type="checkbox"
                  id={category}
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mt-4 ">
        <h3>Price Range</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 md:gap-2 dark:text-black">
          <input
            type="number"
            className="w-20 p-1 border rounded"
            placeholder="Min"
            value={filters.price.min}
            onChange={(e) =>
              handlePriceChange(Number(e.target.value), filters.price.max)
            }
          />
          <input
            type="number"
            className="w-20 p-1 border rounded "
            placeholder="Max"
            value={filters.price.max}
            onChange={(e) =>
              handlePriceChange(filters.price.min, Number(e.target.value))
            }
          />
        </div>
      </div>

      {/* Ratings */}
      <div className="mt-4 ">
        <h3>Ratings</h3>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label
              key={rating}
              className={`flex items-center space-x-1 cursor-pointer ${
                filters.ratings >= rating ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => handleRatingsChange(rating)}
            >
              <FaStar />
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-4">
        <button
          onClick={() => setFilters(filters)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
