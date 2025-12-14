import axios from './axios';

export const login = async (username, password) => {
  const res = await axios.post(
    '/auth/login',
    { username, password },
    { withCredentials: true }
  );
  return res.data;
};

export const logout = async () => {
  const res = await axios.post(
    '/auth/logout',
    {},
    { withCredentials: true }
  );
  return res.data;
};

export const register = async (fullname, username, password) => {
  const res = await axios.post(
    '/auth/register',
    { fullname, username, password },
    { withCredentials: true }
  );
  return res.data;
};

export const checkAuth = async () => {
  const res = await axios.get(
    '/auth/check',
    { withCredentials: true }
  );
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(
    '/auth/users',
    { withCredentials: true }
  );
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(
    `/auth/users/${id}`,
    { withCredentials: true }
  );
  return res.data;
};

export const updateUser = async (id, updatedData) => {
  const res = await axios.put(
    `/auth/users/${id}`,
    updatedData,
    { withCredentials: true }
  );
  return res.data;
};
