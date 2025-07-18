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
  // const [active, setActive] = useState<{ [key: number]: boolean }>({});
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
    <>
      <div className="flex justify-center items-center min-h-screen text-gray-900 bg-zinc-500">
        <div className="text-black border border-gray-300 h-150 w-200 bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex justify-between p-4">
            <p className="font-bold text-xl">Connectors</p>
            <button
              className="h-10 w-10 flex items-center justify-center bg-transparent border-0 text-black text-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image src={"/cross.svg"} alt="Add Icon" width={22} height={22} />
            </button>
          </div>

          <hr className="w-full text-gray-300" />

          {/* Search Bar */}
          <div className="relative p-5">
            <Image
              src="/search.svg"
              alt="Search Icon"
              width={22}
              height={22}
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              className="h-10 w-full pl-10 pr-3 border rounded-lg focus:outline-none"
              placeholder="Search among 2,700 connectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Connectors Grid */}
          <div className="max-h-96 w-full border-0 grid grid-cols-2 gap-4 overflow-auto p-4">
            {filteredConnectors.map((connector, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-auto border border-gray-200"
              >
                <div className="grid grid-cols-5 grid-rows-1 gap-2 items-center">
                  {/* Connector Icon */}
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden col-span-1">
                    <Image
                      src={connector.image}
                      alt={connector.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Connector Info */}
                  <div className="ml-4 col-span-3">
                    <h2 className="text-lg font-semibold">{connector.name}</h2>
                    <p className="text-gray-600">{connector.description}</p>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      className={`border w-8 h-8 rounded-sm flex items-center justify-center text-lg font-bold transition-all ml-2 ${
                        activeMap[index]
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleToggle(index)}
                    >
                      <Image
                        src="/plus-icon.svg"
                        alt={connector.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
