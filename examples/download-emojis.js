const fs = require('fs')
const path = require('path')
const http = require('https')

const SlackmojisScraper = require('../lib/index.js')

function promiseMap (collection, func) {
  function aux (collection, results) {
    const element = collection.shift()
    return func(element)
      .then((result) => {
        results.push(result)
        if (collection.length === 0) {
          return results
        } else {
          return aux(collection, results)
        }
      })
      .catch((error) => {
        console.error(error)
        if (collection.length === 0) {
          return results
        } else {
          return aux(collection, results)
        }
      })
  }
  return aux(collection, [])
}

function downloadEmojis (dirPath, callbacks) {
  // Create directory if needed.
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  return SlackmojisScraper.getEmojis()
    .then((emojis) => {
      // Execute callback.
      if (typeof callbacks.beforeAll === 'function') {
        callbacks.beforeAll(emojis)
      }

      return promiseMap(emojis, (emoji) => {
        // Execute callback.
        if (typeof callbacks.beforeEach === 'function') {
          callbacks.beforeEach(emoji)
        }
        // Download emoji.
        const emojiFilePath = path.join(dirPath, emoji.filename)
        const file = fs.createWriteStream(emojiFilePath)
        return new Promise((resolve, reject) => {
          const request = http.get(emoji.url, (response) => {
            // Handle invalid request.
            if (response.statusCode !== 200) {
              fs.unlink(emojiFilePath, () => {
                reject(new Error('Invalid status code, expected 200, got ' + response.statusCode))
              })
            }
            response.pipe(file)

            // Handle write success.
            file.on('finish', () => {
              file.close()
              resolve(emoji)
            })

            // Handle write error.
            file.on('error', (error) => {
              fs.unlink(emojiFilePath, () => {
                reject(error)
              })
            })
          })

          // Handle network error.
          request.on('error', (error) => {
            fs.unlink(emojiFilePath, () => {
              reject(error)
            })
          })
        })
      })
    })
}

downloadEmojis('./tmp', {
  beforeAll: (emojis) => {
    console.log('Downloading %i emojis in ./tmp directory.', emojis.length)
  },
  beforeEach: (emojis) => {
    process.stdout.write('.')
  }
})
  .then(() => {
    console.log()
    console.log('Done!')
  })
