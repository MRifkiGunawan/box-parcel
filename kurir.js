const db = require('./dbconfig');
const express = require('express');
const router = express.Router();

router.post('/kurir', async(req, res)=>{
try {
const {No_resi} = req.body;

if (!No_resi) {
    return res.status(400).json({ success: false, error: 'No Resi diperlukan.' });
}
console.log(No_resi);
const resiQuery = 'SELECT * FROM admin WHERE No_resi = ?';
        const [resi] = await db.query(resiQuery, [No_resi]);

        if (resi.length === 0) {
            return res.status(400).json({ success: false, error: 'Resi tidak valid.' });
        }
// Data untuk ESP32
// const espData = { command: '000' };

// res.status(200).json({
//     success: true,
//     message: 'Resi valid, data dikirim ke ESP32.',
//     espData: espData?
// });
res.status(200).json({ success: true, message: 'Nomer Resi Valid' });
} catch (error) {
    console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });

}
});
module.exports = router;