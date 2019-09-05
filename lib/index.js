const getEmojis = require('./scrapers/get-emojis.js')

exports.getEmojis = function () {
  return new Promise((resolve, reject) => {
    getEmojis(undefined, (error, data) => {
      if (error) return reject(error)
      resolve(data)
    })
  })
}
