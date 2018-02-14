const express = require('express')
const next = require('next')

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/stories/:id', (req, res) => {
    const actualPage = '/redux-story'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/status', (_, res) => {
    const result = { status: 'online' }
    return res.json(result)
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
