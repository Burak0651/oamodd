const coin = require("../../schemas/coin");
const yetkis = require("../../schemas/yetkis");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { reddet, onay} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["yetki-aldır", "yetkialdır", "yetkili"],
    name: "yetki-aldır",
    help: "yetki-aldır [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return message.react(reddet)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(reddet)
    message.channel.send("Bir üye belirtmelisin!").then(x => x.delete({timeout: 5000})); 
    return }
    if (!member.user.username.includes(conf.tag)) 
    {
    message.react(reddet)
    message.channel.send("Bu üye taglı değil!").then(x => x.delete({timeout: 5000})); 
    return }
    const yetkiData  = await yetkis.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (yetkiData  && yetkiData.yetkis.includes(member.user.id)) 
    {
    message.react(reddet)
    message.channel.send("Bu üyeye zaten daha önce yetki aldırılmış!").then(x => x.delete({timeout: 5000})); 
    return }

    const msg = await message.channel.send( `${member.toString()}, ${message.member.toString()} üyesi sana yetki vermek istiyor. Kabul ediyor musun?`);
    msg.react("<a:onay:988764805118718023>");
    msg.react("<a:reddet:988765425162682448>");

    msg.awaitReactions((reaction, user) => ["onay", "reddet"].includes(reaction.emoji.name) && user.id === member.user.id, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(async collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === 'onay') {
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: settings.yetkiCoin } }, { upsert: true });       
        msg.edit(`${member.toString()} üyesine başarıyla yetki aldırıldı!`).then(x => x.delete({timeout: 5000}))
        await yetkis.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { yetkis: member.user.id } }, { upsert: true });
       client.channels.cache.get(conf.yetkiLog).wsend(`${message.author} \`(${message.author.id}\` kişisi ${member} \`(${member.id})\` kişisini yetkiye aldı!`)
        member.roles.add(conf.yetkiRolleri)
      } else {
        msg.edit(`${member.toString()} üyesi, yetki aldırma teklifini reddetti!`).then(x => x.delete({timeout: 5000}))
      }
    }).catch(() => msg.edit(`Yetki aldırma işlemi iptal edildi!`))
  }
}
