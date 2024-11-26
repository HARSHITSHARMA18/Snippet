import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <section
      id="footer"
      className="relative overflow-hidden py-10 bg-[#242424a9] border border-t-2 rounded-3xl border-t-[#2CFBCD]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className=" inline-flex items-center">
                <h1 className="text-5xl md:text-6xl font-bold text-[#2CFBCD]">
                  Snippet
                </h1>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved by Snippet.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white hover:text-[#2CFBCD]"
                    href={"/"}
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
