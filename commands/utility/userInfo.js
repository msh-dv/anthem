import { SlashCommandBuilder, bold } from "discord.js";
import { EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("User information."),
  async execute(interaction) {
    const i = interaction.user;
    const member = interaction.member;
    const roles = member.roles.cache.map((role) => role.name).join(", ");

    const userInfo = new EmbedBuilder()
      .setColor("White")
      .setTitle(`${member.nickname} (${i.username})`)
      .setDescription("User information:")
      .setThumbnail(i.avatarURL())
      .addFields(
        {
          name: bold("ID"),
          value: `${i.id}`,
        },
        {
          name: bold("Created at:"),
          value: `${i.createdAt}`,
        },
        {
          name: bold("Rols:"),
          value: `${roles}`,
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [userInfo], ephemeral: true });
  },
};
