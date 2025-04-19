import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    otp: "",
  });

  const [step, setStep] = useState(1); // Step 1: Enter Details, Step 2: OTP Verification
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (formData.phone && formData.name && formData.email) {
      console.log("Sending OTP to:", formData.phone);
      setOtpSent(true);
      setStep(2);
      // Simulate OTP sent (you can integrate with an actual OTP service here)
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp === "1234") {
      // Simulate OTP verification
      console.log("OTP Verified");
      navigate("/services"); // Redirect to the company services page
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">
          Customer Login
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="grid gap-4">
            <Input
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Button onClick={() => setStep(2)} type="submit">
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="grid gap-4">
            <div className="text-gray-500 text-sm bg-gray-100 p-3 rounded-xl border border-gray-300">
              Phone Number: {formData.phone}
            </div>
            <Input
              type="text"
              name="otp"
              label="Enter OTP"
              placeholder="Enter the OTP sent to your phone"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <Button
              onClick={() => {
                navigate("/services");
                window.scrollTo(0, 0);
              }}
              type="submit"
            >
              Verify OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
//   const [dashboardData, setDashboardData] = useState({
//     cas: [
//       { id: 1, name: "CA John Doe", rating: 4.8 },
//       { id: 2, name: "CA Jane Smith", rating: 4.5 },
//     ],
//     customers: [
//       { id: 1, name: "Customer A", task: "Tax Filing" },
//       { id: 2, name: "Customer B", task: "Company Registration" },
//     ],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (
//       formData.email === "admin@company.com" &&
//       formData.password === "password123"
//     ) {
//       // Simulate login
//       console.log("Login successful");
//       setIsLoggedIn(true);
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   const handleAssignTask = (customerId, caId) => {
//     console.log(`Assigned task of Customer ID ${customerId} to CA ID ${caId}`);
//     alert(`Task assigned successfully!`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4 py-10">
//       {!isLoggedIn ? (
//         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//           <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">
//             Company Login
//           </h2>
//           <form onSubmit={handleLogin} className="grid gap-4">
//             <Input
//               type="email"
//               name="email"
//               label="Email Address"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="password"
//               name="password"
//               label="Password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <Button type="submit">Login</Button>
//           </form>
//         </div>
//       ) : (
//         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl">
//           <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">
//             Company Dashboard
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* CA/CS List */}
//             <div>
//               <h3 className="text-2xl font-semibold text-[#1A237E] mb-4">
//                 CA/CS List
//               </h3>
//               <ul className="space-y-4">
//                 {dashboardData.cas.map((ca) => (
//                   <li
//                     key={ca.id}
//                     className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
//                   >
//                     <span>
//                       {ca.name} (Rating: {ca.rating})
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Customer List */}
//             <div>
//               <h3 className="text-2xl font-semibold text-[#1A237E] mb-4">
//                 Customer List
//               </h3>
//               <ul className="space-y-4">
//                 {dashboardData.customers.map((customer) => (
//                   <li
//                     key={customer.id}
//                     className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
//                   >
//                     <span>
//                       {customer.name} - {customer.task}
//                     </span>
//                     <select
//                       className="border border-gray-300 rounded-lg p-2"
//                       onChange={(e) =>
//                         handleAssignTask(customer.id, e.target.value)
//                       }
//                     >
//                       <option value="">Assign to CA/CS</option>
//                       {dashboardData.cas.map((ca) => (
//                         <option key={ca.id} value={ca.id}>
//                           {ca.name}
//                         </option>
//                       ))}
//                     </select>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export { CustomerLogin };
