const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Modal.js');

const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');



require('dotenv').config()


const uri = process.env.MONGODB_URI;
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
    console.log("Successfully connected to MongoDB! + auth");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
  
    try {
      let existingUser = await client.db('test_db').collection("Authentication").findOne({ email });
      console.log(existingUser);
      
      if (existingUser) return res.status(400).json({ msg: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = { username, email, password: hashedPassword };
      const result = await client.db('test_db').collection("Authentication").insertOne(newUser);
      
 // result.ops[0] contains the inserted document
  
      const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

  
  router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
  
    try {
      let user = await client.db('test_db').collection("Authentication").findOne({ email });
      console.log(user);
  
      if (!user) return res.status(400).json({ msg: 'User does not exist' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  


  module.exports = router;
