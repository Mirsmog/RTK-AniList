import { Anime } from "../services/types/Anime";
import MainCard from "./mainCard";
import MainCardSkeleton from "./mainCard/skeleton";

const isSuccess = true;
const BookmarkCard: React.FC<Anime> = ({ id, image, title }) => {
  return isSuccess ? (
    <MainCard {...( as Anime)} id={nameId} isSearchCard={false} />
  ) : (
    <MainCardSkeleton key={nameId} />
  );
};
export default BookmarkCard;
