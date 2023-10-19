const { SlashCommandBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Çalan şarkıyı duraklatır."),
  async execute({ client, interaction }) {
    const player = useMainPlayer(); // Get the player instance that we created earlier
    const channel = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;

    await interaction.deferReply();

    if (!channel)
      return interaction.reply("Bir ses kanalında olduğunuzdan emin olun."); // make sure we have a voice channel
    if (!interaction.guild) return;
    const queue = player.nodes.get(interaction.guild.id);
    try {
      if (!queue || !queue.isPlaying()) {
        await interaction.editReply("Çalınan bir şarkı yok.");
        return;
      }
      queue.node.pause();
      await interaction.editReply("Şarkı durduruldu.");
    } catch (e) {
      console.log(e);
    }
  },
};
