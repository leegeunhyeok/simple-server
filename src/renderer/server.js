/**
 * @author geunhyeok LEE
 * @license MIT
 */

const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
require('http-shutdown').extend()

/**
 * @class Server class.
 */
class Server {
  /**
   * @constructor
   */
  constructor () {
    // Server running status.
    this.running = false
  }

  /**
   * @description Create server and start.
   * @param {any} config port, options.
   * @param {function} listenCallback Will be called after server is running.
   * @param {function} loggerCallback Will be called after http response.
   */
  start (config, listenCallback, loggerCallback) {
    // If running property of this server instance is true, Can't starting.
    if (this.running) {
      return
    }

    let dirs = [] // Server directories
    let files = [] // Server files

    // Read server directories (Directory, File)
    const list = fs.readdirSync(config.dir, 'utf-8')
    list.forEach(el => {
      try {
        let stat = fs.statSync(path.join(config.dir, el))
        if (stat.isDirectory()) {
          dirs.push(el)
        } else if (stat.isFile()) {
          files.push(el)
        }
      } catch (e) { /* ... */ }
    })

    // Create express object.
    this.app = express()

    /**
     * @description CORS option enabled.
     */
    if (config.cors) {
      // Set CORS middleware.
      this.app.use(cors())
      loggerCallback('Set CORS headers')
    }

    /**
     * Routing log middleware.
     */
    this.app.use('*', (req, res, next) => {
      /**
       * @description The logger function is called after the response ends.
       */
      const afterResponse = () => {
        // This function is removed from the listener of response.
        res.removeListener('finish', afterResponse)
        res.removeListener('close', afterResponse)
        loggerCallback(`${res.req.method} ${res.statusCode} ${res.req.originalUrl}`)
      }

      // Add afterResponse function to listener.
      res.on('finish', afterResponse)
      res.on('close', afterResponse)

      // Next middleware.
      next()
    })

    /**
     * Set current server directory and folders to static directory.
     */
    this.app.use('', express.static(config.dir))
    dirs.forEach(d => {
      this.app.use('/' + d, express.static(path.join(config.dir, d)))
    })

    /**
     * Web server root routing.
     */
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

    if (config.api) {
      const { list } = config.api

      list.forEach((apiInfo, idx) => {
        this.app.get('/api' + apiInfo.path, (req, res) => {
          fs.readFile(apiInfo.file, 'utf8', (err, data) => {
            if (err) {
              res.json({ err })
            } else {
              try {
                res.json(JSON.parse(data))
              } catch (e) {
                res.json({ err: e })
              }
            }
          })
        })

        loggerCallback(`API #${idx + 1} Enabled - GET /api${apiInfo.path}`)
      })
    }

    /**
     * Custom route with response
     */
    if (config.custom) {
      const {
        path,
        method,
        contentType,
        data
      } = config.custom

      this.app[method](path, (req, res) => {
        res.writeHead(200, { 'Content-Type': contentType })
        res.write(data)
        res.end()
      })

      loggerCallback(`Custom route enabled. [${method.toUpperCase()} ${path}] will be response ${contentType} type data`)
    }

    /**
     * Create express server and listen
     */
    return http.createServer(this.app).listen(config.port, () => {
      this.running = true // Change server running status.
      listenCallback() // Call listen callback func.
    }).withShutdown()
  }
}

// Export Server class
export default Server
