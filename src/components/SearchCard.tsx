import { FC } from "react"
import { Anime } from "@/services/types/Anime"
import { Link } from "react-router-dom"

interface SearchCardProps extends Anime {}

const SearchCard: FC<SearchCardProps> = ({ id, image, title, releaseDate, subOrDub }) => {
    return (
        <li className='w-full flex gap-4' key={id}>
            <Link className='max-w-[140px] w-full object-cover min-h-[200px] bg-black rounded-md overflow-hidden' to={`anime/${id}`}>
                <img className='w-full h-full object-cover hover:opacity-50 transition-opacity duration-150 ' src={image} alt={title} />
            </Link>
            <div className='pr-2'>
                <h3 className='text-xl font-semibold '>{title || 'unknown'}</h3>
                <div className='grow'>
                    <span>{releaseDate || 'unknown'} / </span>
                    <span className={`${subOrDub === 'dub' ? 'text-info' : 'text-indigo-500'} font-bold`}>{subOrDub}</span>
                </div>
            </div>
        </li>
    )
}
export default SearchCard