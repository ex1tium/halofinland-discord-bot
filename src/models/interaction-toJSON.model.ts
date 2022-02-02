export interface ToJsonResponse {
  type:
    | 'APPLICATION_COMMAND'
    | 'PING'
    | 'MESSAGE_COMPONENT'
    | 'APPLICATION_COMMAND_AUTOCOMPLETE';
  id: string;
  applicationId: string;
  channelId: string;
  guildId: string;
  user: string;
  member: string;
  version: 1;
  memberPermissions: number;
  commandId: string;
  commandName: string;
  deferred: boolean;
  replied: boolean;
  ephemeral: null;
}
