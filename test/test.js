const fs = require("fs");
const https = require("https");

(async () => {
  const hungama = require("../index");
  const url = "https://www.hungama.com/song/once-upon-a-time/87546214/";

  const info = await hungama.getInfo(url);
  console.log(info);

  const streamURL = await hungama.download(info.stream);
  const stream = fs.createWriteStream(`./test/${info.name.replace(/ /g, "_")}.${streamURL.type}`);

  https.get(streamURL.link, (response) => {
    response.pipe(stream);
  });
  
  stream.on("end", () => {
    console.log(`Downloaded successfully.`);
  });

  stream.on("error", (err) => {
    console.error("An error occurred while downloading the song:", err);
  });
})();
