import React, { act, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ServicesBox from "./ServicesBox";
import serviceCatalogService from "../services/serviceCatalogService";
import spinner from "/spinner.svg";

function ServicesDropdown() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle category dropdown
  const toggleCategory = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  // Fetching services grouped by category
  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await serviceCatalogService.getAllServices();
        if (response.statusCode === 200) {
          setServiceGroups(response.data); // expecting array of { category, services }
          setLoading(false);
        }
      } catch (error) {
        console.error("API ERROR :: getAllServices", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {serviceGroups.map((group, index) => (
        <div key={index}>
          <button
            onClick={() => toggleCategory(group.category)}
            className={`w-full p-4 text-left    transition-colors flex justify-between items-center ${
              activeCategory == group.category
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <h3 className="font-semibold text-gray-800">{group.category}</h3>
            {activeCategory === group.category ? (
              <FiChevronUp className="text-gray-500" />
            ) : (
              <FiChevronDown className="text-gray-500" />
            )}
          </button>

          {/* Show ServicesBox only if this category is active */}
          {loading ? (
            <img className="mx-auto" src={spinner} />
          ) : (
            activeCategory === group.category && (
              <ServicesBox services={group.services} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default ServicesDropdown;
