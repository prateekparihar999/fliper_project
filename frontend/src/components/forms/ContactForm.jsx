// frontend/src/components/ContactForm.jsx
import React, { useState } from 'react';
import api from '../../api/axios'; // ensure this path points to your axios instance

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // NOTE: call /api/contacts (matches typical backend mount)
      const res = await api.post('/api/contacts', form);
      // If server returns helpful message, show it
      setMessage(res?.data?.message || 'Submitted successfully!');
      setForm({ fullName: '', email: '', mobile: '', city: '' });
    } catch (err) {
      // Try to show server-provided error text (if any)
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message;
      console.error('Contact submit error:', err);
      setMessage(typeof serverMsg === 'string' ? `Submission failed: ${serverMsg}` : 'Submission failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto rounded-xl shadow-xl p-8 bg-blue-900 bg-opacity-80 border border-white text-white backdrop-blur-[6px] space-y-5"
      aria-label="Get a Free Consultation Form"
      style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
    >
      <h2 className="font-bold text-2xl text-center mb-2 tracking-wide drop-shadow">
        Get a Free Consultation
      </h2>

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Full Name"
        name="fullName"
        type="text"
        value={form.fullName}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Enter Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Mobile Number"
        name="mobile"
        type="tel"
        value={form.mobile}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Area, City"
        name="city"
        type="text"
        value={form.city}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 rounded text-white font-semibold py-2 text-base transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Get Quick Quote'}
      </button>

      {message && (
        <div
          className={`text-center mt-2 font-medium ${
            message.toLowerCase().includes('success') ? 'text-green-300' : 'text-red-300'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
