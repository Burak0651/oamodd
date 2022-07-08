const Discord = require('discord.js');



module.exports = {
 conf: {
    aliases: ["ping","ms"],
    name: "ping",
    help: "ping"
 },
  
run: async(client, message) => {

let embed = new Discord.MessageEmbed()
.setColor("RANDOM")

.addField("**__Gecikme Sürem__**", `

**${client.ws.ping}** 
ms Olarak Hesaplandı.`,true)


message.channel.send(embed)

}

};
