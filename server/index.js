const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const authRouter = require('./routers/auth')
const usersRouter = require('./routers/users')
const storiesRouter = require('./routers/stories')
const config = require('./config.json')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/stories', storiesRouter)
app.use('/api/files', express.static(path.join(__dirname, 'media')))

app.use(express.static(path.join(__dirname, 'client-build')))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-build', 'index.html'))
})

const start = async () => {
  try {
    await mongoose.connect(
      config.mongodbURL
    )

    app.listen(4000, () => {
      console.log('listening on port 4000')
    })
  } catch (e) {
    console.log('Error with db')
  }
}

start()
