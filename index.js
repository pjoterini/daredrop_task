require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const streamersRoutes = require('./routes/streamers')

const app = express()

app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/streamers', streamersRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Database connected. listening on port 4000')
    })
  })
  .catch((error) => {
    console.error(error)
  })
