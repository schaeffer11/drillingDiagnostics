import StringTimer from './string-timer'
import debug from 'debug'
import db from './db'

const message = debug('query-builder')

export default class QueryBuilder {
  constructor(options) {
    this._query = {
      select: [],
      sql: null,
      from: null,
      where: [],
      joins: [],
      groupBy: [],
      orderBy: [],
      limit: 100000
    }

    this.options = options || {}
    this.postFilters = []
    this.transforms = []
    this.setDB()
  }

  addPostFilter(filter) {
    this.postFilters.push(filter)

    return this
  }

  addTransform(transform) {
    this.transforms.push(transform)

    return this
  }

  // shorthand syntax and === where
  and(condition){
    return this.where(condition)
  }

  // shorthand syntax andWhere === where
  andWhere(condition) {
   return this.where(condition)
  }

  query(sql, callback) {
    return this.fromSQL(sql).execute(callback)
  }

  execute(callback) {
    let {sql, from} = this._query

    try {
      if (!(sql || from)) {
        return callback('No API target defined')
      }
      let time = new StringTimer()

      return this.db.query(this.toSQL(), (err, results) => {
        message(`query execution: ${time}`, results)
        let data = results
        if (results && results.pop) {
          data = results.pop()
        }

        if (!err && results) {
          if (this.postFilters.length) {
            this.postFilters.forEach(filter => data = filter(data))
            message(`filter processing: ${time}`)
          }

          if (this.transforms.length) {
            this.transforms.forEach(transform => data = transform(data))
            message(`transform processing: ${time}`)
          }
        }

        message(`total execution time: ${time.total}`)
        return callback(err, data)
      })
    } catch(err) {
      message('ERROR executing sql:', this.toSQL(), err)
    }
  }

  from(table, alias) {
    this._query.from = table + (alias ? ` as ${alias}` : '')

    return this
  }

  fromSQL(sql) {
    this._query.sql = sql

    return this
  }

  getJoins() {
    let joinStr = ''
    this._query.joins.forEach(join => {
      let {table, alias} = join
      joinStr += ` INNER JOIN ${table}` + (alias ? ` AS ${alias}` : '')
    })

    return joinStr
  }

  getOptions() {
    return this.options
  }

  groupBy(groupBy = []) {
    (Array.isArray(groupBy) && groupBy || [groupBy]).forEach(s => {
      if (s) {
        this._query.groupBy.push(s)
      }
    })

    return this
  }

  join(table, alias) {
    this._query.joins.push({
      table, alias
    })

    return this
  }

  limit(num) {
    this._query.limit = num

    return this
  }

  orderBy(orderBy = []) {
    (Array.isArray(orderBy) && orderBy || [orderBy]).forEach(s => {
      if (s) {
        this._query.orderBy.push(s)
      }
    })

    return this
  }

  select(select = []) {
    (Array.isArray(select) && select || [select]).forEach(s => {
      if (s) {
        this._query.select.push(s)
      }
    })

    return this
  }

  setDB(alias) {
    this.db = db.get(alias)

    return this
  }

  setOptions(options) {
    message('extending query options', this.options, options)
    Object.assign(this.options, options || {})

    message('extended query options', this.options)
    return this
  }

  setPortfolio(id) {
    this.portfolioID = parseInt(id)
    if (id) {
      this.where(`pUID = ${id}`)
    }

    return this
  }

  setWell(id) {
    if (id && parseInt(id)) {
      this.where(`wUID = ${id}`)
    }

    return this
  }

  toSQL() {
    let {select, where, from, sql, limit, groupBy, orderBy} = this._query
    let joins = this.getJoins()

    select = select.length ? select.join(', ') : '*'
    groupBy = groupBy.length ? ('GROUP BY ' + groupBy.join(', ')) : ''
    orderBy = orderBy.length ? ('ORDER BY ' + orderBy.join(', ')) : ''
    where = where.length ? ('WHERE ' + where.join(' AND ')) : ''
    limit = limit ? `LIMIT ${limit}` : ''

    sql = sql || `SELECT ${select} FROM ${from} ${joins} ${where} ${groupBy} ${orderBy} ${limit}`

    // sql = sql.replace(/^SELECT/,'SELECT SQL_NO_CACHE')

    message('toSQL() =>', sql)

    return sql
  }

  where(condition) {
    let { where } = this._query
    where.push(condition)

    return this
  }
}
