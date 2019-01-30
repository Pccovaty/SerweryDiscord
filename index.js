const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = [];





fs.readdir("./komendy/", (err, files) => {

  if (err) console.log(err);
  const jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Nie znaleziono komendy");
    return;
  }

  jsfile.forEach((f, i) => {
    const props = require(`./komendy/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on(`message`, async message => {
  if(message.content ===  `/reboot`) { 
if (message.author.id === "340557425511759892") {
  message.channel.send(":gear: ponowne uruchamianie...")
  
  bot.destroy()
  bot.login(process.env.TOKEN)
message.channel.send(":gear: ponownne uruchamianie...")
} else {
	
message.channel.send("Tylko Autor bota moze uzyc tej komendy.")
  
  }
  }
});
bot.on("message", async message => {
  if (message.content === "<@539852424068988928>") {
    const bicon = bot.user.displayAvatarURL;
    const embed = new Discord.RichEmbed()
    .setThumbnail(bicon)
    .setTitle("Informacje o Bocie Serwery Discord")
    .setColor("BLUE")
    .setTimestamp()
    .addField("Informacje", "Prefix bota to ``/``. Aktualnie posiadamy komend ``3``.")
    .addField("O nas", "Jesteśmy listą serwerów discord o różnych tematykach. Znaleźć możesz u nas serwery Anime, Społeczności, Gamingowe i inne oraz zgłosić swój własny serwer! Nie jest to trudne, aczkolwiek wymaga poświęcenia od 1-3 minut.")
    .addField("\🔗 Przydatne Linki", "[Zaproszenie serwera](https://discord.gg/NaWTakw) | Tu coś będzie")
    .setFooter(`Komenda użyta przez ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(embed)
  }

});

bot.on("ready", async() => {
      setInterval(async () => {
    const statuslist = [
      `Dołącz do nas!`,
      `/help`,
      `To cie nic nie kosztuje!`
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      await bot.user.setPresence({
        game: {
          name: `${statuslist[random]}`,
          type: "WATCHING"
          //url: 'https://www.twitch.tv/spokloo'
        },
        status: "dnd"
      });
    } catch (error) {
      console.error(error);
    }
  }, 60000);

 });
 bot.on("message", async message => {
 
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
 
  }

 

 
  const prefix = prefixes[message.guild.id].prefixes;

  const messageArray = message.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);
  if(cmd.substring(0, prefix.length) != prefix){
    return;
  }
  const commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

});

bot.login("NTM5ODUyNDI0MDY4OTg4OTI4.DzIYbA.YPnV2m9JhMur60X6AEr0Vf8mjNs")