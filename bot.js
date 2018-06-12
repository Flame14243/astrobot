	const Discord = require("discord.js");
	const botconfig = require("./botconfig.json");
	const fs = require("fs");
	let bot = new Discord.Client();
	bot.commands = new Discord.Collection();
	const coins = require("./coins.json");
	const xp = require("./xp.json");
	const db = require('quick.db');
	/*
        const DBL = require("dblapi.js");
        const dbl = new DBL(process.env.DBL_TOKEN, bot);*/

	bot.on('ready', () => {
	console.log("Yukleniyor...");
	setTimeout(function(){
	console.log("Basariyla yuklendi.");
	}, 1000);
	function botStatus() {
        let status = [
            `Prefix » ${botconfig.prefix}.`,
            `Teşekkürler » ${bot.guilds.size} sunucu.`,
            `Bot 7/24 Aktif Artık.`,
            `Yapımcı » Yusuf Bülbül`,
            `Teşekkürler » ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı.`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})

	fs.readdir("./commands/", (err, files) => {
    console.log(`Yuklendi ${files.length} komut.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Komutlar bulunamadi.");
	return;
	}


	bot.commands.set(props.help.name, props);
	});
	});

	bot.on("message", async message => {
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
	
    let prefix = prefixes[message.guild.id].prefixes;
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return ;
        if(message.content.toLowerCase() === '<@419936204117770241>'){
        let embed = new Discord.RichEmbed()
       .setTitle("Scary")
       .addField("Prefix", `\`${prefix}\``, true)
       .addField("Yardım", `\`${prefix}yardım\``, true)
       .setThumbnail(bot.user.displayAvatarURL)
       .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`);
        message.channel.send(embed);
        }

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
   message.prefix = prefix;


	try {
	let commandFile = require(`./commands/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("Bu isimde bir komut yok!");
	} catch (e) { console.log(e) }

	if(!coins[message.author.id]){
	coins[message.author.id] = {
	coins: 0
	};
	}

	let coinAmt = Math.floor(Math.random() * 15) + 14;
	let baseAmt = Math.floor(Math.random() * 15) + 14;
 

	

	if(coinAmt === baseAmt){
	coins[message.author.id] = {
	coins: coins[message.author.id].coins + coinAmt
	};
	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
	if (err) console.log(err)
	});

	}

	let xpAdd = Math.floor(Math.random() * 15) + 14;
	

	if(!xp[message.author.id]){
	xp[message.author.id] = {
	xp: 0,
	level: 1
	};
	}


	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp =  curxp + xpAdd;
	if(nxtLvl <= xp[message.author.id].xp){
	xp[message.author.id].level = curlvl + 1;

	}
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
	if(err) console.log(err)
	});


	});
	bot.on('guildMemberAdd', member => {
    bot.channels.get('451091996287696910').setName(`Toplam Üye Sayısı: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('453198762102489098').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('453199063958159370').setName(`Bot Sayısı: ${bots}`)
	const members = member.guild.memberCount;
	const channel = member.guild.channels.find('name', 's-log');
	if (!channel) return;
	
       let Role = member.guild.roles.find(`name`, "Bot");
       if(member.user.bot){
	member.addRole(Role.id)
       }else{
      let role = member.guild.roles.find(`name`, "Üye");
	member.addRole(role.id)
       }
 
	let Embed = new Discord.RichEmbed()
	.setFooter(`Üye Katıldı | Kaç Kişi Olduk » ${member.guild.memberCount}`)
	.setColor("#cde246")    
	.setAuthor(`${member.displayName} isimli üyemiz ${member.guild.name} isimli sunucudan ayrıldı`, member.user.displayAvatarURL)
	.setTimestamp()
	channel.send(Embed);
	});
	
	bot.on('guildMemberRemove', member => {
    bot.channels.get('453199237459738625').setName(`Toplam Üye Sayısı: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('453199322255851521').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('453199491835887616').setName(`Bot Sayısı: ${bots}`)
	
	const channel = member.guild.channels.find(`name`, 's-log');
	if(!channel) return; 
	let Embed = new Discord.RichEmbed()
	.setColor("#e26346")
	.setAuthor(`${member.displayName} isimli üyemiz ${member.guild.name} isimli sunucuya katıldı.`, member.user.displayAvatarURL)
	.setTimestamp()
	.setFooter(`Üye Ayrıldı | Kaç Kişi Olduk » ${member.guild.memberCount}`)
	channel.send(Embed);
	});

	bot.on('guildCreate', guild => {
	      let channel = bot.channels.get("450955859510427650")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Katıldım » ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
	bot.on('guildDelete', guild => {
	      let channel = bot.channels.get("451091996287696909")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Ayrıldım » ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});

const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./ayarlar');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Bot Discord Baðlandý!'));

client.on('disconnect', () => console.log('Bot Ýnternetden Kaynaklý Bir Sorun Yüzünden Cýktý.'));

client.on('reconnecting', () => console.log('Bot Discord Tekrara Baðlandý.'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(':x: Lutfen Sesli Bir Kanal Giriniz.');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(':x: Odaya Girme Yetkim Yok');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send(':x: Kanalda Konusma Yetkim Yok');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`âœ… Oynatma Listesi: **${playlist.title}** Listeye Eklendi`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Sarki Listesi:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Lutfen Hangi Sarkiyi Secmek isdededini Sec 1-10 Kadar Bir Sayi Yaz.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send(':x: Gecersiz Deger Girildi.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':x: Arana Sonucu Elde Edemedim');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: Sesli Kanalda Degilsin.');
		if (!serverQueue) return msg.channel.send(':x: Sarki Calmiyor.');
		serverQueue.connection.dispatcher.end(':white_check_mark:  Basariyla Atladýn');
		return undefined;
	} else if (command === 'dur') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: Sesli Kanala Giriniz.');
		if (!serverQueue) return msg.channel.send(':x: Sarki Calmiyor.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(':white_check_mark:  Basariyla Durdu.');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x:  Sesli Kanala Giriniz');
		if (!serverQueue) return msg.channel.send(':x: Sarki Calmiyor.');
		if (!args[1]) return msg.channel.send(`Simdiki Ses Durumu: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Yeni Ses Durumu: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send(':x: Muzik Calmýyor');
		return msg.channel.send(`Oynatilan Sarki: **${serverQueue.songs[0].title}**`);
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send(':x: Muzik Calmýyor');
		return msg.channel.send(`
__**Sarki Kuyrugu**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Oynatilan:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'dur') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Sarký Durdu');
		}
		return msg.channel.send('Sarký Durdu.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('Tekrar Baþladý!');
		}
		return msg.channel.send(':x: Müzik Calmýyor');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x: Ses Kanalina Giremedim Hata: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`:x: Ses Kanalina Giremedim Hata: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`Oynatma Listesine **${song.title}** Sarki Eklendi.`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Ýnternetden Kaynaklý Sorun Cýktý.') console.log('Sarkilar Bitti..');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`:notes: **${song.title}** Adli Sarki Basladi`);
}

	//Komutlar klasötündeki .js uzantılı dosyaları komut olarak algılayabilmesi için:
	const Discord = require("discord.js");
	client.commands = new Discord.Collection();
	const fs = require("fs");
	fs.readdir("./komutlar/", (err, files) => {
    	console.log(`Basariyla ${files.length} tane komut yuklendi.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Bu isimde bir komut bulunamadi.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./komutlar/${f}`);
	console.log(`Yuklendi : ${f}`);
	client.commands.set(props.help.name, props);
	});
	});


	bot.login(process.env.BOT_TOKEN);
