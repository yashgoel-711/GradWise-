import React, { useEffect, useState } from 'react';
import { Loader2, MapPin, Wallet } from 'lucide-react';
import gradwiseService, { errorMessage } from '../../../services/gradwise.service.js';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInternships = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await gradwiseService.getInternships();
      setInternships(data.internships || []);
      setSource(data.source || '');
    } catch (err) {
      setError(errorMessage(err, 'Could not load internships.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-green-600" size={28} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center justify-between">
        <span>{error}</span>
        <button onClick={fetchInternships} className="underline font-medium">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {source && (
        <p className="text-xs text-gray-500 mb-3">
          {source === 'Internshala'
            ? 'Live listings from Internshala, ranked by how many of your skills match.'
            : 'Live listings are unavailable right now, so these are suggested roles ranked by your skills.'}
        </p>
      )}

      {internships.length === 0 ? (
        <p className="text-gray-500">No internships found right now.</p>
      ) : (
        <ul className="space-y-4">
          {internships.map((internship, idx) => (
            <li key={idx} className="p-4 bg-green-50 border border-green-100 rounded-lg flex justify-between items-start gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg text-gray-800">{internship.title}</h3>
                <p className="text-sm text-gray-600">{internship.company}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet size={14} /> {internship.stipend}
                  </span>
                </div>
                {internship.matchedSkills?.length > 0 && (
                  <span
                    title={internship.matchedSkills.join(', ')}
                    className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {internship.matchedSkills.length} skill{internship.matchedSkills.length > 1 ? 's' : ''} match: {internship.matchedSkills.join(', ')}
                  </span>
                )}
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
