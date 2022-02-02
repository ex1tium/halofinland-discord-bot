import { DiscordPipeTransform } from '@discord-nestjs/core';
import { Message } from 'discord.js';

/* The MessageToUpperPipe class implements the DiscordPipeTransform interface. The transform method
takes an array of Message objects as an argument and returns an array of Message objects. The
transform method returns a new array of Message objects with the content of each Message object in
the array converted to uppercase. */
export class MessageToUpperPipe implements DiscordPipeTransform {
  transform([message]: [Message]): [Message] {
    message.content = message.content.toUpperCase();

    return [message];
  }
}
