const express = require("express");
const ytdt = require("ytdl-core");
var cors = require("cors");
const portNumber = 5000;
// require("dotenv").config();

const app = express();
app.use(cors());
app.get("/download", async (req, res) => {
  try {
    /*
    const { api_key, url } = req.query;
    if (api_key != process.env.APIKEY) {
      return res
        .status(403)
        .send({ message: `Your APIKEY is incorrect: ${api_key}` });
    } else {
      const videoId = await ytdt.getURLVideoID(url);
      const metaInfo = await ytdt.getInfo(url);
      let data = {
        url: "https://www.youtube.com/embed/" + videoId,
        info: metaInfo.formats,
      };
      return res.status(200).send(data);
    }*/
    const {  url } = req.query;
    const videoId = await ytdt.getURLVideoID(url);
      const metaInfo = await ytdt.getInfo(url);
      let data = {
        url: "https://www.youtube.com/embed/" + videoId,
        info: metaInfo.formats,
      };
      return res.status(200).send(data);
  } catch (error) {
    return console.log(error);
  }
});
app.listen(portNumber, () =>
  console.log(`Example app is listening on port ${portNumber}.`)
);
