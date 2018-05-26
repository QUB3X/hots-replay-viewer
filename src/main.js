const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')

const parser = require("./parser");

const app = express()

const REPLAY_PATH = path.join(__dirname, '../public/replays/')
const TEMPLATE_PATH = path.join(__dirname, 'templates/index')

app.set('view engine', 'pug')

// Publish /public and /bulma
app.use(express.static('public'))
app.use('/bulma', express.static(path.join(__dirname, '../node_modules/bulma/css')))

app.use(fileUpload({
  safeFileNames: false,
  preserveExtension: true
}))

app.listen(3000, () => console.log('Live on port 3000!'))

app.get('/', (req, res) => res.render(TEMPLATE_PATH, { title: "Home", page: "home" }))

app.get('/upload', (req, res) => res.render(TEMPLATE_PATH, { title: "Upload", page: "upload" }))
app.get('/register', (req, res) => res.render(TEMPLATE_PATH, { title: "Register", page: "register" }))
app.get('/login', (req, res) => res.render(TEMPLATE_PATH, { title: "Login", page: "login" }))

app.post('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).render(TEMPLATE_PATH, { title: "Upload", page: "upload", message: "No files were uploaded! 🤨" })
 
  let replayFile = req.files.replayFile // replayFile is in upload.html
  let replayName = new Date().toISOString() + "_" + replayFile.name // Generate a random name for the replay?
  // Use the mv() method to place the file somewhere on your server
  try {
    replayFile.mv(REPLAY_PATH + replayName, () => {
      console.log("HEY")
      res.render(TEMPLATE_PATH, { title: "Upload", page: "upload", message: "Replay Uploaded Successfully! 🤩" })
      parser.getReplayQueue()
    })
  } catch(err) {
    res.status(500).render(TEMPLATE_PATH, { title: "Upload", page: "upload", message: "Failed to Upload 😦" })
  }
})