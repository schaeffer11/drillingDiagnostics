export default (function(global) {

  function ApiStore() {
    this.gateway = 'rest/gatewayservice/api?parameter='
    this.geoserver = 'rest/gatewayservice/api/geoserver?parameter='
    this.localStorageKey = 'SPA:ApiStore'
    this.cache = this.getPersistedState() || {}
    this.output = true
    this.recycleLevel = 0.5
  }

  function handleErrors(response) {
    return response.json().then(json => {
      if (!response.ok) {
        throw Error(json.message || 'API Error')
      }
      return response.ok ? json : Promise.reject(json)
    })
  }

  /*

  SETUP: SET THE INTERNAL PORTFOLIO ATTRIBUTE

    ApiStore.setPortfolio(1003001) // (call only when portfolio changes)


  EXAMPLE1: SIMPLE STRING URL

    ApiStore.get('/production?well=' + 1241412, function(err, data) {
      do something with the data
    })


  EXAMPLE2: URL OBJECT WITH PARAMS

    ApiStore.get({
      path: '/wellDescription',
      params: {
        well: wUID
      }
    }, function(err, data) {
      do something with the data
    })


  EXAMPLE: FULL /spa/... URL (skips all internal helper logic)

    ApiStore.get('/spa/cache/index', function(err, data) {
      do something with the data
    })

  */

  ApiStore.prototype.get = function(pathOrObject, callback) {
    var instance = this
    var url = this.getUrl(pathOrObject)
    console.time('ApiStore:fromCache ' + url)
    console.time('ApiStore:fromAPI ' + url)

    // RETURN CACHED VERSION IF CACHED
    var cachedPromise = this.cache[url]
    if (cachedPromise) {
      // instance.output && console.timeEnd('ApiStore:fromCache ' + url)

      if (callback) {
        cachedPromise.then(data => callback(null, data))
      }

      return cachedPromise
    }

    let fetchPromise = fetch(url, {
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      .then(handleErrors)
      .catch(err => {
        console.warn('API ERROR', err.message)
        instance.clear(url)
      })

    instance.save(url, fetchPromise)

    fetchPromise.then(() => {
      instance.output && console.timeEnd('ApiStore:fromAPI ' + url)
    })

    if (callback) {
      fetchPromise.then(data => callback(null, data))
    }

    return fetchPromise
  }

  ApiStore.prototype.async = function(path) {
    let self = this

    return function(callback) {
      return self
        .get(path)
        .catch(err => {
          console.warn('API ERROR', err.message)
        })
        .then(data => callback(null, data))
    }
  }

  ApiStore.prototype.auth = function(user, callback) {
    var url = '/auth'
    console.log('auth', user)
    let fetchPromise = fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      credentials: 'include',
      body: Object.keys(user).map(attr => `${attr}=${encodeURIComponent(user[attr])}`).join('&')
    })
    .then(handleErrors)
    console.log('sumething crazy', Object.keys(user).map(attr => `${attr}=${encodeURIComponent(user[attr])}`).join('&'))
    console.log('callback?', callback)
    if (callback) {
      fetchPromise.then(data => callback(data ? null : true, data))
    }

    return fetchPromise
  }

  ApiStore.prototype.logout = function(callback) {
    var url = '/auth/logout'

    let fetchPromise = fetch(url, {
      method: 'post',
      credentials: 'include'
    })
    .then(handleErrors)

    if (callback) {
      fetchPromise.then(data => callback(data ? null : true, data))
    }

    return fetchPromise
  }

  ApiStore.prototype.getUrl = function(pathOrObject) {
    var userPath = typeof pathOrObject === 'object' ? pathOrObject.path : pathOrObject
    var newPath = ''
    var params = pathOrObject.params

    // handle path in string form
    if (userPath.indexOf('http') === 0) {   // is a fixed call (e.g. /spa/cache/index)
      newPath = userPath
    } else {                                    // everything else
      newPath = '/api'
      if (this.portfolioID && userPath.indexOf('/') !== 0) {
        newPath += '/portfolios/' + this.portfolioID + '/' + userPath
      } else {
        newPath += userPath
      }
    }

    if (params) {
      newPath += '?' + Object.keys(params)
                        .filter(function(key) { return params[key] ? key : false })
                        .map(function(key) { return key + '=' + params[key] })
                        .join('&')
    }

    return newPath.replace(/(\w)\/\/(\w)/g,'$1/$2')
  }

  ApiStore.prototype.getGatewayUrl = function(pathOrObject) {
    return this.gateway + encodeURI(this.getUrl(pathOrObject))
  }

  ApiStore.prototype.clear = function(path) {
    if (!path) {
      this.cache = {}
    } else {
      delete this.cache[this.getUrl(path)]
    }

    return this//.persist()
  }

  ApiStore.prototype.clearPersistedState = function() {
    localStorage && localStorage.clear(this.localStorageKey)

    return this
  }

  ApiStore.prototype.getPersistedState = function() {
    console.time('ApiStore:loadPersisted')
    var stored = localStorage && localStorage.getItem(this.localStorageKey)
    if (stored) {
      this.output && console.timeEnd('ApiStore:loadPersisted')
      return JSON.parse(stored)
    }

    return undefined
  }

  ApiStore.prototype.persist = function() {
    if (localStorage) {
      try {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cache))
      } catch(err) {
        this.recycle(this.recycleLevel)
      }
    }

    return this
  }

  ApiStore.prototype.save = function(key, value) {
    this.cache[key] = value

    return this//.persist()
  }

  ApiStore.prototype.setPortfolio = function(pUID) {
    this.portfolioID = pUID

    return this
  }

  ApiStore.prototype.recycle = function(percent) {
    var cacheList = this.getCacheByTime()
    var recycleList = cacheList.slice(0,cacheList.length * percent)

    console.warn('ApiStore:recycling', recycleList.length, 'entries')
    recycleList.forEach(function(entry) {
      delete this.cache[entry.key]
    }, this)
  }

  ApiStore.prototype.getCacheByTime = function() {
    var unsorted = Object.keys(this.cache).map(function(key) {
      return { key: key, created: this.cache[key].created, time: this.cache[key].time }
    }, this)

    var sorted = unsorted.sort(function(a, b) {
      return a.time - b.time
    })

    return sorted
  }

  return global.API = new ApiStore()
})(window)
