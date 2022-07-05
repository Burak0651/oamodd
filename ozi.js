const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");
const { Mute2, Unmute} = require("./src/configs/emojis.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//
client.ranks = [
  { role: "982541040110141456", coin: 2000 },
  { role: "982541040110141455", coin: 5000 },
  { role: "982541040110141452", coin: 8000 },
  { role: "982541040110141451", coin: 12000 },
  { role: "982541040143728708", coin: 15000 },
  { role: "982541040143728707", coin: 18000 },
  { role: "982541040143728706", coin: 22000 },
  { role: "982541040143728704", coin: 25000 },
  { role: "982541040143728703", coin: 28000 },
  { role: "982541040118538327", coin: 35000 },
  { role: "982541040118538326", coin: 40000 },
  { role: "982541040143728702", coin: 50000 },
  ]
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Ozi] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[Ozi KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(process.env.tokenn)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });

setInterval(() => {
  let GuildID = "899273632436592701"
  let OneMonth = "901908110619340820"
  let ThreeMonth = "901907879999701012"
  let SixMonth = "901907876631699507"
  let NineMonth = "901907873662119986"
  let OneYear = "901907864040382504"
  const server = client.guilds.cache.get(GuildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
  await member.roles.add(NineMonth)}

  if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
    await member.roles.add(OneYear)}

        })
  }, 1000 * 60 * 60 * 24 * 7)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async (msg) => {
  if (!msg.guild || msg.author.id === client.user.id) return;
  let reklamKoruma = true;

  if (reklamKoruma) {
    try {
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => msg.content.includes(reklam))) {
        if (msg.member.permissions.has(8)) return
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`).then(ozixd => ozixd.delete({ timeout: 3000 }));
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = msg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (msg.member.permissions.has(8)) return
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`).then(ozixd => ozixd.delete({ timeout: 3000 }));
      }
    } catch (err) {}

  }
})

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || newMsg.author.id === client.user.id) return;
  let reklamKoruma = true;
  if (reklamKoruma) {
    try {
      if (newMsg.member.permissions.has(8)) return
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => newMsg.content.includes(reklam))) {
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`).then(ozixd => ozixd.delete({ timeout: 3000 }));
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = newMsg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`).then(ozixd => ozixd.delete({ timeout: 3000 }));
      }
    } catch (err) {}

  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(conf.chatMute)) return;
      if (map.has(message.author.id)) {
        const userData = map.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, TIME);
            map.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === lımıt) {
          let messages = await message.channel.messages.fetch({ limit: 100 });
          let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 7);
          message.channel.bulkDelete(filtered);
                message.member.roles.add(conf.chatMute);
                message.channel.send(`${Mute2} Sohbet kanallarını kirletme sebebiyle \`10 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))

                setTimeout(() => {
                    message.member.roles.remove(conf.chatMute);
                    message.channel.send(`${Unmute} Sohbet kanallarını kirletme sebebiyle 10 dakika süresince susturmanız bitti. Lütfen tekrarlamayınız. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))
                }, 600000);//9000000
            } else {
                userData.msgCount = msgCount;
                map.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            map.delete(message.author.id)
        }, TIME);
        map.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});
  
const mentionRegex = /<@!?&?\d+>/g;

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission('ADMINISTRATOR')) return;

 if (mentionRegex.test(message.content) && message.content.match(mentionRegex).length >= 4) {
        message.member.roles.add(conf.chatMute);
        message.channel.send(`${Mute2} Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))
        setTimeout(() => {
            message.member.roles.remove(conf.chatMute);
       message.channel.send(`${Unmute} Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
