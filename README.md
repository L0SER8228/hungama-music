[![NPM stats](https://nodei.co/npm/hungama-music.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hungama-music/)
[![Version](https://img.shields.io/npm/v/hungama-music?logo=npm&label=version)](https://www.npmjs.com/package/hungama-music?activeTab=versions)
[![NPM downloads](https://img.shields.io/npm/dt/hungama-music?logo=npm)](https://npmjs.org/package/hungama-music)
[![License](https://img.shields.io/github/license/l0ser8228/hungama-music)](https://github.com/L0SER8228/hungama-music/blob/main/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/hungama-music)](https://www.npmjs.com/package/hungama-music)
![NPM collaborators](https://img.shields.io/npm/collaborators/hungama-music?logo=npm&label=collaborators)
[![GitHub contributors](https://img.shields.io/github/contributors/l0ser8228/hungama-music?logo=github)](https://github.com/l0ser8228/hungama-music/contributors)
[![GitHub stars](https://img.shields.io/github/stars/l0ser8228/hungama-music?logo=github)](https://github.com/l0ser8228/hungama-music/stargazers)
[![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/l0ser8228/hungama-music)](https://github.com/l0ser8228/hungama-music)
[![GitHub issues](https://img.shields.io/github/issues/l0ser8228/hungama-music)](https://github.com/l0ser8228/hungama-music/issues)

# hungama-music
Get info and download music from **[https://hungama.com](https://hungama.com)**.

# Examples

## Download audio

```js
const fs = require("fs");
const https = require("https");

(async () => {
  const hungama = require("hungama-music");
  const url = "https://www.hungama.com/song/once-upon-a-time/87546214/";

  const info = await hungama.getInfo(url);
  const streamURL = await hungama.download(info.stream);
  const stream = fs.createWriteStream(`./test/${info.name.replace(/ /g, "_")}.${streamURL.type}`);

  https.get(streamURL.link, (response) => {
    response.pipe(stream);
  });
})();

```

## Get basic info

```js
const hungama = require("hungama-music");

hungama.getInfo("https://www.hungama.com/song/once-upon-a-time/87546214/")
.then(console.log);
```


## Supporters
[![Stargazers repo roster](https://reporoster.com/stars/l0ser8228/hungama-music)](https://github.com/l0ser8228/hungama-music/stargazers)

[![Forkers repo roster](https://reporoster.com/forks/l0ser8228/hungama-music)](https://github.com/l0ser8228/hungama-music/network/members)