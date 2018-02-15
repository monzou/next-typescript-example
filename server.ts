const express = require('express')
const next = require('next')

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/stories/:id', (req, res) => {
    app.render(req, res, '/story', {
      id: req.params.id
    })
  })

  server.get('/status', (_, res) => {
    return res.json({
      status: 'active'
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }
  })
})
