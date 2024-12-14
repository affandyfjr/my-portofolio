// import React from "react";

// const Home = () => {
//   return (
//     <section
//       id="hero"
//       className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-indigo-700 text-white text-center"
//     >
//       <h1 className="text-5xl font-bold">Hi, I'm Affandi Fajar</h1>
//       <p className="text-lg mt-4">A Passionate Web Developer & Designer</p>
//       <a
//         href="#about"
//         className="mt-8 px-6 py-3 bg-white text-blue-500 rounded shadow hover:bg-gray-200"
//       >
//         Learn More About Me
//       </a>
//     </section>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";

const CircleAnimation = () => {
  const [circles, setCircles] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Membuat lingkaran dengan posisi acak
    const generateCircles = () => {
      const tempCircles = Array.from({ length: 20 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 50 + 50, // Ukuran lingkaran antara 50-100px
      }));
      setCircles(tempCircles);
    };

    generateCircles();
    window.addEventListener("resize", generateCircles);

    return () => window.removeEventListener("resize", generateCircles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isCursorNear = (circle) => {
    const distance = Math.sqrt(
      Math.pow(circle.x - cursorPosition.x, 2) +
        Math.pow(circle.y - cursorPosition.y, 2)
    );
    return distance < 100; // Jarak di mana lingkaran mengecil
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full transition-all duration-300"
          style={{
            top: `${circle.y}px`,
            left: `${circle.x}px`,
            width: isCursorNear(circle) ? circle.size / 2 : circle.size,
            height: isCursorNear(circle) ? circle.size / 2 : circle.size,
            transform: "translate(-50%, -50%)",
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-indigo-700 text-white text-center relative overflow-hidden"
    >
      <CircleAnimation />
      <h1 className="text-5xl font-bold z-10 relative">
        Hi, I'm <span className="text-yellow-300">Affandi Fajar</span>
      </h1>
      <p className="text-lg mt-4 z-10 relative">
        A Passionate Web Developer & Designer
      </p>
      <a
        href="#about"
        className="mt-8 px-6 py-3 bg-white text-blue-500 rounded shadow hover:bg-gray-200 z-10 relative"
      >
        Learn More About Me
      </a>
    </section>
  );
};

export default Home;
