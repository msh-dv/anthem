import { SlashCommandBuilder }  from 'discord.js';
export default  {
     data: new SlashCommandBuilder()
        .setName('hora')
        .setDescription('Muestra la hora actual en México y Colombia'),

    async execute(interaction) {
        const zonasHorarias = {
            mexico: 'America/Mexico_City',
            colombia: 'America/Bogota',
        };

        const ahoraMexico = new Intl.DateTimeFormat('es-MX', {
            timeZone: zonasHorarias.mexico,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date());

        const ahoraColombia = new Intl.DateTimeFormat('es-CO', {
            timeZone: zonasHorarias.colombia,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date());

        await interaction.reply(
            `La hora actual es:\n🕰️ **México**: ${ahoraMexico}\n🕰️ **Colombia**: ${ahoraColombia}`
        );
    },
};    


  
