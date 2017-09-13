import mysql from 'mysql'
import comysql from 'co-mysql'
import APP_ROOT from 'app-root-path'
import debug from 'debug'
const credentials = require(APP_ROOT + '/credentials.json')
const databases = require(APP_ROOT + '/databases.json')
const message = debug('database')

export default {
  get(alias) {
    message('get db with alias', alias)
    if (!alias) {
      // console.log(databases)
      var alias = Object.keys(databases)[0]
      message('alias not defined, using default', alias)
    }
    let db = databases[alias]
    let dbConfig = Object.assign({
      connectionLimit: 10,
      host: db.host,
      database: db.database,
      multipleStatements: true,
      debug: false
    }, credentials[alias])
    message('creating connection', dbConfig)
    let pool = mysql.createPool(dbConfig)
    let connection = comysql(pool)

    return connection
  }
}
