
export enum MessageAuthor {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  text: string;
  author: MessageAuthor;
}
