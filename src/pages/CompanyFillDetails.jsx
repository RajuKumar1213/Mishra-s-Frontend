import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Button, Input } from "../components";
import { useForm } from "react-hook-form";
import companyService from "../services/companyService";
import spinner from "/spinner.svg";

const CompanyFillDetails = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFillDetails = async (data) => {
    setLoading(true);

    try {
      const response = await companyService.fillCompanyDetails(data);
      if (response.statusCode === 200) {
        toast.success("Company details saved successfully!");
        navigate("/company/dashboard");
      } else {
        toast.error("Failed to save company details");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error saving company details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-[#10B981]/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#FF6F00]/10 p-4 rounded-full">
              <FaBuilding className="text-3xl text-[#FF6F00]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#374151] font-poppins drop-shadow-md">
            Complete Company Profile
          </h2>
          <p className="text-[#374151] mt-2 font-inter">
            Please provide your company details to continue
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20 shadow-sm mb-6">
          <p className="text-[#374151] font-medium font-inter text-center">
            Registered email: <span className="text-[#FF6F00]">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFillDetails)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Company Address"
                name="address"
                icon={<FaMapMarkerAlt className="text-[#FF6F00]" />}
                placeholder="Enter company address"
                {...register("address", {
                  required: "Company address is required",
                })}
                required
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="City"
                name="city"
                icon={<FaMapMarkerAlt className="text-[#FF6F00]" />}
                placeholder="Enter city"
                {...register("city", {
                  required: "City is required",
                })}
                required
              />
              {errors.city && (
                <span className="text-red-500 text-xs">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="State"
                name="state"
                icon={<FaMapMarkerAlt className="text-[#FF6F00]" />}
                placeholder="Enter state"
                {...register("state", {
                  required: "State is required",
                })}
                required
              />
              {errors.state && (
                <span className="text-red-500 text-xs">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="Pin Code"
                name="pinCode"
                icon={<FaMapMarkerAlt className="text-[#FF6F00]" />}
                placeholder="Enter pin code"
                {...register("pinCode", {
                  required: "Pin code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid pin code format (6 digits required)",
                  },
                })}
                required
              />
              {errors.pinCode && (
                <span className="text-red-500 text-xs">
                  {errors.pinCode.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                icon={<FaPhone className="text-[#FF6F00]" />}
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format (10 digits required)",
                  },
                })}
                required
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="WhatsApp Number"
                name="watsappNumber"
                type="tel"
                icon={<FaWhatsapp className="text-[#FF6F00]" />}
                placeholder="Enter WhatsApp number"
                {...register("watsappNumber", {
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message:
                      "Invalid WhatsApp number format (10 digits required)",
                  },
                })}
                required
              />
              {errors.watsappNumber && (
                <span className="text-red-500 text-xs">
                  {errors.watsappNumber.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center"
            loading={loading}
          >
            {loading && <img src={spinner} />} Save Company Details
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanyFillDetails;
