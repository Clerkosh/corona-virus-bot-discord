require('dotenv').config();
const http = require('http');
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN); 

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });
var server_port = process.env.PORT;
var server_host = process.env.HOST;
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
client.on('ready', function (evt) {
    console.log('ready');
    setInterval(function() { http.get("http://corona-virus-bot-discord.herokuapp.com/"); }, 300000);
});
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time)).catch(err =>{ console.log("Error: " + err)});
}

async function Korona() {
    try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://korona.ws/');
    await sleep(2000);
    await page.screenshot({path: 'korona_PL.png'});
    await page.goto('https://coronavirus.jhu.edu/map.html/');
    await sleep(7000);
    await page.screenshot({path: 'korona.png'});
    await browser.close();
    }
    catch(err){
        console.log("Error: " + err)
    }
}

client.on('message', message => {
	if (message.content === 'korona') {
        message.channel.send("", {files: ["korona.png"]});
    } else if (message.content === 'koronaPL') {
        message.channel.send("", {files: ["korona_PL.png"]});
    }else if (message.content === '!help') {
        message.channel.send("Available commands:\n- korona\n- koronaPL\n");
    }
});
setInterval(Korona, 15000)