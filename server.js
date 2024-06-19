const express = require('express')
const app = express()
const kirim_data = require(`./kirim_data`);
const mendapat_data = require(`./mendapat_data`);
const daftar = require(`./daftar`);
const login = require(`./login`);

const Admin = require(`./Admin`);
const kurir = require(`./kurir`);
const port = 3000

app.use('/',kirim_data);
app.use('/',mendapat_data);
app.use('/',daftar);
app.use('/', login);

app.use('/', Admin);
app.use('/',kurir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})