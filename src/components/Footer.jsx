import React from "react";

function Footer() {
  return (
    <footer className="bg-[#1A237E] text-white text-center py-4 mt-auto">
      <p>
        &copy; {new Date().getFullYear()} ProTaxAssist. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
