"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black bg-grid-white/[0.09] shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0  ">
              <Link href={"/"}>
                <h1 className="text-2xl font-bold  text-[#2CFBCD] ">Snippet</h1>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-[#2CFBCD]/10 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-[#2CFBCD] hover:bg-white/10  px-3 py-2 rounded-md text-sm font-medium"
              >
                Explore
              </Link>
              <Link
                href="/trending"
                className="text-[#2CFBCD] hover:bg-white/10  px-3 py-2 rounded-md text-sm font-medium"
              >
                Trending
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6 text-white" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-white hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-[#2CFBCD] hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className="text-[#2CFBCD] hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Trending
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
