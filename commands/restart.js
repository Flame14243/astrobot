const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
  let embed = new Discord.RichEmbed()
  .setTitle("Yeniden Başlatıldı")
  .setDescription("Üzgünüm , `restart` komutunu botun sahibi kullanabilir.")
  .setColor("#cdf785");
  if(message.author.id !== '419936204117770241') return message.channel.send(embed);
  
message.channel.send(`Bot yeniden başlatıldı ${Math.floor(bot.ping)}ms`).then(() =>{
process.exit(1);
})
 

                                           }
module.exports.help = {
name: "restart"
}
                                           
