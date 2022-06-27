const coin = require("../../schemas/coin");
const conf = require("../../configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: [],
    name: "kurallar",
    help: "kurallar"
  },
  
  run: async (client, message, args, embed) => { 
const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });
message.channel.send(embed.setDescription(`
**✭ Aroura Sohbet Kuralları**:

✭ Sunucumuzda kesinlike her türlü küfür yasaktır .

✭ Sunucumuzda her türlü reklam yasaktır dm den de reklam yasaktır.

✭ Din ve milli küfürler yasaktır.

**✭ Aroura Ses Kuralları**:

✭ Ses programı ile trol yapmak kesinlikle yasaktır.

✭ Ailevi küfürler yasaktır.

✭ Rahatsız edici sesler çıkarmak yasaktır.

**✭ Aroura Genel Kurallar**:

✭ Ses ve metin kanallarında dozunu çıkartarak trol yapmak yasaktır.

✭ Uyarı yapılmasına rağmen hala kişilere rahatsızlık vermek yasaktır.

✭ Dm'den sunucu üyelerini rahatsız etmek yasaktır.
\
`))   
}}