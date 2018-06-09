const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Reload")
  .setDescription("Üzgünüm `reload` komutunu sadece yapımcısı Yusuf Bülbül kullanabilir!")
  .setColor("#cdf785");
  if(message.author.id !== '419936204117770241') return message.channel.send(embed);

  try{
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  let Aembed = new Discord.RichEmbed()
  .setTitle("Tüm Komutlar Yenileniyor..")
  .setDescription(`${args[0]}.js komutu başarıyla yenilendi!`)

    return message.channel.send(Aembed);
     }catch(e){
     return message.channel.send("Böyle bir komut yok!")
     }
}; 

module.exports.help = {
name: "reload"
}
