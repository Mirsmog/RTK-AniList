import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetData } from '../models/anime.model';
import { AnimeInfo } from './types/AnimeInfo';
import { animeEpisode } from './types/AnimeEpisode';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://manga-project-ten.vercel.app/anime/gogoanime/' }),
  endpoints: (build) => ({
    getAnime: build.query<IGetData, { searchValue?: string; page?: number; genre?: string }>({
      query: ({ searchValue = '', page = 1, genre = '' }) => ({
        url: searchValue
          ? `${searchValue}?page=${page}`
          : genre
          ? `genre/${genre}?page=${page}`
          : `top-airing?page=${page}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItem) => {
        // check for dublies
        for (const item of newItem.results) {
          const isDuplicate = currentCache.results.find((obj) => obj.id === item.id);
          if (!isDuplicate) {
            currentCache.results.push(item);
          }
          if (newItem.hasNextPage === false) {
            currentCache.hasNextPage = false;
          }
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getAnimeInfo: build.query<AnimeInfo, string>({
      query: (id = '') => `info/${id}`,
    }),
    getAnimeEpisode: build.query<animeEpisode, string>({
      query: (episodeId = '') => ({
        url: `/watch/${episodeId}`,
        params: { server: 'vidstreaming' },
        method: 'GET',
      }),
    }),
  }),
});
``;

export const { useGetAnimeQuery, useGetAnimeInfoQuery, useGetAnimeEpisodeQuery } = animeApi;
