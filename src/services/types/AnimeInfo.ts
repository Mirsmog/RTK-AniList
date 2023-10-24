import { IGenres } from '@/services/types/Anime';

export interface AnimeInfo {
  id: string;
  title: string;
  url: string;
  genres: IGenres[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  url: string;
}
