"use client";
import Image from "next/image";
import "font-awesome/css/font-awesome.min.css";
import data from "@/app/data/data.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toggleActive } from "@/store/features/connectors/connectorsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ConnectorsProps = {
  setShowConnectors: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Connectors({ setShowConnectors }: ConnectorsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const activeMap = useSelector((state: RootState) => state.connectors.active);

  const handleToggle = (index: number) => {
    dispatch(toggleActive(index));
  };

  const filteredConnectors = data.connectors.filter((connector) =>
    connector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-500 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl h-[70vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Connectors</h2>
          <button
            onClick={() => setShowConnectors(false)}
            className="w-10 h-10 text-gray-500 hover:text-gray-700 flex items-center justify-center cursor-pointer rounded-full "
          >
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative p-4">
          <Image
            src="/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search among 2,700 connectors..."
            className="w-full h-10 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:border-2 transition-colors duration-200"
          />
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredConnectors.map((connector, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm"
              >
                <div className="flex items-start gap-3 flex-1">
                  {/* Icon */}
                  <div
                    className="min-w-[48px] h-12 rounded-md flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: connector.backgroundColor }} // Light red background (customizable)
                  >
                    <Image
                      src={connector.image}
                      alt={connector.name}
                      width={24} // Slightly smaller than the container
                      height={24}
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-base font-semibold">{connector.name}</p>
                    <p className="text-sm text-gray-600">
                      {connector.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ml-2 cursor-pointer duration-100 ${
                    activeMap[index]
                      ? "bg-green-100  border-green-300 text-green-600 "
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {activeMap[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
