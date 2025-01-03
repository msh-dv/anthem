import { Events } from "discord.js";

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command ${interaction.commandName} found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was a problem executing this command!",
          ephemeral: false,
        });
      } else {
        await interaction.reply({
          content: "There was a problem executing this command!",
          ephemeral: false,
        });
      }
    }
  },
};
