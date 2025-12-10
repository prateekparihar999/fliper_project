// frontend/src/components/landing/ClientCarousel.jsx
import React, { useState, useEffect } from 'react';
import ClientCard from './ClientCard';
import api from '../../api/axios';

const ClientCarousel = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/api/clients');
        setClients(res.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Failed to load clients');
        console.error('Failed to load clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 pb-6 sm:pt-6 sm:pb-10">

      {/* ---------- HEADING ---------- */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-blue-700 font-extrabold text-3xl sm:text-4xl leading-tight">
          Happy Clients
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded"></div>
      </div>

      {/* ---------- TESTIMONIAL GRID ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-10">
        
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <img
            src="img/Ellipse 28.svg"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
            alt="Client 1"
          />
          <p className="text-gray-700">"Amazing service and top-notch results!"</p>
          <p className="font-bold mt-2 text-blue-700">Sarah K.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <img
            src="img/Ellipse 29.svg"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
            alt="Client 2"
          />
          <p className="text-gray-700">"I loved the design and their friendly support."</p>
          <p className="font-bold mt-2 text-blue-700">John D.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <img
            src="img/Ellipse 31.svg"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
            alt="Client 3"
          />
          <p className="text-gray-700">"Exceeded expectations. Highly recommend."</p>
          <p className="font-bold mt-2 text-blue-700">Lucy M.</p>
        </div>

      </div>

      {/* ---------- CLIENT GRID (NO ARROWS, CLEAN) ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {loading && (
          <div className="col-span-full text-center text-gray-500">
            Loading clients…
          </div>
        )}

        {error && (
          <div className="col-span-full text-center text-red-500">
            Error: {error}
          </div>
        )}

        {/* No "No clients to show" message – just leave blank */}
        {!loading && !error &&
          clients.map((client, idx) => (
            <div key={client._id || idx}>
              <ClientCard {...client} />
            </div>
          ))
        }

      </div>
    </section>
  );
};

export default ClientCarousel;
