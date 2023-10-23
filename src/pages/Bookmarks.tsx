import React from "react";
import MainCardSkeleton from "../components/mainCard/skeleton";
import { useGetBookmarksQuery } from "../services/animeApi";
import MainCard from "../components/mainCard";

const Favorites = () => {
  const { data: bookmarks = [], isSuccess } = useGetBookmarksQuery();
  const skeletons = [...Array(18)].map((_, i) => <MainCardSkeleton key={i} />);
  React.useEffect(() => {
    document.title = "RTK AniList | Bookmarks";
  }, []);
  return (
    <div className=" mt-12 max-w-[1320px] w-full mx-auto">
      <ul className="flex flex-wrap gap-x-6 flex-gap gap-y-8 pb-12">
        {isSuccess
          ? bookmarks.map((anime) => (
              <MainCard key={anime.id} {...anime} isSearchCard={false} />
            ))
          : skeletons}

        {isSuccess && bookmarks.length < 1 && (
          <div className="w-full h-full flex justify-center items-center mt-20 text-4xl font-semibold">
            Please add an Anime first
          </div>
        )}
      </ul>
    </div>
  );
};
export default Favorites;
