const {SlashCommandBuilder} = require('discord.js')
const { useMasterPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("prev")
    .setDescription("Bir önceki şarkıya döner."),
    async execute({client, interaction}) {
        const player = useMasterPlayer(); // Get the player instance that we created earlier
        const channel = interaction.guild.members.cache.get(interaction.member.user.id).voice.channelId
        
        await interaction.deferReply();
        
        if (!channel) return interaction.reply('Bir ses kanalında olduğunuzdan emin olun.'); // make sure we have a voice channel
        if (!interaction.guild) return;
        const queue = player.nodes.get(interaction.guild.id);
        if (!queue || !queue.isPlaying()) {
            await interaction.editReply('Çalınan bir şarkı yok.');
            return;
        }
        if (queue.history.isEmpty()) {
            await interaction.editReply('Daha eski bir şarkı bulunamadı.')
            return;
        }
        await queue.history.back();
        await interaction.editReply(`Bir önceki şarkı oynatılıyor.`);
        
    }
}