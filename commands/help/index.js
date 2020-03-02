const ServerDataHandler = require("../../ServerDataHandler")
const common = require("../../common")
const Discord = require('discord.js');

module.exports = async (mapped, msg) => { 
    const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Grumpy Bot')
    .setURL('https://discord.gg/Ga3kk5c')
    .setAuthor('by Teh', '', 'https://discord.gg/Ga3kk5c')
    //.setDescription('A bot to remind everyone how much you hate them.')
    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addField('`Command Access`', 'Only members with a "GrumpyBotAdmin" role can access commands. If the role doesn\'t exist, create it')
    .addField('`++add insult "i hate you"`', 'add an insult; must use quotation marks.')
    .addField('`++get insults`', 'gets a list of all insults')
    .addField('`++delete insult 1`', 'delete an insult by its ID. Use "++get insults" to get ID numbers')
    .addField('`++set chance 5%`', 'sets the chance the bot will say something')
    .addField('`++set target #general`', 'set the channel the bot targets; must mention the channel.')
    .addBlankField()
    //.addField('Inline field title', 'Some value here', true)
    //.addField('Inline field title', 'Some value here', true)
    //.addField('Inline field title', 'Some value here', true)
    //.setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Need additional help or want to report an issue to the creator? Join the discord! https://discord.gg/Ga3kk5c', '');

    msg.channel.send(embed)
}

