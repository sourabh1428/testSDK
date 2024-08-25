// index.js
const express = require('express');
const cors = require('cors'); // Import cors package
const router = express.Router();
const {authenticateJWT}= require('./middleware');
const rateLimit = require('express-rate-limit');
const app = express();
const authRoute = require('./routes/Auth.js');
const validateApiKey = require('./routes/DBauth.js');


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
const { validate } = require('./Modal.js');


// Use routes


app.use('/auth', validateApiKey,authRoute);
app.use('/',validateApiKey,routes);
app.use('/events',validateApiKey, eventRoutes);
app.use('/campaigns',validateApiKey ,campaignRoutes);
app.use('/auth',validateApiKey,authRoute );


app.use('/keep-alive',(req,res)=>{
  res.send("I'm Alive");
})

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





// redis


const redis = require('redis');
const client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));

const addEventToQueue = async (event) => {
  try {
    await client.lPush('eventsQueue', JSON.stringify(event));
  } catch (error) {
    console.error('Error adding event to queue:', error);
  }
};

const processEvents = async () => {
  try {
    const events = await client.lRange('eventsQueue', 0, -1);
    if (events.length > 0) {
      // Process events
      for (const event of events) {
        const parsedEvent = JSON.parse(event);
        // Handle the event
      }
      // Clear the queue after processing
      await client.del('eventsQueue');
    }
  } catch (error) {
    console.error('Error processing events:', error);
  }
};
