const express = require("express");
const ytdt = require("ytdl-core");
const cors = require("cors");
require('dotenv').config();

const portNumber = 5000;
const apiKey = process.env.APIKEY; 

const app = express();
app.use(cors());

// Middleware to verify API key
const verifyApiKey = (req, res, next) => {
  const providedApiKey = req.query.api_key;
  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }
  next();
};


app.get("/download", verifyApiKey, async (req, res) => {
  try {
    const { url } = req.query;
    const videoId = await ytdt.getURLVideoID(url);
    const metaInfo = await ytdt.getInfo(url);
    let data = {
      url: "https://www.youtube.com/embed/" + videoId,
      info: metaInfo.formats,
    };
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid YouTube URL") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(portNumber, () =>
  console.log(`Example app is listening on port ${portNumber}.`)
);

