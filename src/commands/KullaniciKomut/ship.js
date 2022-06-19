const discord = require('discord.js');

module.export.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let user = message.mentions.users.first()
    let RN = Math.floor(Math.random() * 100) + 1
    
    if(!user) return 

}

module.exports.help = {
    name: "ship",
    aliases: []
}