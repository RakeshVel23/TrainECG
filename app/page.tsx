"use client"

import { useState } from 'react';
import ECGAxisQuiz from './ECGTool'; // Import the ECG tool component
import Link from 'next/link';

export default function Home() {
  const [showECGTool, setShowECGTool] = useState(false); // State to control visibility of ECG tool

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold">Available Tools</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <button 
                onClick={() => setShowECGTool(true)} 
                className="text-blue-500 hover:underline"
              >
                ECG Axis Interpretation Quiz
              </button>
            </li>
            {/* Add more tools here as you create them */}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h1 className="text-3xl font-bold text-center">Welcome to the Interactive Tools Hub</h1>
          <p className="mt-4 text-center">
            Explore our interactive tools designed to enhance your learning experience in ECG interpretation and more.
          </p>

          {/* Conditional rendering of the ECG tool */}
          {showECGTool && <ECGAxisQuiz />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p>
          <Link href="/privacy-policy" className="text-blue-300 hover:underline">Privacy Policy</Link> | 
          <Link href="/terms-of-service" className="text-blue-300 hover:underline"> Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}