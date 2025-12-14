import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;

    if (!fullname || !username || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = await Admin.create({
      fullname,
      username,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Admin created successfully',
      id: admin._id
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Register failed' });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  console.log('LOGIN BODY:', req.body); // 🔍 DEBUG LINE (IMPORTANT)

  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('LOGIN FAIL: user not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      console.log('LOGIN FAIL: password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.authenticated = true;
    req.session.adminId = admin._id;

    console.log('LOGIN SUCCESS:', admin.username);

    res.json({
      message: 'Login successful',
      id: admin._id,
      fullname: admin.fullname,
      username: admin.username
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
};

/* ================= CHECK AUTH ================= */
export const checkAuth = (req, res) => {
  res.json({ authenticated: !!req.session?.authenticated });
};

/* ================= GET ALL ADMINS ================= */
export const getAllUsers = async (_req, res) => {
  const users = await Admin.find().select('-password');
  res.json(users);
};

/* ================= DELETE ADMIN ================= */
export const deleteUser = async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

/* ================= UPDATE ADMIN ================= */
export const updateUser = async (req, res) => {
  try {
    const updates = {};

    if (req.body.fullname) updates.fullname = req.body.fullname;
    if (req.body.username) updates.username = req.body.username;
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }

    const user = await Admin.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Update User Error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
};
