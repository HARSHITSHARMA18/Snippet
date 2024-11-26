import React from "react";
import Image from "next/image";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import logo3 from "../images/logo3.png";
import logo4 from "../images/logo4.png";

export default function Features() {
  const logos = [
    { name: "logo 1", image: logo1 },
    { name: "logo 2", image: logo2 },
    { name: "logo 3", image: logo3 },
    { name: "logo 4", image: logo4 },
  ];

  const featureData = [
    {
      title: "Lightning-Fast Summaries",
      description: "Get the core of every story in 60 seconds or less",
    },
    {
      title: "Diverse Content",
      description: "Breaking news, tech, science, culture, and more",
    },
    {
      title: "Personalized Experience",
      description: "Customize your news feed to match your interests",
    },
    {
      title: "No Fluff, Pure Insight",
      description:
        "Every piece is meticulously crafted to deliver maximum value",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold sm:text-4xl md:text-4xl lg:text-5xl py-4">
        Trusted <span className="text-[#2CFBCD] ">Sources</span> From
      </h1>

      <div className="w-full py-12 overflow-hidden">
        <div className="mx-auto w-full px-4 md:px-8">
          <div
            className="relative  flex gap-7"
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
                className="flex shrink-0 animate-hero-scroll gap-[8rem]"
              >
                {logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="w-20 h-20 relative flex-shrink-0"
                  >
                    <Image
                      src={logo.image}
                      alt={`Testimonial from ${logo.name}`}
                      fill
                      className="object-contain rounded-lg opacity-50"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold sm:text-4xl md:text-4xl lg:text-5xl py-4 text-center">
        Key Features
        <div className="w-full  px-4 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featureData.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#1a1a1aa9] p-8 transition-transform hover:scale-105 flex flex-col justify-center items-center text-center h-full"
                >
                  <h1 className="mb-4 text-2xl md:text-3xl font-bold text-[#2CFBCD]">
                    {feature.title}
                  </h1>
                  <p className="text-gray-200 md:text-xl opacity-50 font-normal">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}
