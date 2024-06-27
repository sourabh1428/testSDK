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

// Example route to fetch users
router.get('/users', async (req, res) => {
  try {
    const db = client.db('test_db');
    const collection = db.collection('Users');
    const result = await collection.find({}).limit(100).toArray();
    let ans=[];
    for(let i=0;i<result.length;i++){
        ans.push(result[i].name);
    }
    console.log("Got it!");
    res.json(ans);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post('/postUser', async (req, res) => {
    try {
             const userData = req.body;
            userData.createdAt = Math.floor(Date.now() / 1000); // Add creation time in epoch format

             const objectId = new ObjectId(); // Create a new ObjectId

            userData._id = objectId; // Set the ObjectId to the _id field
            userData.Mid = objectId.toString(); // Set the ObjectId to the id field as a string
        const db = client.db('test_db');
        const collection = db.collection('Users');
        console.log(userData);

        const result = await collection.insertOne(userData);
        console.log("User inserted:", result.insertedId);
        res.status(201).json({ message: "User added successfully", userId: result.insertedId });
    
      } catch (error) {
        console.error("Error posting user:", error);
        res.status(500).json({ error: "Failed to post user" });
      }
});






module.exports = router;
