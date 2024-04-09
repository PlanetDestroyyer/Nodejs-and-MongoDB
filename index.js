const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, InsertOneResult, ServerApiVersion } = require('mongodb');


const uri = "connection_stirng";

const app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/donors', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });

    const db = client.db("blooddonation");
    const collection = db.collection("donors");

    const newDonor = {
      name: req.body.name,
      email: req.body.email, 
      bloodGroup: req.body.blood_type, 
      contact: req.body.phone,
      address: req.body.address
    };

    const result = await collection.insertOne(newDonor);
    console.log(`Donor data inserted with ID: ${result.insertedId}`);
    res.send('Donor information submitted successfully!');

  } catch (error) {
    console.error("Error inserting donor data:", error);
    res.status(500).send('Error submitting donor information. Please try again later.');  
  } 
});


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
