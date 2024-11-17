const { SlashCommandBuilder, bold } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Shows information about the server."),
  async execute(interaction) {
    const inter = interaction.guild;

    const serverInfo = new EmbedBuilder()
      .setColor("White")
      .setTitle(`${inter.name}`)
      .setDescription(bold("Server information:"))
      .setThumbnail(inter.iconURL())
      .addFields(
        {
          name: bold("ID"),
          value: `${inter.id}`,
        },
        {
          name: bold("User count:"),
          value: `${inter.memberCount}`,
        },
        {
          name: bold("Created at:"),
          value: `${inter.createdAt}`,
        },
        {
          name: bold("Server owns ID:"),
          value: `${inter.ownerId}`,
        },
        {
          name: bold("Boosts:"),
          value: `${inter.premiumSubscriptionCount}`,
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [serverInfo] });
  },
};
