const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Anlık Bitcoin, Ethereum ve Solana fiyatlarını gösterir."),
  async execute({ client, interaction }) {
    const resBTC = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`
    );
    const dataBTC = await resBTC.json();
    const resETH = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`
    );
    const dataETH = await resETH.json();
    const resSOL = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT`
    );
    const dataSOL = await resSOL.json();
    const replyEmbed = new EmbedBuilder()
      .setColor("DarkGold")
      .setTitle("Güncel Coin Fiyatları")
      .setDescription("Anlık BTC, ETH ve SOL verileri.")
      .addFields(
        { name: "BTC", value: `$ ${dataBTC.price.slice(0, -6)}`, inline: true },
        { name: "ETH", value: `$ ${dataETH.price.slice(0, -6)}`, inline: true },
        { name: "SOL", value: `$ ${dataSOL.price.slice(0, -6)}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "Veriler Binance üzerinden sağlanmaktadır." });

    await interaction.reply({ embeds: [replyEmbed] });
  },
};
