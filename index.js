const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectId

const app = express()
app.use(bodyParser.json())
app.use(cors());

const port = 5000



const uri = "mongodb+srv://heroShop:heroShop79@cluster0.5gken.mongodb.net/heroShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("heroShop").collection("books");
  const ordersCollection = client.db("heroShop").collection("orders")

  app.get('/books', ( req,res ) => {
      collection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })

  app.get("/getOrder", (req, res) => {
    ordersCollection.find()
    .toArray((err, docs) => {
      res.send(docs)
    })
  })

  app.post('/addBooks', (req, res) => {
    const product = req.body
    collection.insertOne(product)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
  }) 

  app.post("/takeOrder", (req, res) => {
    const order = req.body
    ordersCollection.insertOne(order)
    .then(result => {
      res.send(result.insertedCount> 0)
    })
    console.log(order)
  })

  app.delete("/deleteBook/:id", (req, res) => {
    const key = req.params.id
    Collection.deleteOne({_id: objectId(key)})
    .then(result => {
      res.send(result.deletedCount > 0)
    })
  })
  
  app.delete("/deleteOrderBook/:id", (req, res) => {
    const key = req.params.id
    ordersCollection.deleteOne({_id: objectId(key)})
    .then(result => {
      res.send(result.deletedCount > 0)
    })
  })

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)