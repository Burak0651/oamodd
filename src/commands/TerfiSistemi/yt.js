const conf = require("../../configs/sunucuayar.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["yetki-ver", "yt"],
    name: "yetkili-yap",
    help: "yt [kullanıcı]"
  },

    run: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(conf.registration.yetkilialim) && !message.member.roles.cache.has(conf.registration.yetkilialim) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let total = db.get(`subs_${author.id}`) || 0;
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine yetkili rolleri veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(conf.registration.staff);
        guild.members.cache.get(member.id).roles.add(conf.registration.enaltyetkilirolü);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına <@&${conf.registration.staff}> ve <@&${conf.registration.enaltyetkilirolü}> rolleri verildi.`)] });
        if (conf.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda başarıyla, **${message.author.tag}** yöneticisi tarafından yetkili rollerin verildi iyi eğlenceler!`).catch(() => {});
        
        client.channels.cache.get(conf.channels.chat).send({ content: `${member} kullanıcısı sunucumuzda yetkili oldu, aramıza hoş geldin.` }).then((e) => setTimeout(() => { e.delete(); }, 10000));
        client.channels.cache.get(conf.logs.rollog).send({ content: `${member} - \`(${member.id})\` kullanıcısına \`(${message.author.id})\` tarafından **YETKİLİ** rolleri verildi.` });
    }
 }