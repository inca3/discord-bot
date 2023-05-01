const {
  Client,
  Collection,
  REST,
  Routes,
  Events,
  GatewayIntentBits,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// command handler
const commands = [];
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `${filePath} komutunda "data" veya "execute" alanı bulunamadı.`
      );
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`${commands.length} adet (/) komutu bulundu, güncelleniyor.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(`${data.length} adet (/) komutu başarıyla güncellendi.`);
  } catch (error) {
    console.error(error);
  }
})();

client.once(Events.ClientReady, (e) => {
  console.log(`${e.user.tag} olarak oturum açıldı.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`${interaction.commandName}, isminde bir komut bulunamadı.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Bu komut kullanılırken bir hata oluştu!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'Bu komut kullanılırken bir hata oluştu!',
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN);
