const db = require('./dbconfig');
const express = require('express');
const router = express.Router();

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: true }));

router.post("/send", async (req, res) => {
    try {
        let data = req.body.data; // Asumsikan 'data' adalah nama field yang dikirim dari client;
        const createdAt = new Date().getFullYear() +"-"+ new Date().getMonth()+"-"+ new Date().getDate()+"/"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
        const array = data.trim().split(';');
        let [ file_name, gambar] = array;
        
        const query = "INSERT INTO box_parcel ( file_name, gambar, createdAt) VALUES (?, ?, ?)";
        const result = await db.query(query, [ file_name, gambar, createdAt]);
        
        const espData = { command: '000' };
        // res.status(200).send({ message: "Data berhasil disimpan", id: result.insertId });
        res.status(200).json({
                 success: true,
                 message: ' data gambar di kirim ke server',
                 espData: espData
             });
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
        res.status(500).send({ message: "Gagal menyimpan data" });
    }
});

module.exports = router;
