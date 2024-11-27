import React from "react";
import Image from "next/image";
import heroA from "../images/hero-a.png";
import heroB from "../images/hero-b.png";
import heroC from "../images/hero-c.png";
import heroD from "../images/hero-d.png";
import heroE from "../images/hero-e.png";
import Link from "next/link";

export default function HeroSection() {
  const heroes = [
    { name: "Hero A", image: heroA },
    { name: "Hero B", image: heroB },
    { name: "Hero C", image: heroC },
    { name: "Hero D", image: heroD },
    { name: "Hero E", image: heroE },
  ];

  return (
    <>
      <div className="flex items-center justify-center h-full p-[8rem] pb-[2rem]">
        <div className="text-center space-y-6 px-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-7xl lg:text-7xl ">
            Latest News to{" "}
            <span className="text-[#2CFBCD] motion-safe:animate-pulse">
              Content
            </span>{" "}
            In Minutes
          </h1>
          <p className="text-base sm:text-lg text-gray-400 md:text-xl max-w-xl mx-auto">
            Grow Your Audience 10X with latest updates around AI, Tech, Business
            and more
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href ={"/explore"}>
            <button className="px-6 py-2 bg-[#2CFBCD] text-black font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
              Explore Now
            </button>
            </Link>
            <Link href={"#footer"}>
              <button className="px-6 py-2 border border-[#2CFBCD] text-white font-semibold rounded-full hover:bg-[#2CFBCD] hover:text-black transition duration-300">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-12 overflow-hidden">
        <div className="mx-auto w-full px-4 md:px-8">
          <div
            className="relative mt-2 flex gap-6"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            }}
          >
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-hero-scroll gap-4"
              >
                {heroes.map((hero) => (
                  <div
                    key={hero.name}
                    className="w-80 h-80 relative flex-shrink-0"
                  >
                    <Image
                      src={hero.image}
                      alt={`Testimonial from ${hero.name}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
