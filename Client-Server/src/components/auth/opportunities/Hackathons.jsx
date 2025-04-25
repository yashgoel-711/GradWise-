import React from 'react';

const Hackathons = () => {
  return (
    <ul className="space-y-4">
      <li className="p-4 bg-blue-50 border rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Smart India Hackathon 2025</h3>
          <p className="text-sm text-gray-600">Deadline: May 15, 2025</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Apply
        </button>
      </li>
      <li className="p-4 bg-blue-50 border rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Google Solution Challenge</h3>
          <p className="text-sm text-gray-600">Deadline: April 30, 2025</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Apply
        </button>
      </li>
    </ul>
  );
};

export default Hackathons;
