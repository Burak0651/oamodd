const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const nameData = require("../../schemas/names")
const conf = require("../../configs/settings.json")
const ayarlar = require("../../configs/sunucuayar.json")
const {miniicon, voice, mesaj2, star} = require("../../configs/emojis.json")

const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["kpanel"],
    name: "kpanel",
    help: "kpanel",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 
 let aroura = new disbut.MessageMenuOption()
 .setLabel("Sunucuya Katılma Tarihiniz")
 .setValue("aroura")
 .setEmoji("987441936266834010")

 let aroura1 = new disbut.MessageMenuOption()
 .setLabel("Üzerinde Bulunan Rollerin Listesi")
 .setValue("aroura1")
 .setEmoji("987441936266834010")

 let aroura2 = new disbut.MessageMenuOption()
 .setLabel("Hesabınızın Açılış Tarihi")
 .setValue("aroura2")
 .setEmoji("987441936266834010")

 let aroura3 = new disbut.MessageMenuOption()
 .setLabel("Toplam invite Bilgileri")
 .setValue("aroura3")
 .setEmoji("987441936266834010")

 let aroura4 = new disbut.MessageMenuOption()
 .setLabel("Tekrar Kayıt Olma")
 .setValue("aroura4")
 .setEmoji("987441936266834010")

 let aroura5 = new disbut.MessageMenuOption()
 .setLabel("Sunucu Bilgileri")
 .setValue("aroura5")
 .setEmoji("987441936266834010")

 let aroura6 = new disbut.MessageMenuOption()
 .setLabel("İsim Bilgileri")
 .setValue("aroura6")
 .setEmoji("987441936266834010")

 let aroura7 = new disbut.MessageMenuOption()
 .setLabel("Toplam Mesaj Bilgileri")
 .setValue("aroura7")
 .setEmoji("987441936266834010")

 let aroura8 = new disbut.MessageMenuOption()
 .setLabel("Toplam Ses Bilgileri")
 .setValue("aroura8")
 .setEmoji("987441936266834010")

 let kpanel = new disbut.MessageMenu();
 kpanel.setID("987642871786131466");
 kpanel.setPlaceholder(`Kullanıcı Menüsü`)
 kpanel.addOptions(aroura,aroura1,aroura2,aroura3,aroura4,aroura5,aroura6,aroura7,aroura8);

  
 message.channel.send(`${star} \`${message.guild.name}\` Sunucusu içerisi;\nUlaşmak istediğiniz bilgilere menüden tıklamanız yeterli olucaktır.`, kpanel);

    },
  };

    client.on("clickMenu", async (menu) => {
      const member = menu.clicker.member;
      await menu.clicker.fetch();
      menu.reply.think(true)
      ////////////////////////////////////////////////////////////////////////////////////////////

const inviterData = await inviterSchema.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });
const total = inviterData ? inviterData.total : 0;
const regular = inviterData ? inviterData.regular : 0;
const bonus = inviterData ? inviterData.bonus : 0;
const leave = inviterData ? inviterData.leave : 0;
const fake = inviterData ? inviterData.fake : 0;
const invMember = await inviteMemberSchema.find({ guildID: conf.guildID, inviter: menu.clicker.member.id });
const daily = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
const weekly = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
const tagged = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

const data = await nameData.findOne({ guildID: conf.guildID, userID: member.user.id });

////////////////////////////////////////////////////////////////////////////////////////////

const messageData = await messageUser.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });
const voiceData = await voiceUser.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });

  const messageWeekly = messageData ? messageData.weeklyStat : 0;
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
  const messageDaily = messageData ? messageData.dailyStat : 0;
  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
////////////////////////////////////////////////////////////////////////////////////////////

const category = async (parentsArray) => {
  const data = await voiceUserParent.find({ guildID: conf.guildID, userID: member.id });
  const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
  let voiceStat = 0;
  for (var i = 0; i <= voiceUserParentData.length; i++) {
    voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
  }
  return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
};


////////////////////////////////////////////////////////////////////////////////////////////

      if (menu.values[0] === "aroura") {
        menu.reply.edit(`Sunucuya Katılma Tarihiniz :  \`${moment(menu.clicker.member.joinedAt).format('D/MMMM/YYYY')}\``)
    }

    if (menu.values[0] === "aroura1") {
        menu.reply.edit(`Üzerinde Bulunan Rollerin Listesi ;
        
${(menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`)
    }

    if (menu.values[0] === "aroura2") {
        menu.reply.edit(`Hesabınızın Açılış Tarihi :  \`${moment(menu.clicker.member.user.createdAt).format("LLL")}\``)
    }

    if (menu.values[0] === "aroura3") {
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${menu.guild.name}\` sunucusunda toplam invite bilgileri aşağıda belirtilmiştir.
Toplam **${regular}** davet.
${miniicon} \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
${miniicon} \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`)
    }

    if (menu.values[0] === "aroura4") {
        await member.roles.set(ayarlar.unregRoles);

        menu.reply.edit(`${menu.clicker.member.toString()} üyesi başarıyla kayıtsıza atıldı!`)
    }

    if (menu.values[0] === "aroura5") {
        menu.reply.edit(`
${miniicon} Sesli kanallardaki üye sayısı : \`${(menu.guild.members.cache.filter((x) => x.voice.channel).size)}\`
${miniicon} Sunucudaki toplam üye sayısı : \`${(menu.guild.memberCount)}\`
${miniicon} Sunucunun oluşturulma tarihi: \`${moment(menu.guild.createdAt).locale("tr").format("LLL")}\`
${miniicon} Sunucu destek numarası : \`${(menu.guild.id)}\`
`)
    }

    if (menu.values[0] === "aroura6") {

     const ambed = new Discord.MessageEmbed()
     .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
     .setTitle(`${member.user.username} üyesinin isim bilgileri;`)
     .setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>) , **[**\`${moment(x.date).format("LLL")}\`**]**`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")
              
        menu.reply.edit(ambed,true)
    }

    if (menu.values[0] === "aroura7") {
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${menu.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.
${star} **Mesaj İstatistiği**
${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
${miniicon} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${miniicon} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`)
    }

    if (menu.values[0] === "aroura8") {
menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${menu.guild.name}\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.
${star} **Sesli Sohbet İstatistiği**
${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`
${miniicon} Haftalık Ses: \`${voiceWeekly}\`
${miniicon} Günlük Ses: \`${voiceDaily}\`
`,true);

    }

    });
