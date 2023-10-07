import { Anime } from "../services/types/Anime";

export interface IGetData {
  currentPage: string;
  hasNextPage: boolean;
  results: Anime[];
}
