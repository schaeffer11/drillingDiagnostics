import express from 'express'
// import odb from './../../models/odb'

let app = express()

const env = process.env.NODE_ENV || 'dev'
const isProduction = env === 'production'

// First sample route to query db
app.get('/get_all', (req, res) => {
  // odb.findAll(collection, query, (err, doc) => {
  //   if(err) {
  //     console.log('do something here', err)
  //     res.status(500).send()
  //   } else {
  //     res.json(doc)
  //   }
  // })
  res.end()
})

export default app