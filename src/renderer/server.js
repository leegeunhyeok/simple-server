const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
require('http-shutdown').extend()

class Server {
  constructor () {
    this.started = false
  }

  start (config, listenCallback, loggerCallback) {
    if (this.started) {
      return
    }

    let dirs = []
    let files = []

    const list = fs.readdirSync(config.dir, 'utf-8')
    list.forEach(el => {
      try {
        let stat = fs.statSync(path.join(config.dir, el))
        if (stat.isDirectory()) {
          dirs.push(el)
        } else if (stat.isFile()) {
          files.push(el)
        }
      } catch (e) { }
    })

    this.app = express()

    if (config.cors) {
      this.app.use(cors())
      loggerCallback('Set CORS headers')
    }

    this.app.use('*', (req, res, next) => {
      const afterResponse = () => {
        res.removeListener('finish', afterResponse)
        res.removeListener('close', afterResponse)
        loggerCallback(`${res.req.method} ${res.statusCode} ${res.req.originalUrl}`)
      }

      res.on('finish', afterResponse)
      res.on('close', afterResponse)
      next()
    })

    this.app.use('', express.static(config.dir))
    dirs.forEach(d => {
      this.app.use('/' + d, express.static(path.join(config.dir, d)))
    })

    this.app.get('/', (req, res) => {
      fs.readFile(path.join(config.dir, config.root), (err, data) => {
        if (err) {
          loggerCallback(`Can't read ${err.path.split('\\').pop()}`)
          res.send(`${err.path} 파일을 읽을 수 없습니다: (${err.errno})`)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.write(data)
          res.end()
        }
      })
    })

    return http.createServer(this.app).listen(config.port, () => {
      this.started = true
      listenCallback()
    }).withShutdown()
  }
}

export default Server
