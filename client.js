//bora tomar uma bot de musica
import ytdl from "ytdl-core";
import { Client, GatewayIntentBits } from "discord.js";
import { config as dotenvConfig } from "dotenv";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  getVoiceConnection,
  VoiceConnectionStatus,
} from "@discordjs/voice";

dotenvConfig();
const boraTomarUmaClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

boraTomarUmaClient.on("ready", async () => {
  let channel = boraTomarUmaClient.channels.cache.get("1048591185935081502");

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  console.log("logado");
});

boraTomarUmaClient.on("messageCreate", async (message) => {
    
  async function playAudio() {
    console.log('running...');
    let channel = boraTomarUmaClient.channels.cache.get("1048591185935081502");
    //  let audio = await ytdl(url, { filter: "audioonly" });
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource("./bora.mp3");
    player.play(resource);
    connection.subscribe(player);
  }
  playAudio();

  if (message.author.bot) return;
  if (message.content == "bora tomar uma?") {
    return message.reply({ content: "bora" });
  }
});

boraTomarUmaClient.login(process.env.TOKEN);
