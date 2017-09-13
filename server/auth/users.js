import Blowfish from 'xs-blowfish'
import QueryBuilder from '../lib/query-builder'
import SqlString from 'sqlstring'
import APP_ROOT from 'app-root-path'
import prompt from 'prompt-promise'
import appConfig from '../../app-config.js'

const debug = require('debug')('users')
const HASH_SECRET = '80% accuracy at the speed of light'

// ADD CONSOLE FUNCTIONS
import consoleFunctions from '../lib/console-functions'
consoleFunctions(console, console.log)


// FILTERS & SUCH
const hash = (obj) => {
  let bf = new Blowfish(HASH_SECRET + obj.username)
  return bf.encrypt(JSON.stringify(obj))
}
const sqlize = (value) => typeof value === 'string' ? SqlString.escape(value) : value
const sqlizeDate = (date) => date.toISOString().slice(0, 19).replace('T', ' ')


export const create = (user, cb) => {
  // FILL OUT HASHED COLUMNS
  user.password = hash({ username: user.username, password: user.password })

  let qb = new QueryBuilder
  let keys = Object.keys(user)
  let values = keys.map(key => sqlize(user[key])).join(', ')
  let sql = `INSERT INTO ${appConfig.users.table} (${keys.join(', ')}) VALUES (${values})`

  qb
    .setDB(appConfig.users.database)
    .query(sql, (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(null, { success: true })
      }
    })
}

export const getUser = (user, cb) => {
  let qb = new QueryBuilder
  let params = ['username', 'email']
  let canMatch = false

  qb
    .setDB(appConfig.users.database)
    .from(appConfig.users.table)

  debug('getting user', user)

  params.forEach(param => {
    let value = user[param]

    if (value) {
      canMatch = true
      qb.where(`${param} = '${value}'`)
    }
  })

  if (!canMatch) return cb({ message: 'user lookup requires a username or email address' })

  qb.execute((err, results) => {
    if (err) {
      return cb(err)
    }

    try {
      var user = Object.assign({}, results)
      cb(null, user)
    } catch (err) {
      cb(err, null)
    }
  })
}

export const setPassword = (user, password, cb) => {
  // find user in db
  // create hash from generated user & password
}

export const validate = (userData, cb) => {
  let { username, password, company, email } = userData

  getUser(userData, (err, user) => {
    if (err) {
      return cb({ message: 'invalid login', details: err})
    }
    debug('validating', user)

    let pwd = hash({ username, password })

    if (user.password === pwd) {
      // valid user!  update last accessed
      let now = sqlizeDate(new Date)
      let updateSQL = `UPDATE ${appConfig.users.table} SET dateLastAccessed = '${now}' WHERE id = '${user.id}'`
      let qb = new QueryBuilder

      qb.setDB(appConfig.users.database).query(updateSQL, (err) => {
        if (err) {
          throw new Error(err)
        }

        delete user.password
        cb(null, user)
      })
    } else {
      cb({ message: 'invalid login' })
    }
  })
}

export default {
  create, validate, getUser
}

const commandCreateUser = async function() {
  console.header('creating user...')
  let username = await prompt('username: ')
  let password = await prompt('password: ')
  let company = await prompt('company: ')
  let portfolios = await prompt('portfolios (comma-delimited): ')
  create({ username, password, company, portfolios }, (err, user) => {
    if (!err) {
      debug('OK!')
    } else {
      debug('ERROR', err)
    }
  })
}

const commandValidateUser = async function() {
  debug('validating user...\n')
  let username = await prompt('username: ')
  let password = await prompt('password: ')
  validate({ username, password }, (err, user) => {
    if (!err) {
      debug('OK!')
    } else {
      debug('ERROR', err)
    }
  })
}

let userCommands = process.argv.slice(2)
let availableCommands = {
  create: commandCreateUser,
  validate: commandValidateUser
}

// EXECUTE USER COMMAND
if (userCommands.length) {
  let command = availableCommands[userCommands[0]]
  command && command()
}
