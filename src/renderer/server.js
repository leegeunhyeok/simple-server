const express = require('express')
const http = require('http')
require('http-shutdown').extend()

class Server {
  constructor () {
    this.started = false
  }

  start (port, dir, listenCallback, routeCallback) {
    if (this.started) {
      return
    }

    this.app = express()
    this.app.use('*', (req, res, next) => {
      routeCallback(req.method, req.originalUrl)
      next()
    })
    this.app.get('/', (req, res) => {
      res.send('Testing..')
    })
    return http.createServer(this.app).listen(port, () => {
      this.started = true
      listenCallback()
    }).withShutdown()
  }

  close () {
    if (this.started && this.server) {
      this.server.close()
      this.server = null
      this.started = false
    }
  }
}

export default Server
