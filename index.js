const testFolder = './tests/';
const fs = require('fs');
require("dotenv").config() 
/**
 * Load Commands 
 */
const commandsFolder = "./commands"
fs.readdir(commandsFolder, (err, files) => {
    let commands = [] 
    files.forEach(file => {
        let schema = undefined 
        try { 
            schema = require(`${commandsFolder}/${file}/schema.js`)
        } catch(e) {
            console.log(`[error] ${file} does not have a schema file`, e)
        }

        let main = undefined 
        try { 
            main = require(`${commandsFolder}/${file}/index.js`)
        } catch(e) {
            console.log(`[error] ${file} does not have an index file`, e)
        }

        if(schema && main) { 
            console.log("[info] Loading Command " + file)
            commands.push({
                main,
                schema 
            })
        }
        
        
    });
    start_discord_server(commands)
});

function start_discord_server(commands) { 
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const tokenizer = require("./modules/tokenizer")
    const validator = require("./modules/schema_validator")
    const ServerDataHandler = require("./ServerDataHandler")
    const seedrandom = require('seedrandom');
    
    client.on('ready', () => {
        console.log(`[info] Logged in as ${client.user.tag}!`);
        client.user.setStatus('available')
        let displayGuilds = true  
        setInterval(()=>{
            //displayGuilds = !displayGuilds
            //console.log('changing')
            client.user.setPresence({
                game: {
                    name: displayGuilds ? `${client.guilds.size} guilds; ++help` : "++help for help",
                    type: "PLAYING",
                    url: "https://discord.gg/FfuMCgy"
                }
            });
        }, 10000)
    });
    
    client.on('message', msg => {
        if(msg.author.bot) return; 

        //normal bot shit 
        async function bot_shit(){
            const random = (min, max) => {rng = seedrandom(); return Math.floor((rng() * max) + min); }
            const random_factor = random(0, 100); //console.log("Random Factor: ", random_factor)
            
            
            const data = await ServerDataHandler.getServerObject(msg.guild.id) || {} 

            
            //if mentioned
            const mentionedMembers = Array.from(msg.mentions.members.values()).map( (m) => m.user.id)
            console.log("mm", mentionedMembers)
            if(mentionedMembers.includes(client.user.id)) { 
                const insults = data.insults
                msg.reply(insults[random(0, insults.length )]);
            }





            let target_channels = data.target || {} 
            data.chance = data.chance || 5
            if(random_factor > Number(data.chance)) return; 
            target_channels = target_channels.map(target => target.split("#")[1].split(">")[0])
            if(!target_channels.includes(msg.channel.id)) { 
                return;
            }

            const opt = random(1,2); 

            if (true) {
                const insults = data.insults || [] 
                if(insults.length == 0) return; 
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
        }
        bot_shit()

        
        if(msg.content.substring(0, 2) == "++") msg.content = msg.content.substring(2)
        else return; 
        if(!msg.member.roles.map(role => role.name).includes("GrumpyBotAdmin") && msg.content.substring(0,4).toLowerCase() != "help") { 
            msg.reply("You dont have the admin rights to do that. Type ++help for help.")
            return; 
        }
    
        //tokenize 
        let tokens = [] 
        try { 
            tokens = tokenizer.tokenize(msg.content)
        } catch(e) { 
            msg.reply(`Unable to process the command. ${e.message}`)
            return; 
        }

        //send command to the command modules 
        commands.forEach(command => {
            try { 
                validator.validate(tokens, command.schema, (mapped, tokens)=>{command.main(mapped, msg)})
            } catch(e) {}
        })

        
    });
    
    client.login(process.env.DISCORD);
}