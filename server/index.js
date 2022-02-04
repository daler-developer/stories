const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const authRouter = require('./routers/auth')
const usersRouter = require('./routers/users')
const storiesRouter = require('./routers/stories')

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
      'mongodb+srv://dalersaidov:2000909k@cluster-for-learning.uecly.mongodb.net/stories-mern?retryWrites=true&w=majority'
    )

    app.listen(process.env.PORT || 4000)
    console.log('listening')
  } catch (e) {
    console.log('db error', e)
  }
}

start()
