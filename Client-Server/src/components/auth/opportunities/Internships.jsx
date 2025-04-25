import React from 'react';

const Internships = () => {
  return (
    <ul className="space-y-4">
      <li className="p-4 bg-green-50 border rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Frontend Intern - Zomato</h3>
          <p className="text-sm text-gray-600">Apply by: May 10, 2025</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Apply
        </button>
      </li>
      <li className="p-4 bg-green-50 border rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Software Intern - Microsoft</h3>
          <p className="text-sm text-gray-600">Apply by: May 20, 2025</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Apply
        </button>
      </li>
    </ul>
  );
};

export default Internships;
