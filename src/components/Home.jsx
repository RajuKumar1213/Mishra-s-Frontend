import React from "react";
import Container from "./Container";
import KeyFeatures from "./KeyFeatures"; // Import the new component

const Home = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col">
      <Container width="max-w-7xl">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-7xl mx-auto gap-12">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-[#1A237E] mb-4">
              Legal & Financial Services. Simplified.
            </h2>
            <p className="text-lg text-[#333333] mb-6">
              Seamless coordination between customers, CAs, and CSs. Task
              assignment, progress tracking, and secure document handling – all
              under one roof.
            </p>
            <div className="space-x-4">
              <a
                href="#customer-login"
                className="bg-[#FF6F00] hover:bg-[#e65c00] text-white py-2 px-5 rounded-xl transition-all shadow-md"
              >
                Get Started
              </a>
              <a href="#learn-more" className="text-[#1A237E] underline">
                Learn More
              </a>
            </div>
          </div>

          {/* Image or Illustration */}
          <div className="flex-1">
            <img
              src="https://cdn.pixabay.com/photo/2021/10/04/12/15/business-6680123_1280.png"
              alt="Professional Services"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Key Features */}
      </Container>
      <KeyFeatures />
    </div>
  );
};

export default Home;
