const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const user = process.env.USER;
const password = process.env.PASS

const uri =
  `mongodb+srv://${user}:${password}@cluster0.nvx6pod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.get('/', (req, res) => {
    res.send('ema john server running');
})

app.listen(port, () => {
    console.log('running on ',port)
})