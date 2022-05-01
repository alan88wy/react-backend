
const express = require('express');
const axios = require('axios');
// const fetch = require('node-fetch');
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

// retrieve all rows 
// page-size : return x no of rows
// page-state : move the cursor to a particular resule
// /api/rest/v2/keyspaces/awcrm/users/rows?page-size=2&page-state=2&raw=true' 

// ?where={"firstname":{"$in":["Janesha","Mookie"]}}'

let data;
let pageState;

// Let's get Users data

// fetch(url+'/policedb/rows?page-size=5&raw=true?page-size=50', {
//     method: 'GET',
//     headers: headerOptions
// }).then(res => res.json())
//   .then(json => {
//       pageState = json.pageState
//       data = json.data
//   })
//   .catch(err => console.log(err));

// axios.get(url+'/policedb/rows', {
//     headers: headerOptions
//   })
//   .then (res => {
//       pageState = res.data.pageState
//       data  = res.data.data
//   })
//   .catch(err => console.log(err));

// Use logger to log detail

// app.use(logger)

router.get('/', (req, res) => {

    // try {
        axios.get(url+'/policedb/rows', {
            headers: headerOptions
          })
          .then (resp => {
              pageState = resp.data.pageState
              data  = resp.data.data
              res.send({"return" : "data", "Page State": pageState, "data" : data})
          })
          .catch(err => console.log(err));
    // }
    // catch(err){
    //         console.error("GG", err);
    // }

    
})

// app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`)
// })

// app.use('/.netlify/functions/api', router);

app.use('/', router)

module.exports.handler = serverless(app);