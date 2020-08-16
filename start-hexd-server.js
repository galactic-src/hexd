const express = require('express');
const cors = require('cors');
const openurl = require('openurl');

const LOCAL_PORT = 3000;

const app = express();
app.use(cors());
app.use(express.static('./src'));

app.listen(port, () => {
  console.log(`started hexd at at http://localhost:${LOCAL_PORT} - opening`);
  openurl.open(`http://localhost:${LOCAL_PORT}`);
})
