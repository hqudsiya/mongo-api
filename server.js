const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://mongo:mongodb@azuredatabase.zz4mfjr.mongodb.net/?retryWrites=true&w=majority&appName=AzureDatabase";

app.use(express.json());

app.post('/insert', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("store");
    const collection = db.collection("product_type");
    const result = await collection.insertOne(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
