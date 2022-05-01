
const express = require('express');
const axios = require('axios');
const path = require('path');
const logger = require('../middleware/logger')
const serverless = require('serverless-http')

const app = express();
const router = express.Router()
 
const headerOptions = {
    "accept": "application/json",
    "X-Cassandra-Token" : process.env.ASTRA_DB_APPLICATION_TOKEN
};

const PORT = process.env.PORT || 5000

const url = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/${process.env.ASTRA_DB_KEYSPACE}`

// ?where={"firstname":{"$in":["Janesha","Mookie"]}}'

let data;
let pageState;

// Use logger to log detail

app.use(logger)

router.get('/', (req, res) => {

  
        axios.get(url+'/policedb/rows', {
            headers: headerOptions
          })
          .then (resp => {
              pageState = resp.data.pageState
              data  = resp.data.data
              res.send({"return" : "data", "Page State": pageState, "data" : data})
          })
          .catch(err => console.log(err));


    
})

module.exports = router