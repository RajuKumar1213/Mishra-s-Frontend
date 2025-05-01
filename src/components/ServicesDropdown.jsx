import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ServicesBox from "./ServicesBox";
import serviceCatalogService from "../services/serviceCatalogService";
import spinner from "/spinner.svg";

function ServicesDropdown() {
  const [activeCategory, setActiveCategory] = useState("COMPANY SERVICES");
  const [serviceGroups, setServiceGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (categoryName) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await serviceCatalogService.getAllServices();
        if (response.statusCode === 200) {
          setServiceGroups(response.data); // [{ category, services }]
        }
      } catch (error) {
        console.error("API ERROR :: getAllServices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <img src={spinner} alt="Loading..." className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {serviceGroups.map((group, index) => (
        <div key={index} className="border-b last:border-none">
          <button
            onClick={() => toggleCategory(group.category)}
            className={`w-full px-4 py-3 text-left flex justify-between items-center transition-colors ${
              activeCategory === group.category
                ? "bg-gray-100"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <span className="font-medium text-sm sm:text-base text-gray-800">
              {group.category}
            </span>
            {activeCategory === group.category ? (
              <FiChevronUp className="text-gray-500" />
            ) : (
              <FiChevronDown className="text-gray-500" />
            )}
          </button>

          {activeCategory === group.category && (
            <div className="">
              <ServicesBox services={group.services} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ServicesDropdown;
