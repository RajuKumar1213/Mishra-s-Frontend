import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { useForm } from "react-hook-form";
import professionalService from "../services/professionalService";
import { Button, Container, Input } from "../components";
import { useLocation } from "react-router-dom";

function ProfessionalFillDetailsPage() {
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
    professionalService
      .fillProfDetails(data)
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success("Details filled successfully!");
          navigate("/professional-panel");
        } else {
          const message = extractErrorMessage(response);
          toast.error(message);
        }
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        toast.error("Something went wrong: " + message);
        console.error("Error filling details:", message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="mx-auto p-6" width="max-w-4xl">
      <div>
        <form
          onSubmit={handleSubmit(handleFillDetails)}
          className="grid gap-6 bg-white backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20 shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            Fill Your Professional Details
          </h1>
          <div className="bg-white backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20 shadow-md">
            <p className="text-[#374151] font-medium font-inter">
              Verified email: <span className="text-[#10B981]">{email}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <Input
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Full name is required",
                })}
                required
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format",
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
                label="Specialization"
                name="specialization"
                placeholder="Enter your specialization"
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                required
              />
              {errors.specialization && (
                <span className="text-red-500 text-xs">
                  {errors.specialization.message}
                </span>
              )}
            </div>

            <div>
              <Input
                label="State"
                name="state"
                {...register("state", {
                  required: "State is required",
                })}
                placeholder="Enter your state"
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
                label="Region"
                name="region"
                placeholder="Enter your region"
                {...register("region", {
                  required: "Region is required",
                })}
              />
            </div>

            <div>
              <Input
                label="Address"
                name="address"
                placeholder="Enter your address"
                {...register("address", {
                  required: "Address is required",
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
                placeholder="Enter your city"
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
                label="Pin Code"
                name="pinCode"
                placeholder="Enter your pin code"
                {...register("pinCode", {
                  required: "Pin code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid pin code format",
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
                label="Years of Experience"
                name="experience"
                type="number"
                placeholder="Enter your years of experience"
                {...register("experience", {
                  required: "Years of experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                required
              />
              {errors.experience && (
                <span className="text-red-500 text-xs">
                  {errors.experience.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#374151] border-b pb-2 font-poppins">
              Document Upload
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#374151]">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <Input
                      type="file"
                      name="avatar"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("avatar", {
                        required: "Profile picture is required",
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#374151]">
                  Aadhaar Card
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <Input
                      type="file"
                      name="aadhaar"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("addharCard", {
                        required: "Aadhaar card is required",
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#374151]">
                  PAN Card
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <Input
                      type="file"
                      name="pan"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                      {...register("panCard", {
                        required: "PAN card is required",
                      })}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" className="w-full ">
              {loading && <img src={spinner} />} Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ProfessionalFillDetailsPage;
