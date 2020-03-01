const Discord = require('discord.js');
const client = new Discord.Client();

const random = (min, max) => Math.floor((Math.random() * max) + min); 

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'insults.txt');

const insults = fs.readFileSync(filePath, {encoding: 'utf-8'}).split("\n")
console.log("Insults loaded -> ", insults)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.channel.id)
    if(msg.channel.id != "454574424021139456") return; 
    if(msg.author.id == "327064122434912256") return; 
    if(msg.author.bot) return 

    if(msg.content.toLowerCase().includes("uwu") || msg.content.toLowerCase().includes("owo")) { 
        msg.reply("shut the fuck up weeb.")
    }

    const random_factor = random(0, 100); console.log("Random Factor: ", random_factor)
    if(random_factor > 5 && (msg.author.id != "548370563333357568") ) return 
    
    const opt = random(1,2); 
    console.log("opt: ", opt)
    if (opt === 1) {
        msg.reply(insults[random(0, insults.length )]);
    } else if(opt === 2 && msg.content.length >= 5) { 
        const content  = msg.content 
        const chars = content.split('')
        let cap = false; 
        const newChars = chars.map((char)=>{
            cap = !cap; 
            if(!cap) return char 
            else return char.toUpperCase() 
        })
        msg.channel.send(newChars.join(""))
    }
});

client.login('');