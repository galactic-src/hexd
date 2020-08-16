const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('./static'));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

