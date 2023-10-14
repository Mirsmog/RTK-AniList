import { useGetAnimeInfoQuery } from '../services/animeApi';
import { Anime } from '../services/types/Anime';
import MainCard from './mainCard';
import MainCardSkelet from './mainCard/skeleton';

interface Props {
  nameId: string;
}
const BookmarkCard: React.FC<Props> = ({ nameId }) => {
  const { data, isSuccess } = useGetAnimeInfoQuery(nameId);
  return isSuccess ? (
    <MainCard {...(data as Anime)} id={nameId} isSearchCard={false} />
  ) : (
    <MainCardSkelet key={nameId} />
  );
};
export default BookmarkCard;
