import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetData } from '@/models/anime.model';
import { AnimeInfo } from '@/services/types/AnimeInfo';
import { animeEpisode } from '@/services/types/AnimeEpisode';
import { Anime } from '@/services/types/Anime';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://anilist-api-wheat.vercel.app/anime/gogoanime/',
  }),
  tagTypes: ['Bookmarks'],
  endpoints: (build) => ({
    getSearchedAnime: build.query<IGetData, string>({
      query: (value) => `${value}`,
    }),

    getAnimeInfo: build.query<AnimeInfo, string>({
      query: (id = '') => `info/${id}`,
    }),
    getAnimeEpisode: build.query<animeEpisode, string>({
      query: (episodeId = '') => ({
        url: `/watch/${episodeId}`,
        params: { server: 'mp4upload' },
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
          const isDuplicate = currentCache.results.find(
            (obj) => obj.id === item.id
          );
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
          const isDuplicate = currentCache.results.find(
            (obj) => obj.id === item.id
          );
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

    getBookmarks: build.query<Anime[], void>({
      query: () => ({
        url: 'https://65266250917d673fd76c20bc.mockapi.io/favorites',
        method: 'GET',
      }),
      providesTags: () => ['Bookmarks'],
    }),

    addBookmark: build.mutation<Anime, Anime>({
      query: (data) => ({
        url: 'https://65266250917d673fd76c20bc.mockapi.io/favorites',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    deleteBookmark: build.mutation<string, string | undefined>({
      query: (mockId = '') => ({
        url: `https://65266250917d673fd76c20bc.mockapi.io/favorites/${mockId}`,
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
