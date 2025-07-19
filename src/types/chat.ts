export enum UserType {
    USER = 'user',
    BOT = 'assistant',
    SYSTEM = 'system',
}

export interface Message {
    role: UserType, content: string
}

export type ChatMessage =
  | Message
  | { role: 'function'; name: string; content: string };