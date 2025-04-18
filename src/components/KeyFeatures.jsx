import React from "react";

const KeyFeatures = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-semibold text-[#1A237E] mb-10">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#F5F5F5] rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">
              State-wise CA/CS Login
            </h4>
            <p className="text-sm text-[#555]">
              Separate portals for every CA and CS based on their region.
              Role-specific access only.
            </p>
          </div>
          <div className="p-6 bg-[#F5F5F5] rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">
              Customer Progress Tracking
            </h4>
            <p className="text-sm text-[#555]">
              Customers can view real-time status updates as their work
              progresses through various stages.
            </p>
          </div>
          <div className="p-6 bg-[#F5F5F5] rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">CA Ranking System</h4>
            <p className="text-sm text-[#555]">
              Automatically rank CAs based on performance. Assign tasks
              intelligently and efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
