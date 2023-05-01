const {SlashCommandBuilder, GuildMember} = require('discord.js')
const { useMasterPlayer } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Aradığınız şarkıyı oynatır.")
    .addStringOption(option => 
        option
        .setName('ara')
        .setDescription('Arama')
        .setRequired(true)),
    async execute({client, interaction}) {
        const player = useMasterPlayer(); // Get the player instance that we created earlier
        await player.extractors.loadDefault();

        const channel = interaction.guild.members.cache.get(interaction.member.user.id).voice.channelId

        if (!channel) return interaction.reply('Bir ses kanalında olduğunuzdan emin olun.'); // make sure we have a voice channel
        if (!interaction.guild) return;

        await interaction.deferReply();
        
        const query = interaction.options.getString('ara', true); // we need input/query to play
        const {searchResult, queue} = await player.play(channel, query, {
            nodeOptions: {
                leaveOnEnd: true,
                leaveOnStop: true,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
                selfDeaf: false,
                metadata: interaction,
            },
        })
        if (!queue.isPlaying()) {
            await queue.node.play();
        }

        if (!searchResult.hasTracks()) {
            await interaction.editReply(`**${query}** aramasıyla bir sonuç bulunamadı!`);
            return;
        } 
        await interaction.editReply(
            searchResult.playlist
                ? `${searchResult.tracks.length} şarkı çalma listesine eklendi.`
                : `**${searchResult.tracks[0].title}** listeye eklendi.`,
        )
    }
}