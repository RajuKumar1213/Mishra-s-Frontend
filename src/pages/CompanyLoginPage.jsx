import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [dashboardData, setDashboardData] = useState({
    cas: [
      { id: 1, name: "CA John Doe", rating: 4.8 },
      { id: 2, name: "CA Jane Smith", rating: 4.5 },
      { id: 3, name: "CS Michael Brown", rating: 4.7 },
      { id: 4, name: "CA Emily Davis", rating: 4.6 },
      { id: 5, name: "CS Sarah Wilson", rating: 4.9 },
      { id: 6, name: "CA David Johnson", rating: 4.4 },
      { id: 7, name: "CS Olivia Martinez", rating: 4.3 },
      { id: 8, name: "CA Daniel Garcia", rating: 4.2 },
    ],
    customers: [
      { id: 1, name: "Customer A", task: "Tax Filing" },
      { id: 2, name: "Customer B", task: "Company Registration" },
      { id: 3, name: "Customer C", task: "GST Filing" },
      { id: 4, name: "Customer D", task: "Income Tax Return" },
      { id: 5, name: "Customer E", task: "Audit Services" },
      { id: 6, name: "Customer F", task: "Business Incorporation" },
      { id: 7, name: "Customer G", task: "Trademark Registration" },
      { id: 8, name: "Customer H", task: "Financial Planning" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      formData.email === "admin@company.com" &&
      formData.password === "password123"
    ) {
      // Simulate login
      console.log("Login successful");
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleAssignTask = (customerId, caId) => {
    console.log(`Assigned task of Customer ID ${customerId} to CA ID ${caId}`);
    alert(`Task assigned successfully!`);
  };

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Subtle Background Pattern */}

      {!isLoggedIn ? (
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#10B981]/20">
          <h2 className="text-3xl font-bold text-[#374151] mb-6 text-center font-poppins drop-shadow-md">
            Company Login
          </h2>
          <form onSubmit={handleLogin} className="grid gap-4">
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
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button onClick={() => setIsLoggedIn(true)} type="submit">
              Login
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-5xl border border-[#10B981]/20">
          <h2 className="text-3xl font-bold text-[#374151] mb-6 text-center font-poppins drop-shadow-md">
            Company Dashboard
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* CA/CS List */}
            <div>
              <h3 className="text-2xl font-semibold text-[#374151] mb-4 font-poppins">
                CA/CS List
              </h3>
              <ul className="space-y-4">
                {dashboardData.cas.map((ca) => (
                  <li
                    key={ca.id}
                    className="p-4 bg-white/50 backdrop-blur-md text-[#374151] rounded-lg shadow-md border border-[#10B981]/20"
                  >
                    <span>
                      {ca.name} (Rating: {ca.rating})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer List */}
            <div>
              <h3 className="text-2xl  font-semibold text-[#374151] mb-4 font-poppins">
                Customer List
              </h3>
              <ul className="space-y-4">
                {dashboardData.customers.map((customer) => (
                  <li
                    key={customer.id}
                    className="p-4 bg-white/50 backdrop-blur-md text-[#374151] rounded-lg shadow-md border border-[#10B981]/20 flex justify-between items-center"
                  >
                    <span>
                      {customer.name} - {customer.task}
                    </span>
                    <select
                      className="border border-gray-300 rounded-lg p-2"
                      onChange={(e) =>
                        handleAssignTask(customer.id, e.target.value)
                      }
                    >
                      <option value="">Assign to CA/CS</option>
                      {dashboardData.cas.map((ca) => (
                        <option key={ca.id} value={ca.id}>
                          {ca.name}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLogin;
