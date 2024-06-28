// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
// Import routes
const routes = require('./routes/users.js');

const eventRoutes=require('./routes/events.js');



// Use routes
app.use('/', routes);
app.use('/events', eventRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
