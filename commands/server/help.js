const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Bot komutları hakkında bilgi verir."),
  async execute({ client, interaction }) {
    const replyEmbed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Sunucu Komutları")
      .setDescription("Serverda kullanılabilecek bot komutları")
      .addFields(
        { name: "\u200B", value: "\u200B" },
        { name: "Genel", value: "\u200B" },
        {
          name: "/coin",
          value: "Güncel Bitcoin, Ethereum ve Solana fiyatlarını gösterir.",
        },
        { name: "\u200B", value: "\u200B" },
        { name: "Müzik", value: "\u200B" },
        {
          name: "/play",
          value: "Aradığınız şarkıyı veya youtube linkini oynatır.",
        },
        {
          name: "/stop",
          value: "Çalan şarkıyı durdurur ve çalma listesini temizler.",
        },
        { name: "/pause", value: "Çalan şarkıyı duraklatır." },
        { name: "/resume", value: "Duraklatılan şarkıyı devam ettirir." },
        { name: "/prev", value: "Bir önceki şarkıyı çalar." },
        { name: "/skip", value: "Bir sonraki şarkıyı çalar." },
        { name: "\u200B", value: "\u200B" },
        { name: "Admin", value: "\u200B" },
        { name: "/delete", value: "Belirtilen sayıdaki mesajı kanaldan siler." }
      );
    await interaction.reply({ embeds: [replyEmbed] });
  },
};
