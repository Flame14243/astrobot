const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle(":name_badge:  NSFW")
.setDescription("Bu komutlar kullanmak için nfsw kanalınızın olması gerekmektedir. Komutları odada kimse yokken kullanın :)")
.addField("`" + message.prefix +"hentai`", "Rastgele hentai resmi atar")
.addField("`" + message.prefix +"ecchi`", "Rastgele ecchi resmi atar")
.addField("`" + message.prefix +"neko`", "Rastgele neko resmi atar")
.addField("`" + message.prefix +"meme`", "Rastgele meme resmi atar.")
.addField("`" + message.prefix +"popo`", "Rastgele popo resmi atar")


message.channel.send(embed);
}

module.exports.help = {
  name: "nsfw"
}

