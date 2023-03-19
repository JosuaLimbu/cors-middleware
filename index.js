const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())
const port = 3000;

app.get('/', (req, res) => res.json({data: 'Halo bang'}));

app.listen(port, () => console.log(`Server run on http://localhost:${port}`));