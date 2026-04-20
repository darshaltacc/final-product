export type View = 'dashboard' | 'curriculum' | 'badges';

export interface Module {
  id: string;
  number: string;
  title: string;
  icon: string;
  mastery: number; // 0-100
  level: number;
  locked: boolean;
  content?: ModuleContent;
}

export interface ModuleContent {
  sections: Array<{
    id: string;
    number: string;
    title: string;
    body: string;
    codeExample?: string;
  }>;
  challenges: Array<{
    id: string;
    level: string;
    title: string;
    task: string;
    xp: number;
    validation: (globals: any) => boolean;
  }>;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}
