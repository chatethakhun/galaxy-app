import APPS from "@/constants/apps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="w-screen h-[calc(100vh-64px)] text-center py-5">
      <h1 className="font-bold text-3xl">My Galaxy Apps.</h1>
      <div className="flex justify-center mt-10">
        {APPS.map((app) => (
          <div
            key={app.name}
            className="max-w-[300px] h-min bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <Image
                className="rounded-t-lg"
                src="/chat-app.png"
                alt=""
                width={300}
                height={200}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {app.name}
                </h5>
              </a>
              <div className="flex flex-wrap gap-2 mb-3">
                {app.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/chat-system/chats"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to app
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
