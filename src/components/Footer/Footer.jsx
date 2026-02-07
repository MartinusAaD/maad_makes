import React from "react";
import { Link } from "react-router-dom";
import ResponsiveWidthWrapper from "../ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary mt-auto">
      <ResponsiveWidthWrapper>
        <div className="py-12">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Brand Section */}
            <div className="max-w-2xl space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-light">
                MAaD Makes
              </h3>
              <p className="text-light text-base leading-relaxed">
                Hi! My name is Martinus, I'm from Norway and the one behind MAaD
                Makes. I made this site for showcasing products I sell, and a
                place for me to display my frontend portfolio.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center gap-4 ">
              <a
                href="https://www.linkedin.com/in/martinus-aamot-dahl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className=""
              >
                <FaLinkedin
                  size={48}
                  className="text-blue-600 hover:text-blue-700 bg-light"
                />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-light mt-8 pt-8 space-y-2">
            <p className="text-light text-sm text-center">
              © {new Date().getFullYear()} MAaD Makes — All rights reserved.
              Martinus Aamot Dahl
            </p>
            <p className="text-light text-xs text-center italic">
              Product designs remain the property of their respective creators.
            </p>
          </div>
        </div>
      </ResponsiveWidthWrapper>
    </footer>
  );
};

export default Footer;
