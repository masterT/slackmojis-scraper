/* eslint-env jasmine */
const SlackmojisScraper = require('../lib/index.js')

describe('SlackmojisScraper', () => {
  describe('getEmojis', () => {
    it('returns a Promise that resolve with emojis', (done) => {
      SlackmojisScraper.getEmojis()
        .then((emojis) => expect(emojis.length).toBeGreaterThan(0))
        .catch((error) => expect(error).toEqual(null))
        .then(done)
    })
  })
})
