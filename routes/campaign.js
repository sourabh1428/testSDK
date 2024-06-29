const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
// MongoDB connection
const uri = "mongodb+srv://sppathak1428:1vmAkV1LIypO4bVQ@cluster0.hldmans.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Ensure the MongoDB client connects before starting the server
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();


router.get('/getAllCampaign',async (req,res)=>{
   try{
    let allcampaigns=await client.db('test_db').collection("campaigns");

    let data=await allcampaigns.find({}).toArray();
    console.log(data);
    res.send(data)
   }catch(error){
    console.log(error);
   }
})


router.post('/postCampaign', async (req, res) => {
    try {
        const campaignData = req.body;

        // Generate a new ObjectId for _id and segment_id
        const objId = new ObjectId();
        campaignData._id = objId;
        campaignData.segment_id = objId.toString(); // Convert ObjectId to string for segment_id

        // Check if the campaign already exists
        const campaign = await client.db('test_db').collection("campaigns").findOne({ _id: campaignData._id });
        if (campaign) {
            res.status(400).send("Campaign is already registered");
            return;
        }
        const campaignType=campaignData.type;
        

        // Insert the new campaign
        await client.db('test_db').collection("campaigns").insertOne(campaignData);

        // Insert the segment with a reference to the campaign
        
        if(campaignType=="Event"){
            await client.db('test_db').collection("segments").insertOne({ segment_id:campaignData.segment_id ,event:campaignData.event });
        
    }

        res.json(campaignData.segment_id);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ "message": "Error adding campaign" });
    }
});

router.post('/UIS/:segment_id', async (req, res) => {
    try {
        const segment_id = req.params.segment_id;


        // Search for segment info
        const segment_info = await client.db('test_db').collection("campaigns").findOne({ segment_id: segment_id });

        if (!segment_info) {
            return res.status(404).json({ message: "Segment not found" });
        }

        // Fetch all user events
        const audience = await client.db('test_db').collection("userEvent").find({}).toArray();
        let ans = [];

        // Iterate through each user's events
        for (let i = 0; i < audience.length; i++) {
            const events = audience[i].events;
            
            // Iterate through each event of the user
            for (let j = 0; j < events.length; j++) {
                const event = events[j];
                
                // Check if the event matches the segment_info's event
                if (event.eventName === segment_info.event) {
                    ans.push(audience[i].MMID);
                    break; // Exit the loop for this user once a match is found
                }
            }
        }


        // Update segment_info with ans array
    
       
        try{
           
        // Update the document in the campaigns collection with the ans array
        const updateResult = await client.db('test_db').collection("segments").updateOne(
            {segment_id: segment_info.segment_id }, // Use _id assuming it's the primary key
            { $set: { users: ans } }
        );
       
        if(updateResult.acknowledged===true)res.send(ans);
        else{
            res.send("failed")
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Failed to update segment info with ans array." });
    }
        // if (updateResult.modifiedCount === 1) {
        //     res.json({ message: "Segment info updated successfully with ans array." });
        // } else {
        //     res.status(500).json({ message: "Failed to update segment info with ans array." });
        // }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching UIS" });
    }
});


module.exports=router;