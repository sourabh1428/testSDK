const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port =3000;

app.use(express.json());

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
app.get('/users', async (req, res) => {
  try {
    const db = client.db('sample_mflix');
    const collection = db.collection('comments');
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
