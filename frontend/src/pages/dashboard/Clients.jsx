import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ImageCropper from '../../components/common/ImageCropper';

/* Helper: Blob → base64 data‑URL */
const blobToDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [cropSrc, setCropSrc] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchClients = async () => {
    const { data } = await axios.get('/clients');
    setClients(data);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = (ev) => setCropSrc(ev.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleCropDone = async (blob) => {
    setCroppedBlob(blob);
    const base64 = await blobToDataURL(blob);
    setForm((prev) => ({ ...prev, image: base64 }));
    setCropSrc(null);
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    setCroppedBlob(null);
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleEdit = (c) => {
    setForm({
      name: c.name,
      designation: c.designation,
      description: c.description,
      image: null
    });
    setEditingId(c._id);
    setCroppedBlob(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/clients/${id}`);
      await fetchClients();
      setStatusMsg({ type: 'success', text: 'Client deleted successfully.' });
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      setStatusMsg({ type: 'error', text: 'Failed to delete client.' });
    }
  };

  const resetForm = () => {
    setForm({ name: '', designation: '', description: '', image: null });
    setCroppedBlob(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const payload = {
        name: form.name,
        designation: form.designation,
        description: form.description,
      };
      if (form.image) payload.image = form.image;

      if (editingId) {
        await axios.put(`/clients/${editingId}`, payload);
        setStatusMsg({ type: 'success', text: 'Client updated successfully.' });
      } else {
        await axios.post('/clients', payload);
        setStatusMsg({ type: 'success', text: 'Client added successfully.' });
      }

      await fetchClients();
      resetForm();
    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
      setStatusMsg({ type: 'error', text: 'Failed to save client.' });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {editingId ? 'Edit Client' : 'Manage Clients'}
      </h2>

      {/* Status Message */}
      {statusMsg.text && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
            statusMsg.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 mb-10 space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-700">
          {editingId ? 'Update Client' : 'Add New Client'}
        </h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Client Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Client Description"
          rows={3}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          required
        />

        <label className="block">
          <span className="text-sm text-gray-600">Client Image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required={!editingId && !croppedBlob}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>

        {croppedBlob && (
          <div className="mb-2">
            <img
              src={URL.createObjectURL(croppedBlob)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-full shadow"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading
              ? editingId
                ? 'Updating...'
                : 'Adding...'
              : editingId
              ? 'Update'
              : 'Add Client'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-red-500 hover:underline font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Cropper Modal */}
      {cropSrc && (
        <ImageCropper
          imageSrc={cropSrc}
          onCropDone={handleCropDone}
          onCancel={handleCropCancel}
        />
      )}

      {/* Clients Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-50 text-blue-800">
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Designation</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-gray-400 text-center">
                  No clients found.
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c._id} className="border-b hover:bg-blue-50 transition">
                  <td className="py-3 px-4">
                    {c.imageUrl ? (
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="w-16 h-16 object-cover rounded-full shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{c.name}</td>
                  <td className="py-3 px-4 text-gray-700">{c.designation}</td>
                  <td className="py-3 px-4 text-gray-700">{c.description}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
