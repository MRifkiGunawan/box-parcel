const db = require('./dbconfig');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post("/daftar", async (req, res) => {
    try {
        const { Username, Password, Pengguna } = req.body;
        if (!Username || !Password) {
            return res.status(400).json({ success: false, error: 'Username dan Password diperlukan.' });
        }
        // Validasi tipe pengguna
        const allowedRoles = ['Admin', 'Kurir'];
        if (!allowedRoles.includes(Pengguna)) {
            return res.status(400).json({ success: false, error: 'Tipe pengguna tidak valid. Hanya boleh Admin atau Kurir.' });
        }
        
        // Periksa apakah username sudah ada
        const userCheckQuery = 'SELECT * FROM user WHERE Username = ?';
        const rows = await db.query(userCheckQuery, [Username]);
        console.log(rows);
        // // Memeriksa apakah user sudah ada berdasarkan hasil query
         if (rows.length > 0) {
            return res.status(400).json({ success: false, error: 'Username sudah digunakan, pilih username lain.' });
         }

        
        // Enkripsi password
        const secretKey = 'kunci_rahasia';
        const cipher = crypto.createCipher('aes-256-cbc', secretKey);
        let encryptedPassword = cipher.update(Password, 'utf-8', 'hex');
        encryptedPassword += cipher.final('hex');

        // Simpan data user baru ke database
        const createdAt = new Date().getFullYear() +"-"+ new Date().getMonth()+"-"+ new Date().getDate()+"/"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
        const insertQuery = 'INSERT INTO user (Username, Password, Pengguna, createdAt) VALUES (?, ?, ?, ?)';
        await db.query(insertQuery, [Username, encryptedPassword, Pengguna, createdAt]);
        
        res.status(200).json({ success: true, message: 'Akun berhasil disimpan' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
