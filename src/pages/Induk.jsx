// import React from "react";
// import Navbar from "../components/Navbar";

// import Home from "./Home";
// import About from "./About";
// import SkillComponent from "./Skill";
// import Projects from "./Project";
// import Contact from "../pages/Contact";
// import Footer from "./Footer";

// const Induk = () => {
//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//       <Navbar />
//       <Home />
//       <div className="tengah md:mx-36 space-y-14">
//         <About />
//         <SkillComponent />
//         <Projects />
//         <Contact />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Induk;
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";
import About from "./About";
import SkillComponent from "./Skill";
import Projects from "./Project";
import Contact from "../pages/Contact";
import Footer from "./Footer";

const Induk = () => {
  useEffect(() => {
    const container = document.querySelector(".tengah");

    const generateRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const addStroke = (x, y) => {
      const size = Math.floor(Math.random() * 50) + 20; // Ukuran acak antara 20px hingga 70px
      const stroke = document.createElement("div");
      stroke.className = "watercolor-stroke";
      stroke.style.width = `${size}px`;
      stroke.style.height = `${size}px`;
      stroke.style.left = `${x - size / 2}px`; // Offset agar lingkaran pas di tengah kursor
      stroke.style.top = `${y - size / 2}px`; // Offset agar lingkaran pas di tengah kursor
      stroke.style.background = `radial-gradient(circle, ${generateRandomColor()} 0%, rgba(255, 255, 255, 0) 100%)`;
      container.appendChild(stroke);

      setTimeout(() => {
        stroke.style.opacity = "0";
        stroke.style.transform = `scale(${Math.random() * 1.5 + 1})`; // Skalasi acak untuk animasi
      }, 10);

      setTimeout(() => {
        container.removeChild(stroke);
      }, 1500);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addStroke(x, y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <Home />
      <div className="tengah">
        <div className=" md:mx-36 space-y-14 relative overflow-hidden">
          <About />
          <SkillComponent />
          <Projects />
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Induk;
