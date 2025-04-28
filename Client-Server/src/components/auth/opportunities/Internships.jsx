import React, { useEffect, useState } from 'react';
import InternshipService from '../../../services/internship.services.js'; // Adjust path as necessary

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the internship data
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await InternshipService.getInternships();
        setInternships(data); // Set the fetched internships data
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Part-time Internships</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {internships.map((internship, idx) => (
            <li key={idx} className="p-4 bg-green-50 border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{internship.title}</h3>
                <p className="text-sm text-gray-600">Apply by: {internship.applyBy}</p>
              </div>
              <a
                href={internship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Apply
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Internships;
