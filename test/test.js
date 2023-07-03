(async () => {
  const hungama = require("../index");
  const url = "https://www.hungama.com/song/lost-without-you/36223553/";

  const info = await hungama.getInfo(url);
  console.log(info);
})();
