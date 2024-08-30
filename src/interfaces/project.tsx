export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface LearnTier {
  document: string,
  questions: Question[]
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

export interface Tier {
  tier: number;
  maxTierCap: number;
  minUserCap: number;
  maxUserCap: number;
  tierUsers: number;
  whiteList: string[];
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
  learnTier: LearnTier;
  startAt: Date;
  endAt: Date;
  maxCap: number;
  numberOfTier: number;
  launchPadContract: string;
  tiers: Tier[]
  createdAt?: Date;
  updatedAt?: Date;
}
