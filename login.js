const db = require('./dbconfig');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;

        // Periksa apakah username dan password ada
        if (!Username || !Password) {
            return res.status(400).json({ success: false, error: 'Username dan Password diperlukan.' });
        }

        // Query ke database untuk mendapatkan data pengguna berdasarkan username
        const userQuery = 'SELECT * FROM user WHERE Username = ?';
        const rows = await db.query(userQuery, [Username]);

        // Periksa apakah pengguna ditemukan
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Pengguna tidak ditemukan.' });
        }

        // Ambil password terenkripsi dari hasil query
        const storedPassword = rows[0].Password;
        console.log(storedPassword);
        // Enkripsi password yang dimasukkan untuk membandingkan dengan yang ada di database
        const secretKey = 'kunci_rahasia';
        const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
        let decryptedPassword = decipher.update(storedPassword, 'hex', 'utf-8');
        decryptedPassword += decipher.final('utf-8');

        // Bandingkan password yang didekripsi dengan password yang dimasukkan
        if (decryptedPassword !== Password) {
            return res.status(401).json({ success: false, error: 'Password salah.' });
        }

        // Jika autentikasi berhasil, Anda bisa mengirimkan token sesi atau informasi pengguna lainnya
        // Misalnya, Anda bisa menggunakan JWT untuk menghasilkan token sesi

        // Contoh sederhana tanpa JWT
        // Di sini Anda bisa menyiapkan sesi atau token lainnya sesuai kebutuhan aplikasi Anda

        res.status(200).json({ success: true, message: 'Login berhasil.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
