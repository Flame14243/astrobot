const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.RichEmbed()
    .setTitle(":video_game: OYUNLAR")
    .addField("`" + message.prefix + "fortnite`", "Kullanıcının Fortnite istatistiklerine bak!")
    .addField("`" + message.prefix +"csgo`", "Kullanıcının CSGO istatistiklerine bak!");
    message.channel.send(embed);
    
}
module.exports.help = {
    name: "oyunlar"
}
