export interface DefineDiscordCommand {
  name: string;
  description: string;
  type?: number;
  options?: DefineDiscordCommand[];
  required?: boolean;
  default_permission?: boolean;
  choices?: Choice[];
}

export interface Choice {
  name: string;
  value: string;
}
