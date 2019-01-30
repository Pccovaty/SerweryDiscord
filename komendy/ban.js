const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async(bot, message, args) => {
 const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
 if (!member) return message.channel.send("Najpierw oznacz użytkownika!");
  const bReason = args.join(" ").slice(22);
 
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":lock: | Dostęp zablokowany! Nie posiadasz roli z uprawieniami ``BAN_MEMBERS``");
  const banEmbed = new Discord.RichEmbed()
    .setTitle("⛔ Ban")
    .setColor("#ff0000")
    .setTimestamp()
    .setDescription(`**▸ Zbanowany użytkownik:** ${member.user.tag} \n **▸ Zbanowany przez:** ${message.author.tag} \n **▸ Powód:** ${bReason}`)
    .setFooter(` ${message.author.tag}`, `${message.author.avatarURL}`)

  const incidentchannel = message.guild.channels.find("name", "mod-log");
  if (!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału. ``mod-log``");
  message.channel.send(`Niestety, kolejny ban został znów dany... ci ludzie nie mają mózgu czy co?`);



  message.guild.member(member).ban(bReason);
  incidentchannel.send(banEmbed);
  message.react("452183703267835910");


};

module.exports.help = {
  name: "ban"
};