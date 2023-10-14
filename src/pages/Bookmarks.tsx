import BookmarkCard from '../components/BookmarkCard';
import MainCardSkelet from '../components/mainCard/skeleton';
import { useGetBookmarksQuery } from '../services/animeApi';

const Favorites = () => {
  const { data: bookmarks = [], isSuccess } = useGetBookmarksQuery();
  const skeletons = [...Array(12)].map((_, i) => <MainCardSkelet key={i} />);
  return (
    <div className=' mt-12 max-w-[872px] w-full mx-auto'>
      <ul className='flex flex-wrap gap-x-6 flex-gap gap-y-8 pb-12'>
        {isSuccess
          ? bookmarks.map(({ id, nameId }) => <BookmarkCard key={id} nameId={nameId} />)
          : skeletons}
        {isSuccess && bookmarks.length < 1 && (
          <div className='w-full h-full flex justify-center items-center mt-20 text-4xl font-semibold'>
            Please add an Anime first
          </div>
        )}
      </ul>
    </div>
  );
};
export default Favorites;
