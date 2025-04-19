import React, { useState } from "react";

const CacsPannelPage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    profilePicture: null,
    documents: [],
    assignedCustomers: [
      { id: 1, name: "John Doe", workDetails: "Tax Filing" },
      { id: 2, name: "Jane Smith", workDetails: "Audit Report" },
    ],
    name: "John CA",
    email: "johnca@example.com",
    state: "California",
    qualifications: "CA, CPA",
    experience: "5",
  });

  const handleProfileUpdate = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setProfile({ ...profile, profilePicture: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSaveChanges = () => {
    console.log("Profile updated:", profile);
    setIsEditingProfile(false);
    // Send updated profile to backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsEditingProfile(true)}
          className="bg-[#FF6F00] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#e65c00] transition-all"
        >
          Edit Profile
        </button>
        <h2 className="text-3xl font-bold text-[#1A237E]">CA/CS Panel</h2>
      </div>

      {isEditingProfile ? (
        <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2 flex flex-col items-center">
              <img
                src={
                  profile.profilePicture
                    ? URL.createObjectURL(profile.profilePicture)
                    : "default-profile.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300"
              />
              <input
                type="file"
                name="profilePicture"
                onChange={handleProfileUpdate}
                className="mb-4 text-gray-800"
              />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={profile.name}
              onChange={handleProfileUpdate}
              className="p-2 border rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleProfileUpdate}
              className="p-2 border rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={profile.state}
              onChange={handleProfileUpdate}
              className="p-2 border rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              value={profile.qualifications}
              onChange={handleProfileUpdate}
              className="p-2 border rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={profile.experience}
              onChange={handleProfileUpdate}
              className="p-2 border rounded bg-gray-700 text-white"
            />

            <div className="md:col-span-2">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-[#FF6F00] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#e65c00] transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Assigned Customers</h3>
          <ul className="list-disc pl-5 text-gray-800">
            {profile.assignedCustomers.map((customer) => (
              <li key={customer.id} className="mb-4">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                  <div>
                    <p className="font-bold text-lg">{customer.name}</p>
                    <p className="text-sm text-gray-600">
                      {customer.workDetails}
                    </p>
                  </div>
                  <button className="bg-[#FF6F00] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#e65c00] transition-all">
                    Start Work
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CacsPannelPage;
