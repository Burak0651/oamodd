const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olucaktır!\n\n**1:** \`Sunucuya giriş tarihinizi öğrenin.\`\n**2:** \`Üstünüzde bulunan rollerin listesini alın.\`\n**3:** \`Hesabınızın açılış tarihini öğrenin.\`\n\n**4:** \`Davet bilgilerinizi öğrenin.\`\n**5:** \`Tekrardan sesli kayıt olun.\`\n**6:** \`Sunucunun anlık aktif listesini görüntüleyin.\`\n\n**7:** \`Sunucudaki eski isim bilgilerinizi görüntüleyin.\`\n**8:** \`Sunucudaki toplam mesaj sayınızı öğrenin.\`\n**9:** \`Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\`\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":3,"custom_id":"1","label":"1"},
                         {"type":2,"style":3,"custom_id":"2","label":"2"},
                         {"type":2,"style":3,"custom_id":"3","label":"3"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"4","label":"4"},
                         {"type":2,"style":3,"custom_id":"5","label":"5"},
                         {"type":2,"style":3,"custom_id":"6","label":"6"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"7","label":"7"},
                         {"type":2,"style":3,"custom_id":"8","label":"8"},
                         {"type":2,"style":3,"custom_id":"9","label":"9"}
       ]}


]}

 })
  },
};

