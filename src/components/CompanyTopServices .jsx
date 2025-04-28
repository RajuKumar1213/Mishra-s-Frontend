import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Building,
  FileCheck,
  Award,
  Globe,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyTopServices = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(249, 115, 22, 0.2)",
      borderColor: "#f97316",
    },
  };

  // Service categories data
  const serviceCategories = [
    {
      categoryName: "REGISTRATION SERVICES",
      categoryDescription: "Services related to various registrations",
      icon: <FileCheck className="w-8 h-8 text-orange-500" />,
      services: [
        {
          name: "SECTION 8 REGISTRATION",
          description: "Registration for Section 8 company",
          icon: <Building className="w-6 h-6" />,
        },
        {
          name: "SOCIETY REGISTRATION",
          description: "Registration for society",
          icon: <Users className="w-6 h-6" />,
        },
        {
          name: "TRUST REGISTRATION",
          description: "Registration for trust",
          icon: <Award className="w-6 h-6" />,
        },
      ],
    },
    {
      categoryName: "COMPANY SERVICES",
      categoryDescription: "Other registration services",
      icon: <Building className="w-8 h-8 text-orange-500" />,
      services: [
        {
          name: "NGO DARPAN (NITI AYOG)",
          description: "Registration on NGO Darpan portal",
          icon: <Globe className="w-6 h-6" />,
        },
        {
          name: "RNI REGISTRATION",
          description: "Registration with Registrar of Newspapers for India",
          icon: <BookOpen className="w-6 h-6" />,
        },
        {
          name: "POLITICAL PARTY REGISTRATION",
          description:
            "Registration of political party with Election Commission",
          icon: <Users className="w-6 h-6" />,
        },
        {
          name: "E-ANUDAN REGISTRATION",
          description: "Registration for E-Anudan",
          icon: <FileCheck className="w-6 h-6" />,
        },
        {
          name: "STARTUP INDIA REGISTRATION",
          description: "Registration under Startup India scheme",
          icon: <Award className="w-6 h-6" />,
        },
        {
          name: "FCRA REGISTRATION",
          description: "Registration under Foreign Contribution Regulation Act",
          icon: <Globe className="w-6 h-6" />,
        },
      ],
    },
  ];

  // Navigate to service details page
  const handleServiceClick = (categoryName, serviceName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    const formattedService = serviceName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${formattedCategory}/${formattedService}`);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg sm:text-xl text-orange-600 max-w-3xl mx-auto">
            Comprehensive business and registration solutions tailored to meet
            your unique requirements
          </p>
        </div>

        <motion.div
          className="space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              className="mb-16"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-8">
                <div className="bg-orange-100 p-4 rounded-full">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
                    {category.categoryName}
                  </h3>
                  <p className="text-orange-600 mt-1 text-center sm:text-left">
                    {category.categoryDescription}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden cursor-pointer transition-all duration-300"
                    variants={serviceVariants}
                    whileHover="hover"
                    onClick={() =>
                      handleServiceClick(category.categoryName, service.name)
                    }
                    onMouseEnter={() =>
                      setHoveredService(`${categoryIndex}-${serviceIndex}`)
                    }
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-orange-100 p-3 rounded-lg text-orange-500">
                          {service.icon}
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            hoveredService ===
                            `${categoryIndex}-${serviceIndex}`
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.8 }
                          }
                          className="bg-orange-500 text-white p-2 rounded-full"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">
                        {service.name}
                      </h4>
                      <p className="text-gray-600">{service.description}</p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          hoveredService === `${categoryIndex}-${serviceIndex}`
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        className="mt-6"
                      >
                        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center w-full">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyTopServices;
