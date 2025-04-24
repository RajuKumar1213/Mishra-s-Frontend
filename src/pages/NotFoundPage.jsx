import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl p-8 bg-white bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-medium text-lg rounded-full hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
