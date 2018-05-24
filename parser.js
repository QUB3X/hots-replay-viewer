const heroprotocol = require('heroprotocol')

module.exports.parseReplay = function(replayFile) {
  const details = heroprotocol.get(heroprotocol.DETAILS, replayFile);

  if (details)
    return details
  else
    return null
}