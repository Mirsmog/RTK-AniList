import { useParams } from "react-router-dom";
import AnimeList from "@/components/AnimeList";
import { useGetSearchedAllQuery } from "@/services/animeApi";
import { useAppSelector } from "@/hooks/hooks";
import ScrollButton from "@/components/ScrollButton";

const SearchResult = () => {
  const { query = "" } = useParams();
  const page = useAppSelector((state) => state.filter.present.searchPage);
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetSearchedAllQuery({ query, page });
  const animeList = data?.results ? data.results : [];
  const hasNextPage = data?.hasNextPage ? data.hasNextPage : false;

  return (
    <div className="max-w-[1320px] mx-auto min-h-screen flex flex-col items-center justify-start ">
      <div className="mt-12 w-full">
        <AnimeList
          animeList={animeList}
          hasNextPage={hasNextPage}
          error={error}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
        />
      </div>
      <ScrollButton />
    </div>
  );
};
export default SearchResult;
