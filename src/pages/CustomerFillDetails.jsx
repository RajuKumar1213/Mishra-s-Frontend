import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { set, useForm } from "react-hook-form";
import customerService from "../services/customerService";
import { Button, Container, Input } from "../components";

function CustomerFillDetailsPage() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFillDetails = async (data) => {
    setLoading(true);
    setError("");

    customerService
      .fillCustomerDetails(data)
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success("Profile details filled successfully!");
          navigate("/customer-profile");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = extractErrorMessage(error);
        setError(errorMessage);
        toast.error(errorMessage);
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
          className="grid gap-6 bg-white backdrop-blur-md p-6 rounded-lg border border-[#10B981]/20 shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            Complete Your Profile
          </h1>

          <div className="bg-white backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20 shadow-md">
            <p className="text-[#374151] font-medium font-inter">
              Verified email: <span className="text-[#10B981]">{email}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="md:col-span-2">
              <Input
                label="Address"
                name="address"
                placeholder="Enter your complete address"
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
                label="State"
                name="state"
                placeholder="Enter your state"
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
                placeholder="Enter your pin code"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#FF6F00] file:text-white
                      hover:file:bg-[#E65C00]"
                    {...register("customerAvatar", {
                      required: "Profile picture is required",
                    })}
                  />
                  {errors.customerAvatar && (
                    <span className="text-red-500 text-xs block mt-1">
                      {errors.customerAvatar.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="w-full md:w-1/2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <img src={spinner} alt="Loading" className="w-5 h-5 mr-2" />
                  Processing...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CustomerFillDetailsPage;
