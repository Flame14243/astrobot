const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle(":tool: Moderasyon")
    .addField("`" + message.prefix + "ban`", "Üyeyi banlarsın")
    .addField("`" + message.prefix + "unban`", "Üyenin banını kaldırırsın")
    .addField("`" + message.prefix +"clear`", "Mesajları temizlersin")
    .addField("`" + message.prefix +"kick`", "Üyeyi atarsın")
    .addField("`" + message.prefix +"tempmute`", "Üyeyi geçici olarak sessize al.")
    .addField("`" + message.prefix +"unmute`", "Üyenin sessizliğini kaldırır")
    .addField("`" + message.prefix +"msent`", "Şimdiye kadar gönderilen mesajları kontrol et.")
    .addField("`" + message.prefix +"purge`", "Bir üyenin mesajlarını temizler.")
    .addField("`" + message.prefix +"warn`", "Üyeyi uyarırsın")
    .addField("`" + message.prefix +"warnlvl`", "Bir kullanıcının uyarısını kontrol edin.")
    .setFooter("Require mod-log channel.")

message.channel.send(embed);
}

module.exports.help = {
  name: "mod"
}
