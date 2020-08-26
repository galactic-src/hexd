const express = require('express');
const cors = require('cors');
const open = require('open');

const LOCAL_PORT = 3000;

const app = express();
app.use(cors());
app.use(express.static('./hexd'));

app.listen(LOCAL_PORT, async () => {
  console.log(`started hexd at at http://localhost:${LOCAL_PORT} - opening`);
  await open(`http://localhost:${LOCAL_PORT}/index.html`);
})
