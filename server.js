const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
    origin: 'https://labilbar.vercel.app', // Ganti dengan domain frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // Mengambil data JSON dari body request

// Ganti dengan string koneksi MongoDB Atlas
mongoose.connect('mongodb+srv://123:123@labilbar.r5kua.mongodb.net/labilbar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));


// Schema untuk pengguna
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Model User
const User = mongoose.model('User', userSchema);

// Route untuk register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Cek apakah pengguna sudah terdaftar
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Email sudah digunakan" });

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan pengguna baru
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ msg: "Registrasi berhasil" });
});

// Route untuk login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Pengguna tidak ditemukan" });

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password salah" });

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
