const yoloScraper = require('yolo-scraper')
const schema = require('../../schemas/emojis.json')

module.exports = yoloScraper.createScraper({

  request: function () {
    return {
      method: 'GET',
      url: 'https://slackmojis.com/'
    }
  },

  extract: function (response, body, $) {
    return $('li.emoji').toArray().map(li => this.extractEmoji($, li))
  },

  extractEmoji: function ($, li) {
    const $li = $(li)
    const $a = $($li.find('a')[0])

    return {
      name: $li.attr('title'),
      filename: $a.attr('download'),
      url: $a.attr('href')
    }
  },

  schema
})
