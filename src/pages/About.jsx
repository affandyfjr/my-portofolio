import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../service/firebase";

const About = () => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchImageURL = async () => {
      const imageRef = ref(storage, "skill/tercinta.webp");
      const url = await getDownloadURL(imageRef);
      console.log("image URL:", url);
      setImageURL(url);
    };
    fetchImageURL();
  }, []);

  return (
    <section
      id="about"
      className="p-8 mt-16 rounded-2xl bg-gray-100/90 dark:bg-gray-800/90"
    >
      <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        {imageURL ? (
          <img
            src={imageURL}
            alt="ciluk baa"
            className="w-96 h-96 rounded-full shadow-2xl shadow-black dark:shadow-white "
          />
        ) : (
          <p>Loading gambar ee..</p>
        )}

        <p className="p-20 font-semibold text-xl text-center md:text-left text-gray-700 dark:text-gray-300">
          Hello! I'm Fajar Affandi, a web developer with a passion for building
          creative and functional websites. With experience in modern
          technologies like React, Firebase, and TailwindCSS, I aim to deliver
          user-friendly and elegant solutions.
        </p>
      </div>
    </section>
  );
};

export default About;
