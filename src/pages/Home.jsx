import HeroSection from "../components/Home/Herosection.jsx";
import BlogSection from "../components/Home/Blogsection.jsx";
import AuthorSection from "../components/Home/Authorsection.jsx";
import React from "react";
import { Box } from "@mui/material";

const posts = [
  {
    title: "Exploring the Wonders of the Amazon Rainforest",
    description:
      "The Amazon Rainforest is a vast and vibrant ecosystem teeming with life, from exotic wildlife to towering trees. It plays a crucial role in regulating the Earth’s climate and is home to countless species found nowhere else on the planet.",
    author: "Sarah Green",
    date: "Jan 15, 2025",
    image:
      "https://cdn.pixabay.com/photo/2023/07/01/18/21/water-8100724_640.jpg",
  },
  {
    title: "A Journey Through the Grand Canyon’s Landscapes ",
    description:
      "The Grand Canyon is a breathtaking natural wonder that offers stunning landscapes, towering cliffs, and vivid geological formations. Its vast expanse tells a story of millions of years of erosion by the Colorado River. ",
    author: "James Blue",
    date: "Jan 20, 2025",
    image:
      "https://cdn.pixabay.com/photo/2023/02/01/10/37/sunset-7760143_640.jpg",
  },
  {
    title: "The Hidden Beauty of the Northern Lights",
    description:
      "The Northern Lights, also known as Aurora Borealis, paint the Arctic skies with breathtaking colors that seem almost magical. This phenomenon is a result of charged particles colliding in Earth’s atmosphere, creating a mesmerizing display of green, pink, and purple hues.",
    author: "Emily White",
    date: "Jan 22, 2025",
    image:
      "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
  },
  {
    title: "Mount Everest: The Roof of the World",
    description:
      "Mount Everest, standing tall at 8,848 meters, is a symbol of human ambition and endurance. Scaling this peak is a dream for many adventurers, but it comes with extreme challenges, including harsh weather and treacherous terrain.",
    author: "Mark Wilson",
    date: "Jan 25, 2025",
    image:
      "https://cdn.pixabay.com/photo/2023/01/23/17/28/tree-7739243_640.jpg",
  },
  {
    title: "The Tranquility of Japanese Cherry Blossoms",
    description:
      "Japanese cherry blossoms, or sakura, are a symbol of renewal and the fleeting beauty of life. Every spring, these delicate pink and white blooms transform parks and landscapes into enchanting vistas. ",
    author: "Lily Bloom",
    date: "Feb 5, 2025",
    image:
      "https://cdn.pixabay.com/photo/2024/05/31/12/16/bridge-8800485_640.jpg",
  },
  {
    title: "The Mysterious Depths of the Great Barrier Reef",
    description:
      "The Great Barrier Reef is a vibrant underwater paradise that stretches over 2,300 kilometers along Australia’s coast. Home to thousands of marine species, it is a living masterpiece of coral reefs, fish, and crystal-clear waters.",
    author: "David Coral",
    date: "Feb 10, 2025",
    image:
      "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_640.jpg",
  },
];

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <BlogSection posts={posts} />
      <AuthorSection />
    </Box>
  );
};

export default HomePage;
