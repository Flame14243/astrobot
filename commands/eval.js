const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 let embed = new Discord.RichEmbed()
  .setTitle("Evaluation")
  .setDescription("Üzgünüm, `eval` komutunu sadece yapımcısı Yusuf Bülbül kullanabilir.")
  .setColor("#cdf785");
  if(message.author.id !== '419936204117770241') return message.channel.send(embed);
  
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}try {
      const code = args.join(" ");
      let evaled = eval(code);
      let rawEvaled = evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

  let embed = new Discord.RichEmbed()
      .setTitle(`Evaluated in ${Math.round(bot.ping)}ms`)
      .addField(":inbox_tray: Girdi", `\`\`\`js\n${code}\n\`\`\``)
      .addField(":outbox_tray: Çıktı", `\`\`\`js\n${clean(evaled).replace(bot.token, "Özürlü müsün?")}\n\`\`\``)
      .addField('Type', `\`\`\`xl\n${(typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1)}\n\`\`\``)
      .setColor('GREEN');
      message.channel.send({embed});
    } catch (err) {
      
      message.channel.send(`\`HATA\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
}

module.exports.help = {
  name: "eval"
}
const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
	if (message.author.id === "419936204117770241") {
		try {
		  var code = args.join(" ");
		  var evaled = eval(code);

		  if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

		  message.channel.send("Kod Çalıştı 👍", clean(evaled), {code:true});
		} catch (err) {
		  message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
		function clean(text) {
		  if (typeof(text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		  else
			  return text;
		}
	} else {
		message.reply('Bu komutu kullanmak için gerekli izine sahip değilsin.')
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'eval',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};
