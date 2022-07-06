const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay"
  },

  run: async (client, message, args, durum) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      let matthe = args[0];

      let sesdedeğil = message.guild.members.cache.filter(x => x.roles.cache.has(conf.registration.staff)).filter(y => !y.voice.channel && y.presence.status != "offline")
      message.channel.send(`
        Aktif olup seste olmayan yetkililer:
${sesdedeğil.map(s => `${s} \`${s.user.tag}\``).join('\n')}

Sese Girmeniz Rica Olunur.`)
    } else
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)
  }
}