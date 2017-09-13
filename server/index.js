import 'regenerator-runtime/runtime'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import session from 'express-session'
import config from '../app-config'
import bodyParser from 'body-parser'
import { autoRefreshSession } from './auth/session-store'
import logger from './logger'
import pkg from '../package.json'
import compression from 'compression'
import api from './api/api'

// CONFIG & ENVIRONMENT
const env = process.env.NODE_ENV || 'dev'
const isProduction = env === 'production'

const PORT = process.env.PORT || 3008

// INITIALIZE APP SERVER
console.log(`initializing ${pkg.description} server in ${env} mode...`)
var app = express()

// ENABLE GZIP COMPRESSION
// app.use(compression())

// ENABLE USER SESSIONS
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'kitty cat of kittens',
  saveUninitialized: true,
  resave: true
}))

// ENABLED FORM BODY PARSING
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

// ENABLE OUTPUT LOGGING
app.use(morgan('dev'))

// ENABLE SESSION REFRESHING ON REQUEST
app.use(autoRefreshSession)

// ENABLE STATIC CONTENT DELIVERY
app.use(express.static(path.join(__dirname, (!isProduction ? '../dist-dev/client' : '/client'))))
// app.use(express.static(path.join(__dirname, (!isProduction ? '../dist/images' : '/client'))))

// ENABLE AUTHENTICATION
import auth from './auth/index'
app.use(auth)

// ENABLE LOGGING AND CACHE CONTROL
app.use(logger)

app.use('/api', api)
  // VERSION & PACKAGE CHECKING
app.get('/version', (req, res) => {
  let { name, version, description } = pkg
  let { title } = config
  res.json({ name, title, description, version, deployed: new Date })
})

// CREATE HTTP SERVER
var httpServer = app.listen(PORT, function() {
  console.log(`HTTP server listening on port ${httpServer.address().port}`)
})
