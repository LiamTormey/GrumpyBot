const ServerDataHandler = require("../../ServerDataHandler")

module.exports = async (mapped, msg) => { 

    try { 
        await ServerDataHandler.add(msg.guild.id, "insults", mapped.insult)
    } catch(e) { 
        msg.reply("error, " + e.message)
        return; 
    }
    msg.reply(`added insult \`${mapped.insult}\``);     
}