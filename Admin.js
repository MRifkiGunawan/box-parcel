const express = require('express');
const router = express.Router();
const db = require('./dbconfig'); // Mengimpor konfigurasi database

router.post('/Admin', async (req, res) => {
    try {
        const { No_box,No_resi,kg, Alamat } = req.body; // Mengambil No_Resi dari body permintaan
        const createdAt = new Date().getFullYear() +"-"+ new Date().getMonth()+"-"+ new Date().getDate()+"/"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
        // Validasi input
        if (!No_box || !No_resi || !kg || !Alamat) {
            return res.status(400).json({ success: false, error: 'No box, Resi,Berat dan Alamat harus terisi semua.' });
        }

        // Query untuk memperbarui No_Resi berdasarkan ID_alat
        const updateQuery = 'INSERT INTO admin (No_box, No_resi, kg, Alamat, createdAt) VALUES (?, ?, ?, ?, ?)';
        const result = await db.query(updateQuery, [No_box,No_resi,kg, Alamat, createdAt]);
        if (result.affectedRows > 0) {
            const insertedData = {
                No_box,
                No_resi,
                kg,
                Alamat,
                createdAt
            };

            res.status(200).json({ success: true, message: 'Resi berhasil disimpan.', data: insertedData });
        } else {
            res.status(500).json({ success: false, error: 'Gagal menyimpan data.' });
        }} catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
