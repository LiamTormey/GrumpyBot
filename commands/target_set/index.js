const ServerDataHandler = require("../../ServerDataHandler")

module.exports = async (mapped, msg) => { 
    
    //verify channel mention
    const channel_mention = mapped.channel 
    if(channel_mention.length < 4 || channel_mention.substring(0, 1) != "<" || channel_mention.substring(1,2) != "#" || !channel_mention.endsWith(">")) { 
        msg.reply("only channel mentions can be a target.");
        return; 
    }

    let data = await ServerDataHandler.getServerObject(msg.guild.id)
    data.target = [mapped.channel]
    await ServerDataHandler.setServerObject(msg.guild.id, data)
    msg.reply("taget saved.")
}

