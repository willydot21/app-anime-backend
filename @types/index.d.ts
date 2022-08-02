import { Request } from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION: boolean;
      PORT?: string;
      DATABASE: string;
      TOKEN_KEY: string;
      REFRESH_KEY: string;
    }
  }
}

export interface RequestProps extends Request {
  user?: any;
}

export interface AnimeArticle {
  name: string;
  id: string;
  poster: string;
}

export interface AnimeData {
  id: string;
  episodes: number[];
}

export interface UserAnimeInfo {
  watched: AnimeArticle[];
  watching: AnimeArticle[];
  considering: AnimeArticle[];
  animeHistory: AnimeData[];
}

export interface User {
  username: string;
  email: string;
  password: string;
  userAnimeInfo: UserAnimeInfo;
}

export interface AnimeEpisodesUpdateParams {
  animeid: string;
  episode: number;
}