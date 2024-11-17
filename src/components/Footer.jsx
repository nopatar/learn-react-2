
const Footer = () => {
  return (
    <footer className="p-4 bg-slate-900 text-white">
      <div className="flex justify-between items-center">
        <div>
          &#169; {`${new Date().getFullYear()} - Learn { useState, useRef } from "react"`}
        </div>
        <span className="ml-auto">v.1</span>
      </div>
    </footer>
  );
};

export default Footer;

 