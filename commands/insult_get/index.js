const ServerDataHandler = require("../../ServerDataHandler")
const common = require("../../common")
module.exports = async (mapped, msg) => { 
    let data = await ServerDataHandler.getServerObject(msg.guild.id) 
    let insults = data.insults || {} 
    insults = insults.map( (insult, i) => `[${i+1}] ${insult}`)
    if(insults.length <= 0) {
        msg.reply("no insults have been added. Type ++help for help.")
        return; 
    }
    let replies = common.arrayJoin(insults,"\n\n", 500)
    replies.forEach( r => msg.channel.send(`\`\`\`${r}\`\`\``))
    //const get = insults.join("\n\n")
    //msg.reply(`\`\`\`${}\`\`\``)
}