  const {
  MessageEmbed
} = require(`discord.js`);
const playermanager = require(`../../handlers/lavalink/playermanager`);
module.exports = {
  name: `soundcloud`,
  category: `Song`,
  aliases: [`sc`],
  description: `Plays a song from SounCloud with the given name/url`,
  usage: `soundcloud <link/query>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      channel
    } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    const botchannel = message.guild.me.voice.channel;
    //if no args added return error message if allowed to send an embed
    if (!args[0]) {
      let string = `${prefix}play <link/query>`
      let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
      if (message.guild.me.hasPermission("EMBED_LINKS")) {
        message.channel.send(embed)
      } else {
        message.channel.send("**:x: Invalid usage**\n" + string)
      }
      return;
    }
    ///get the player
    const player = client.manager.players.get(message.guild.id);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
    //if bot connected bot not with the lavalink player then try to delete the player
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    //IF YOUTUBE SEND INFO WITH YOUTUBE
    if (message.content.includes("youtu")) {
      //send searching
      message.channel.send(`<:youtube:873503175594893343> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SPOTIFY SEARCH SEND INFO WITH SPOTIFY
    } else if (message.content.includes("spotify")) {
      //send searching
      message.channel.send(`<:spotify:873503176630870066> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SOUNDCLOUD SEARCH SEND INFO WITH SOUNDCLOUD
    } else if (message.content.includes("soundcloud")) {
      //send searching
      message.channel.send(`<:soundcloud:873503176307908698> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:soundcloud`);
      //ELSE SEND RYTHM INFO
    } else if (message.content.includes("http")) {
      //send searching
      message.channel.send(`<a:tickpremium:842289629575381002> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:soundcloud`);
    } else {
      //send searching
      message.channel.send(`<:soundcloud:873503176307908698> **Searching** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:soundcloud`);
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
