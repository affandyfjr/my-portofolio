import React from "react";

const Footer = () => {
  return (
    <footer className="p-8 bg-gray-100 dark:bg-gray-700 rounded-2xl mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Navigasi */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#projects"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div className="mb-4 md:mb-0 text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            Follow Me
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://whatsaap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            Let's Connect
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} AffandyFajar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
