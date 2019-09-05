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

Return a _Promise_ that resolve with an _Array_ of emoji that matches the JSON schema [schemas/emojis.json](schemas/emojis.json).

Usage:

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

## Examples

### Downloader

> [examples/downloader.js](examples/downloader.js)

Download all the emojis in a directory, by default it will download it in the `./tmp` directory. This pairs well with the [slack-emoji-upload](https://github.com/sgreben/slack-emoji-upload).

Usage:

```shell
node examples/downloader.js
```

Output:

```
Downloading 827 emojis in ./tmp directory.
...........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
Done!
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
