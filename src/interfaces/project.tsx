export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Contact {
  optionId: number;
  name: string;
  value: string;
}
export interface Project {
  _id?: string;
  creator: string;
  avatarId: string;
  bgId: string;
  name: string;
  description: string;
  ownerAddress: string;
  tokenAddress: string;
  contacts: Contact[];
  learnTier: Question[]
  startAt: Date;
  endAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
