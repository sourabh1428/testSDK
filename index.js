// index.js
const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());
// Import routes
const routes = require('./routes/users.js');

const eventRoutes=require('./routes/events.js');

const campaignRoutes = require('./routes/campaign.js');

// Use routes
app.use('/', routes);
app.use('/events', eventRoutes);
app.use('/campaigns', campaignRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
