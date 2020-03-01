const ServerDataHandler = require("../../ServerDataHandler")

module.exports = async (mapped, msg) => { 
    await ServerDataHandler.set(msg.guild.id, "chance", mapped.chance.replace("%",""))
    msg.reply("message chance set to " + `${mapped.chance}`)
}