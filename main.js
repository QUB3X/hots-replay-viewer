const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')

const parser = require("./parser");

const app = express()

app.set('view engine', 'pug')

// Publish /public
app.use(express.static('public'))
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css')))

app.listen(3000, () => console.log('Live on port 3000!'))

app.get('/', (req, res) => res.render(path.join(__dirname, 'templates/index'), { title: "Home", page: "home" }))

app.get('/upload', (req, res) => res.render(path.join(__dirname, 'templates/index'), { title: "Upload", page: "upload" }))
app.get('/register', (req, res) => res.render(path.join(__dirname, 'templates/index'), { title: "Register", page: "register" }))
app.get('/login', (req, res) => res.render(path.join(__dirname, 'templates/index'), { title: "Login", page: "login" }))

app.post('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).render(path.join(__dirname, 'templates/index'), { title: "Upload", page: "upload", message: "No files were uploaded! 🤨" })
 
  let replayFile = req.files.replayFile // replayFile is in upload.html
  let replayName = "replay" // Generate a random name for the replay?
  // Use the mv() method to place the file somewhere on your server
  try {
    replayFile.mv(path.join(__dirname, 'public/replays/' + replayName), () => {
      res.render(path.join(__dirname, 'templates/index'), { title: "Upload", page: "upload", message: "Replay Uploaded Successfully! 🤩" })
      
    })
  } catch(err) {
    res.status(500).render(path.join(__dirname, 'templates/index'), { title: "Upload", page: "upload", message: "Failed to Upload 😦" })
  }
})