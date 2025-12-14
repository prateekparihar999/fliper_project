import React, { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import api from '../../api/axios';

const ClientCarousel = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/clients'); // ✅ CORRECT
        setClients(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to load clients:', err);
        setError(
          err?.response?.data?.message ||
          'Unable to load clients'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section id='testimonials'  className="max-w-7xl mx-auto px-4 pt-1 pb-10">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-blue-700 font-extrabold text-3xl">
          Happy Clients
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded" />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading clients…
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {/* Client Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No clients available
            </p>
          ) : (
            clients.map((client) => (
              <ClientCard
                key={client._id}
                {...client}
              />
            ))
          )}
        </div>
      )}

    </section>
  );
};

export default ClientCarousel;
