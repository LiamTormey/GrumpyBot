const ServerDataHandler = require("./ServerDataHandler")

function getSubCommand(content, i) { 
    const ret = content.split(" ")[1 + (i || 0)].toLowerCase() || undefined;
    if(ret == "insults") ret = "insult"
    return ret; 
}

function getQuoted(content) { 
    const firstIndex = content.indexOf("\""); 
    if(firstIndex === -1) return undefined; 
    const lastIndex = content.lastIndexOf("\"")
    if(lastIndex === firstIndex) return undefined;
    return content.substring(firstIndex + 1, lastIndex) 
}  

module.exports.handleAdd = (msg) => { 
    switch(getSubCommand(msg.content)) { 
        case "insult": { 
            const quoted = getQuoted(msg.content) 
            if(quoted) ServerDataHandler.add(msg.guild.id, "insults", quoted)
            break; 
        }
    }
}

module.exports.handleShow = async (msg) => { 
    switch(getSubCommand(msg.content)) { 
        case "insult": { 
            const data = await ServerDataHandler.getServerObject(msg.guild.id)
            if(!data) return; 
            const insults = data.insults 
            if(!insults) return; 
            const reply = (`\`\`\`${insults.map(( (insult, i) => `(${i}) ${insult}`)).join("\n\n")}\`\`\``)
            msg.reply(reply)
        }
    }
}

module.exports.handleDelete = async (msg) => { 
    switch(getSubCommand(msg.content)) { 
        case "insult": { 
            const data = await ServerDataHandler.getServerObject(msg.guild.id)
            if(!data) return; 
            let insults = data.insults 
            if(!insults) return; 
            const insult_id = Number(getSubCommand(msg.content, 1))
            
            if(insults[insult_id]) { 
                insults = insults.filter( (insult, i) => {
                    if(i != insult_id) return insult
                })
                await ServerDataHandler.setServerObject(msg.guild.id, data)
            }

        }
    }
}