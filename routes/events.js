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
router.post('/viewedPage', async function (req, res) {
    try {
        const db = client.db('test_db');
        const collection = db.collection('viewed_page');
        let userEventDone = req.body;
        const eventTime = Math.floor(Date.now() / 1000); // Add creation time in epoch format
        userEventDone.EventTime = eventTime; // Add event time to the userEventDone object
        let id = userEventDone.MMID;

        const eventName = userEventDone.eventName; // Assuming eventName is part of the request body
        const eventEntry = { eventTime, eventName }; // Create an event entry object

        const userEvent = db.collection('userEvent');

        // Check if user exists and update or insert accordingly
        const user = await userEvent.findOne({ MMID: id });
        if (user) {
            await userEvent.updateOne(
                { MMID: id },
                { $push: { events: eventEntry } }
            );
        } else {
            await userEvent.insertOne({
                MMID: id,
                events: [eventEntry]
            });
        }

        // Insert the event into the viewed_page collection
        await collection.insertOne(userEventDone);

        console.log("User event inserted: ", user);
        res.status(201).json({ message: "Event added successfully to backend" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get('/userEvents', async function (req, res) {
    try {
        const db = client.db('test_db');
        const userEvent = db.collection('userEvent');
        const MMID = req.query.MMID; // Get the MMID from the query parameters

        if (!MMID) {
            return res.status(400).send({ error: "MMID is required" });
        }

        const user = await userEvent.findOne({ MMID: MMID });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).json(user.events);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Failed to get user events" });
    }
});






module.exports = router;