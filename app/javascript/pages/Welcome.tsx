// Example Inertia page component
import React from "react";
import { Head } from "@inertiajs/react";

interface WelcomeProps {
  message: string;
  timestamp: string;
}

const Welcome: React.FC<WelcomeProps> = ({ message, timestamp }) => {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Inertia.js!
          </h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <p className="text-sm text-blue-800">
              ✨ Your Rails + React + TypeScript + Tailwind setup is ready!
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Server time: {new Date(timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
