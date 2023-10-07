import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import NotFound from "../pages/NotFound";
import { useGetAnimeQuery } from "../services/animeApi";
import SearchCard from "./SearchCard";
import SearchCardSkelet from "./SearchCard/skeleton";
import Spinner from "./Spinner";
import React from "react";
import { setPage } from "../redux/slices/filterSlice";

const AnimeList = () => {
    const { searchValue, page, genre } = useAppSelector((state) => state.filter);
    const { ref, inView } = useInView({});
    const dispatch = useAppDispatch();

    const { data, error, isLoading, isFetching, isSuccess } = useGetAnimeQuery({
        searchValue,
        genre,
        page,
    });

    const animeList = data?.results ? data.results : [];
    const hasNextPage = data?.hasNextPage ? data.hasNextPage : false;

    React.useEffect(() => {
        inView && hasNextPage && nextPage();
    }, [isSuccess, inView]);


    const nextPage = () => {
        dispatch(setPage(page + 1));
    };

    if (error) return <NotFound />;

    const items = animeList.map((obj) => (
        <SearchCard {...obj} key={obj.id} />
    ));
    const skeletons = [...Array(12)].map((_, i) => <SearchCardSkelet key={i} />);

    return (
        <ul className='flex flex-wrap gap-x-6 flex-gap gap-y-8 mb-12'>
            {!isLoading ? items : skeletons}
            {isSuccess && <div ref={ref}></div>}
            {isFetching && !isLoading && <Spinner />}
        </ul>
    )
}
export default AnimeList