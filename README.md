# slackmojis-scraper

[![Build Status](https://travis-ci.org/masterT/slackmojis-scraper.svg?branch=master)](https://travis-ci.org/masterT/slackmojis-scraper)

> A scraper for https://slackmojis.com/

## Requirements

- Node.js >= v10.16.3
- npm

## Install

Using npm:

```shell
npm install --save masterT/slackmojis-scraper
```

## Usage

### getEmojis

Return a _Promise_ that resolve with an _Array_ of emojis.

```js
cosnt SlackmojisScraper = require ('slackmojis-scraper')

SlackmojisScraper.getEmojis()
  .then((emojis) => {
    console.log(emojis[0])
    // {
    //   name: 'troll',
    //   filename: 'troll.png',
    //   url: 'https://emojis.slackmojis.com/emojis/images/1463602125/429/troll.png?1463602125' }
    // }
  .catch((error) => {
    console.log(error)
  })
```

## Developement

Install dependencies:

```shell
npm install
```

## Test

Feature tests are run _daily_, thank to Travis Ci new feature [CRON Jobs](https://docs.travis-ci.com/user/cron-jobs/). This way we know if the scraper is ever broken.

Run the tests:

```shell
npm test
```

## License

MIT
