const heroprotocol = require('heroprotocol')
const fs = require('fs')
const path = require('path')
const replayDir = path.join(__dirname, '../public/replays/')

/**
 * Parse the replay and return a JSON object
 * @param {replayFile} "The StormReplay File"
 */
parseReplay = (replayFile) => {
  try {
    return heroprotocol.get(heroprotocol.DETAILS, replayFile)
  } catch(err) {
    throw err
    return null
  }
}

/**
 * Get files in the /replay directory
 * then it parse them
 * if a replay is parsed correctly, it is removed from /replays 
 */
getReplayQueue = () => {
  console.log("Hello")
  fs.readdir(replayDir, (err, files) => {
    if (err) throw err

    for(let file of files) {
      console.log(file)
      try {
        let data = parseReplay(file)
      } catch(err) {
        throw err
      }
    }
  })
}

module.exports = {
  parseReplay: parseReplay,
  getReplayQueue: getReplayQueue
}