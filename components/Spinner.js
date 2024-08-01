// components/Spinner.js
import React from 'react';
import '../styles/globals.css'

const Spinner = () => (
  <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
    <div className="animate-spin h-10 w-10 border-4 border-t-4 border-blue-500 rounded-full"></div>
  </div>
);

export default Spinner;
