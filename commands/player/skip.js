const { SlashCommandBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Bir sonraki şarkıya geçer."),
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
    if (!queue || !queue.isPlaying()) {
      await interaction.editReply("Çalınan bir şarkı yok.");
      return;
    }
    const prev = queue.currentTrack?.title;
    queue.node.skip();
    if (!prev) return;
    await interaction.editReply(`${prev} geçildi.`);
  },
};
