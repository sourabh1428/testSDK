// index.js
const express = require('express');
const cors = require('cors'); // Import cors package
const router = express.Router();
const {authenticateJWT}= require('./middleware');
const rateLimit = require('express-rate-limit');
const app = express();




const port = 3000;



app.use(cors());
app.use(express.json());
// Import routes

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

// Apply rate limiter to all requests
router.use(apiLimiter);

const routes = require('./routes/users.js');

const eventRoutes=require('./routes/events.js');

const campaignRoutes = require('./routes/campaign.js');

const authRoute=require('./routes/Auth.js');

const auth=require('./middleware');
const { getAllCampaigns, UIS } = require('./SDK/index.js');
// Use routes



app.use('/', routes);
app.use('/events', eventRoutes);
app.use('/campaigns' ,campaignRoutes);
app.use('/auth',authRoute );
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



//segment refresh every 10 segments

// async function hue(){
//   let ans=[];
//   ans=await getAllCampaigns();

//       for(let i=0;i<ans.length;i++){
//           let x=UIS(ans[i].segment_id);
//           console.log("segment refreshed it's segment id: "+ans[i].segment_id);
       
//       }

// }

// setInterval(() => {
//   hue();
// }, 10000);