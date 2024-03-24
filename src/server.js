const express = require('express');
require ('dotenv').config();
const { MongoClient } = require('mongodb');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.POST || 3000;

//config file upload
app.use(fileUpload());

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

//config template engine
configViewEngine(app);

// config route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

//test conection
(async () =>{
  try {
    
    await connection();

    // const url = process.env.DB_HOST_URL;
    // const client = new MongoClient(url);

    // // Database Name
    // const dbName = process.env.DB_NAME;

    //await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('customers');
    // await collection.insertOne({
    //   name: 'Le Tri Dung TB',
    // });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
})();




