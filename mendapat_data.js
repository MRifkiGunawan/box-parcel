const db = require('./dbconfig');
const express = require('express');
const router = express.Router();

router.get("/data", async (req, res) => {
    try {
        const query = "SELECT * FROM box_parcel ORDER BY createdAt DESC LIMIT 1";
        const rows = await db.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Tidak ada data ditemukan' });
        }

        const row = rows[0];
        console.log(row);
        const imageBase64 = row.gambar.toString()
        console.log(imageBase64);
        res.status(200).json({
            success: true,
            data: {
                id: row.id,
                file_name: row.file_name,
                gambar: "data:;base64" + imageBase64,
                pintu: row.pintu,
                createdAt: row.createdAt
            }
        });
        
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        res.status(500).send({ message: "Gagal mengambil data" });
    }
});

module.exports = router;
