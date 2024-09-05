const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://123:123>@labilbar.r5kua.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rute pendaftaran
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi data
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Semua field harus diisi' });
    }

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email sudah terdaftar' });
        }

        // Buat pengguna baru
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ msg: 'Pendaftaran berhasil!' });
    } catch (error) {
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
});

// Mulai server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
