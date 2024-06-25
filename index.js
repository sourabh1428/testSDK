// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('this is a test made by sourabh');
});

// Example route
app.get('/users', (req, res) => {
  const name = req.params.name;
  res.json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
