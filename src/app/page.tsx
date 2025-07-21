"use client";
import { useRouter } from "next/navigation";
import Connectors from "@/components/connectors";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [showConnectors, setShowConnectors] = useState(false);
  return showConnectors ? (
    <Connectors setShowConnectors={setShowConnectors} />
  ) : (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 text-gray-800">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-10 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-4 text-center text-blue-900">
          Welcome to Connector Hub
        </h1>
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Explore thousands of connectors integrated to streamline your
          workflow. Click the button below to get started.
        </p>

        <button
          onClick={() => setShowConnectors(true)}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Open Connectors
        </button>
      </div>

      <footer className="mt-16 text-sm text-gray-500 select-none">
        &copy; {new Date().getFullYear()} All copyrights are reserved by Mohsin.
      </footer>
    </main>
  );
}
