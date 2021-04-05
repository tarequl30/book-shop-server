const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(bodyParser.json())
app.use(cors());

const port = 5000



const uri = "mongodb+srv://heroShop:heroShop79@cluster0.5gken.mongodb.net/heroShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("heroShop").collection("books");

  app.get('/books', ( req,res ) => {
      collection.find()
      .toArray((err, items) => {
        res.send(items)
        console.log(items)
      })
  })

  app.post('/addBooks', (req, res) => {
    const product = req.body
    collection.insertOne(product)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
  }) 
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)