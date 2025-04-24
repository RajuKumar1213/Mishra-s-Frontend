import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto text-center md:text-left">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            DropHeaven
          </h3>
          <p className="text-sm">
            Professional tax and financial consulting services for businesses
            and individuals.
          </p>
          <div className="flex space-x-4 justify-center md:justify-normal">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Our Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Tax Planning
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Audit & Assurance
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                GST Consulting
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Company Formation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Financial Advisory
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-1 text-cyan-400" />
              <p>123 Financial District, Mumbai, Maharashtra 400001</p>
            </div>
            <div className="flex items-center space-x-3 justify-center md:justify-normal">
              <FaPhone className="text-cyan-400" />
              <a
                href="tel:+911234567890"
                className="hover:text-cyan-400 transition-colors"
              >
                +91 12345 67890
              </a>
            </div>
            <div className="flex items-center space-x-3 justify-center md:justify-normal">
              <FaEnvelope className="text-cyan-400" />
              <a
                href="mailto:info@droptax.com"
                className="hover:text-cyan-400 transition-colors"
              >
                info@dropheaven.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DropHeaven. All rights reserved.
          </p>
          <div className="text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
