// projectService.js
import axios from './axios';

// NOTE: backend expected path is /api/projects (not /projects)
export const fetchProjects = async () => {
  const res = await axios.get('/api/projects');
  return res.data;
};

export const fetchProjectById = async (id) => {
  const res = await axios.get(`/api/projects/${id}`);
  return res.data;
};

// When sending FormData, do NOT set Content-Type manually — the browser sets the boundary.
export const addProject = async (formData) => {
  const res = await axios.post('/api/projects', formData);
  return res.data;
};

export const updateProject = async (id, formData) => {
  const res = await axios.put(`/api/projects/${id}`, formData);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`/api/projects/${id}`);
  return res.data;
};
