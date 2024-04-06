const express = require('express');
const ytdt = require('ytdl-core');

const app = express();
var cors = require('cors');
const portNumber = 5000;


app.use(cors());

app.get('/download',async(req,res)=>{
    try{
    const url = req.query.url;
    const videoId = await ytdt.getURLVideoID(url);
    const metaInfo = await ytdt.getInfo(url);
    let data ={
        url:'https://www.youtube.com/embed/'+videoId,
        info:metaInfo.formats
    };
    return res.send(data);
    }
    catch(error){
        return console.log(error);;
    }
});


app.listen(portNumber, () => console.log(`Example app is listening on port ${portNumber}.`));