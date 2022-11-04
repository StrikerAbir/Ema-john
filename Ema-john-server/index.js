const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;

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

async function run(){
    try {
        const productCollection = client.db('emaJohn').collection('products');

        app.get('/products', async (req, res) => {
            const currentPage = parseInt(req.query.currentPage);
            const perPage = parseInt(req.query.perPage);
            // console.log(currentPage,perPage);
            const query = {};
            const cursor = productCollection.find(query);
            // const products = await cursor.toArray();
            // const products = await cursor.limit(10).toArray();
            const products = await cursor.skip(currentPage*perPage).limit(perPage).toArray();
            const count = await productCollection.estimatedDocumentCount();
            res.send({count,products})
        })

        app.post("/productsByIds", async (req, res) => {
          const ids = req.body;
          console.log(ids);
          const objectIds = ids.map((id) => ObjectId(id));
          const query = { _id: { $in: objectIds } };
          const cursor = productCollection.find(query);
          const products = await cursor.toArray();
          res.send(products);
        });
    }
    finally {
        
    }
}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('ema john server running');
})

app.listen(port, () => {
    console.log('running on ',port)
})