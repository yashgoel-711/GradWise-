import React, { useEffect, useState } from 'react';
import { eventService } from '../../../services/events.services';

const Hackathons = () => {
  const [events, setEvents] = useState([]);
  const fetcher = new eventService();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetcher.getEvents();
      if (res?.data?.data) {
        setEvents(res.data.data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <ul className="space-y-4">
      {events.length > 0 ? (
        events.map((event, index) => (
          <li
            key={index}
            className="p-4 bg-blue-50 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-start gap-4">
              <img
                src={event.image}
                alt={event.name}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div>
                <h3 className="font-semibold text-lg capitalize">{event.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{event.description}</p>
              </div>
            </div>
            <a
              href={event.link}
              target="_blank"
              rel="noreferrer"
              className="self-start sm:self-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Apply
            </a>
          </li>
        ))
      ) : (
        <p className="text-gray-500 italic">No hackathons available at the moment.</p>
      )}
    </ul>
  );
};

export default Hackathons;
