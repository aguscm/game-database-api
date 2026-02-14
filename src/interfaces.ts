
export interface IToken {
  userId: string;
  username: string;
  token: string;
}

export interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string[];
  platform?: string[];
  developer?: string;
  release_date: string;
  popularity: number;
}