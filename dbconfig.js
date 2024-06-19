const mysql = require('mysql');
const util = require('util');
// Konfigurasi koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tigaroda',
  database: 'box_parcel'
});

// Membuka koneksi ke MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', db.threadId);
});
db.query = util.promisify(db.query);
module.exports = db;
