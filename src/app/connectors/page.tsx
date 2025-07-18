"use client";
import Image from "next/image";
import "font-awesome/css/font-awesome.min.css";
import data from "@/app/data/data.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toggleActive } from "@/store/features/connectors/connectorsSlice";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const activeMap = useSelector((state: RootState) => state.connectors.active);

  const handleToggle = (index: number) => {
    dispatch(toggleActive(index));
  };

  const filteredConnectors = data.connectors.filter((connector) =>
    connector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-900 bg-zinc-500 px-4">
      <div className="text-black border border-gray-300 bg-white rounded-lg shadow-md w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <p className="font-bold text-xl">Connectors</p>
          <button
            className="h-10 w-10 flex items-center justify-center bg-transparent border-0 text-black text-lg cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={"/cross.svg"} alt="Close" width={22} height={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative p-4">
          <Image
            src="/search.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            className="h-10 w-full pl-10 pr-3 border rounded-lg focus:outline-none"
            placeholder="Search among 2,700 connectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Connectors Grid */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnectors.map((connector, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between border border-gray-200"
              >
                <div className="flex items-start gap-3 w-full">
                  {/* Connector Icon */}
                  <div className="min-w-[48px] h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={connector.image}
                      alt={connector.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Connector Info */}
                  <div className="flex-1">
                    <h2 className="text-base font-semibold">
                      {connector.name}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {connector.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-sm border transition-all ${
                        activeMap[index]
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleToggle(index)}
                    >
                      <Image
                        src="/plus-icon.svg"
                        alt="toggle"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
