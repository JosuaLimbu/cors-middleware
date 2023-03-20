const express = require('express');
const members = require('./members');
const getUsers = require('./users');
// const cors = require('cors');

const app = express();
// app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.json({data: 'Halo bang, This is the homepage'})
});

app.get('/about', (req, res) => {
    const date = new Date().toISOString();
    res.json({
        status: 'success',
        message: 'response success',
        description: 'Exercise #03',
        date: date,
        data: members
    })
});
app.get('/users', async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getUsers()));
});
app.get("/members/:name", (req, res) => {
  const nama = req.params.name.toLowerCase();
  const member = members.find((member) => member.nama.toLowerCase() === nama);
  if (member) {
    res.json(member);
  } else {
      res.status(404).json({
        message: "Data tidak ditemukan",
    });
  }
});
//Middleware log
const log = (req, res, next) =>{
  console.log(Date.now()+ " " + req.ip + " " + req.originalUrl);
  next();
};
app.use(log);

// Middleware menangani Routing 404
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
};
app.use(notFound);


app.listen(port, () => console.log(`Server run on http://localhost:${port}`));