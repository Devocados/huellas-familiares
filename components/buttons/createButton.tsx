"use client";
import React from "react";
import Link from "next/link";

type Props = {};

const CreateButton: React.FC = () => {
  return (
    <Link href="/create-member">
      <button className="text-gray-800 bg-[#ffe928] hover:bg-[#ffd700] focus:ring-4 focus:outline-none focus:ring-[#ffe928] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#ffe928] dark:hover:bg-[#ffd700] dark:focus:ring-[#ffe928]">
        Create Member
      </button>
    </Link>
  );
};

export default CreateButton;
