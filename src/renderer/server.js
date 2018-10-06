const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
require('http-shutdown').extend()

class Server {
  constructor () {
    this.started = false
  }

  start (port, dir, root, listenCallback, routeCallback) {
    if (this.started) {
      return
    }

    let dirs = []
    let files = []

    const list = fs.readdirSync(dir, 'utf-8')
    list.forEach(el => {
      try {
        let stat = fs.statSync(path.join(dir, el))
        if (stat.isDirectory()) {
          dirs.push(el)
        } else if (stat.isFile()) {
          files.push(el)
        }
      } catch (e) { }
    })

    this.app = express()
    this.app.use('*', (req, res, next) => {
      routeCallback(res.req.method, res.req.originalUrl)
      next()
    })

    dirs.forEach(d => {
      this.app.use('/' + d, express.static(path.join(dir, d)))
    })

    this.app.get('/', (req, res) => {
      fs.readFile(path.join(dir, root), (err, data) => {
        if (err) {
          res.send(`${err.path} 파일을 읽을 수 없습니다: (${err.errno})`)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.write(data)
          res.end()
        }
      })
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
