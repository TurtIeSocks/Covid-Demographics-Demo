/* eslint-disable no-console */
const express = require('express')
const path = require('path')
const data = require('./data.json')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/data', (req, res) => {
  try {
    res.status(200).json(data)
  } catch (e) {
    console.error('Unable to forward data request to client')
    res.status(500).json({ error: e.message })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening on port: ${port}`)
})
