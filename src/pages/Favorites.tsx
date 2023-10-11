import AnimeList from "../components/AnimeList"
import BookmarkItem from "../components/BookmarkItem"
import { useGetAnimeInfoQuery, useGetBookmarksQuery } from "../services/animeApi"

const Favorites = () => {
  const { data: bookmarkList = [] } = useGetBookmarksQuery({})
  return (
    <div className=' mt-12 max-w-[872px] w-full'>
      {bookmarkList.map((obj: any) => (
        // <div>{obj.nameId}</div>
        <BookmarkItem id={obj.nameId} key={obj.id}/>
      ))}
    </div>
  )
}
export default Favorites