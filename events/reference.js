export default {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) {
      return;
    }
    const reference = message.reference;
    const channel = message.channel;

    let referencedMessageContent = "";
    let referencedAttachmentUrl = null;
    if (reference) {
      try {
        const referencedMessage = await channel.messages.fetch(
          reference.messageId
        );
        referencedMessageContent = referencedMessage.content;
        if (referencedMessage.attachments.size > 0) {
          referencedAttachmentUrl = referencedMessage.attachments.first().url;
        }

        await channel.send(
          `Mensaje: ${referencedMessageContent}\nURL: ${referencedAttachmentUrl}`
        );
      } catch (err) {
        console.error("Error al obtener el mensaje referenciado:", err.message);
      }
    }
  },
};
