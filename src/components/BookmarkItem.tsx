import { FC } from "react";
import { Anime } from "../services/types/Anime";
import Spinner from "./Spinner";
import MainCard from "./mainCard";
import MainCardSkelet from "./mainCard/skeleton";
import { useGetAnimeInfoQuery } from "../services/animeApi";

interface Props {
    id: string;
}

const BookmarkItem: FC<Props> = ({ id }) => {
    const { data, isLoading, isFetching } = useGetAnimeInfoQuery(id)

    const items = <MainCard image={data.image} id={data.id} title={data.title} key={data.id} />
    const skeletons = [...Array(12)].map((_, i) => <MainCardSkelet key={i} />);

    return (
        <ul className='flex flex-wrap gap-x-6 flex-gap gap-y-8 mb-12'>
            {!isLoading ? items : skeletons}
            {isFetching && !isLoading && <Spinner />}
        </ul>
    )
}
export default BookmarkItem

