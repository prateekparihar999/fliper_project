// frontend/src/components/ContactForm.jsx
import React, { useState } from 'react';
import api from '../../api/axios'; // ensure this points to your CRA axios instance

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.post('/api/contacts', form);
      // success
      setMessage(res?.data?.message || 'Submitted successfully!');
      setForm({ fullName: '', email: '', mobile: '', city: '' });
    } catch (err) {
      // More informative logging for debugging
      console.error('Contact submit error (full):', err);

      // 1) Server responded with a status code (500, 400, etc)
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);

        // If backend sent a message or validation errors, show them
        const serverMsg = err.response.data?.message || err.response.data || JSON.stringify(err.response.data);
        setMessage(typeof serverMsg === 'string' ? `Submission failed: ${serverMsg}` : 'Submission failed: see console for details.');
      }
      // 2) Request was made but no response (network)
      else if (err.request) {
        console.error('No response received. Request:', err.request);
        setMessage('No response from server — check backend is running.');
      }
      // 3) Something went wrong setting up request
      else {
        console.error('Request setup error:', err.message);
        setMessage(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto rounded-xl shadow-xl p-8 bg-blue-900 bg-opacity-80 border border-white text-white backdrop-blur-[6px] space-y-5" aria-label="Get a Free Consultation Form" style={{ backdropFilter: 'saturate(180%) blur(10px)' }}>
      <h2 className="font-bold text-2xl text-center mb-2 tracking-wide drop-shadow">Get a Free Consultation</h2>

      <input name="fullName" value={form.fullName} onChange={handleChange} required autoComplete="off" placeholder="Full Name" className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
      <input name="email" value={form.email} onChange={handleChange} required autoComplete="off" placeholder="Enter Email Address" type="email" className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
      <input name="mobile" value={form.mobile} onChange={handleChange} required autoComplete="off" placeholder="Mobile Number" type="tel" className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
      <input name="city" value={form.city} onChange={handleChange} required autoComplete="off" placeholder="Area, City" type="text" className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />

      <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 rounded text-white font-semibold py-2 text-base transition disabled:opacity-60">
        {loading ? 'Submitting...' : 'Get Quick Quote'}
      </button>

      {message && <div className={`text-center mt-2 font-medium ${message.toLowerCase().includes('success') ? 'text-green-300' : 'text-red-300'}`}>{message}</div>}
    </form>
  );
};

export default ContactForm;
