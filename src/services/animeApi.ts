import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetData } from '../models/anime.model';
import { AnimeInfo } from './types/AnimeInfo';
import { animeEpisode } from './types/AnimeEpisode';
import { Bookmarks } from './types/Bookmarks';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://manga-project-ten.vercel.app/anime/gogoanime/' }),
  tagTypes: ['Bookmarks'],
  endpoints: (build) => ({
    getSearchedAnime: build.query<IGetData, string>({ query: (value) => `${value}` }),

    getAnimeInfo: build.query<AnimeInfo, string>({ query: (id = '') => `info/${id}` }),
    getAnimeEpisode: build.query<animeEpisode, string>({
      query: (episodeId = '') => ({
        url: `/watch/${episodeId}`,
        params: { server: 'vidstreaming' },
        method: 'GET',
      }),
    }),

    getAnime: build.query<IGetData, { page?: number; genre?: string }>({
      query: ({ page = 1, genre = '' }) => ({
        url: genre ? `genre/${genre}?page=${page}` : `top-airing?page=${page}`,
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

    getSearchedAll: build.query<IGetData, { query?: string; page?: number }>({
      query: ({ query = '', page = 1 }) => ({
        url: `${query}?page=${page}`,
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

    getBookmarks: build.query<Bookmarks[], void>({
      query: () => ({
        url: 'https://65266250917d673fd76c20bc.mockapi.io/favorites',
        method: 'GET',
      }),
      providesTags: () => ['Bookmarks'],
    }),

    addBookmark: build.mutation<string, object>({
      query: (nameId) => ({
        url: 'https://65266250917d673fd76c20bc.mockapi.io/favorites',
        method: 'POST',
        body: nameId,
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    deleteBookmark: build.mutation<string, string | null>({
      query: (nameId = '') => ({
        url: `https://65266250917d673fd76c20bc.mockapi.io/favorites/${nameId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmarks'],
    }),
  }),
});
``;

export const {
  useGetAnimeQuery,
  useGetAnimeInfoQuery,
  useGetSearchedAllQuery,
  useGetAnimeEpisodeQuery,
  useGetSearchedAnimeQuery,
  useAddBookmarkMutation,
  useGetBookmarksQuery,
  useDeleteBookmarkMutation,
} = animeApi;
