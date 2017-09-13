'use strict';

import mongoose from 'mongoose'
import SchemaEIN from './EIN'
import queue from 'async/queue'
import inquirer from 'inquirer'
import fs from 'fs'

mongoose.Promise = Promise

// const cfg = {
//   database: 'qdca',
//   host: '172.19.7.70',
//   port: 27017,
// }

// mongoose.connect(`mongodb://${cfg.host}:${cfg.port}/${cfg.database}`, {
//   useMongoClient: true,
//   socketTimeoutMS: 60000,
//   connectTimeoutMS: 60000
// })

mongoose.connect(`mongodb://localhost/localEIN`, {
  useMongoClient: true,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000
})

const db = mongoose.connection

db.on('error', (err) => {
  console.log('mongoose error', err)
})

db.once('open', () => {
  console.log('Mongoose connection successful!')
})

// Here we create our helper functions that will allow us to query the db.
/*
Sample: mongoose.model(collection, schema).find(query, things to get, callback)

- Collection is where the data is stored in a database. A Mongo database is devided in collections (think of a table), and each collection contains documents (think rows).
- Schema is the database Schema that you will be querying.
- Find is the function that will allow you to query data. I takes a query object, a things to get out object (so which nodes should be extracted), and a callback that returns either an error or a document.  

Query strings typically look like this: 
query = {
  name: 'findThisName'
}

To get specific nodes as a document the object looks like this:
getOut = {
  name: 1,
  _id: 0
}
A 1 means it will only return a document with that node. a 0 will not return a specific node.  

Note: Mongo will alwoays create a unique id labeled as _id.  This id will always be returned in the document. If you don't want it just set _id: 0 in the get out object. 
*/

export default {
  findAll: (collection, query, cb) => {
    mongoose.model(collection, EINSchema).find(query, {}, (err, doc) => {
      err ? cb(err) : cb(null, doc)
    })
  },

  insertEINData: (questions, cb) => {
    let q = queue(({collection, ein, isDone, fileLength, cb}, callback) => {
      const indvEIN = mongoose.model(collection, SchemaEIN)
      const entry = new indvEIN(ein)
      entry.save((err, doc) => {
        if(err) {
          throw err
        } else {
          console.log('inserted: ', ein.name)
          callback(err)
          if(isDone) {
            cb(fileLength)
          }
        }
      })
    }, 8)
    
    db.on('open', () => {
      inquirer.prompt(questions).then((answers) => {
        let { collection, address } = answers
        let file = require(address)
        let fileCount = 0
        const fileLength = file.length
        
        file.forEach((ein) => {
          fileCount++
          let isDone = fileCount == file.length ? true : false
          q.push({ collection, ein, isDone, fileLength, cb })
        })
      })
    })
  }
}