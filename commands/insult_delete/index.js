const ServerDataHandler = require("../../ServerDataHandler")

module.exports = async (mapped, msg) => { 
    let data = await ServerDataHandler.getServerObject(msg.guild.id) 
    let insults = data.insults 
    if(!insults) return; 
    console.log("?")
    if(!insults[mapped.id-1]) { 
        msg.reply(`insult \`${mapped.id}\` does not exist.`);
        return; 
    }
    const deleted = insults[Number(mapped.id)-1]
    insults = insults.filter( (insult, i) => (i+1) != mapped.id)
    data.insults = insults; 
    await ServerDataHandler.setServerObject(msg.guild.id, data)
    insults = insults.map( (insult, i) => `[${i+1}] ${insult}`)

    msg.reply(`deleted insult \`${deleted}\``)
}