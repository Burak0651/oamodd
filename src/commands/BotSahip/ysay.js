const  Discord = require("discord.js");
const configs = require("../../configs/sunucuayar.json")

module.exports = {
  name: "yetkili-say",
  aliases: ["yetkilisay","yses","ysay"],
  execute: async (client, message, args, embed, author, channel, guild) => {

     if (!message.member.roles.cache.has(configs.settings.owners) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const content = args[0]; 

        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(configs.sunucuayar.yetkirolleri)).filter(s => !s.voice.channel).map(s => s).join('\n')
        let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(configs.sunucuayar.yetkirolleri)).filter(s => s.voice.channel).map(s => s).join('\n')
        
         message.reply(`Sestekiler; \n${sesteolan || "Kimse yok"}\n\nSeste olmayanlar;\n${sesteolmayan || "Kimse yok"}`)
           
    }

}
 