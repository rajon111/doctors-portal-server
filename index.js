const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://doctor_admin:EInSbxduUdlruimb@cluster0.njce8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const serviecCollection = client.db('doctors_portal').collection('services')
    
    app.get('/service', async(req,res)=>{
      const query ={}
      const cursor = serviecCollection.find(query)
      const services = await cursor.toArray()
      res.send(services)
    })
    /*
    *API Naming convention
    * app.get('/booking) //get all booking or get more then one booking 
    */

  }
  finally {

  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello From Doctor Uncle!')
})

app.listen(port, () => {
  console.log(`Doctors App listening on port ${ port }`)
})