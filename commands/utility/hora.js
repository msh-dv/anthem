const { SlashCommandBuilder } = require('discord.js');

 //Información básica del comando.
module.exports = {
  data:new SlashCommandBuilder()
  .setName('hora')
  .setDescription('Da la hora'),

  async execute(interaction) {
    const zonaHoraria = {
      mexico: 'America, Mexico City',
      colombia: 'America, Bogota',
    };

    const horaMexico = new intl.DateTimeFormat('es-MX', {
      timeZone: zonaHoraria, mexico,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());


  const horaColombia = new intl.DateTimeFormat('es-CO', {
      timeZone: zonaHoraria, colombia,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    await interaction.reply(
              await interaction.reply(
            `La hora actual es:\n🕰️ **México**: ${horaMexico}\n🕰️ **Colombia**: ${horaColombia}`),
        );
    },
};
    


  
