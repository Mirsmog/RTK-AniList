import { FC } from "react"
import { AnimeInfo } from "../services/types/AnimeInfo"
import { shortText } from "../utils/shortText"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { setGenre } from "../redux/slices/filterSlice"
import { useAddBookmarkMutation } from "../services/animeApi"
import { useParams } from "react-router-dom"

interface FullCardProps extends AnimeInfo { }

const FullCard: FC<FullCardProps> = ({ image, genres, otherName, title, subOrDub, description, releaseDate, status, type, totalEpisodes }) => {
	const dispatch = useAppDispatch()
	const genre = useAppSelector(state => state.filter.present.genre)
	const { id = '' } = useParams()
	const [setPost, { data }] = useAddBookmarkMutation()
	const addFavorite = async (nameId: string) => {
		await setPost({ nameId })
		console.log(data)
	}
	return (
		<div className="card card-side bg-base-100 shadow-xl">
			<figure className='w-full max-w-[230px] justify-start'><img className='object-cover self-start w-full h-auto' src={image} alt="Movie" /></figure>
			<div className="card-body p-6 pr-8">
				<div className='flex justify-between'>
					<h2 className="card-title">{title}</h2>
					<div className={`capitalize ${subOrDub === 'dub' && 'bg-indigo-500'} bg-accent p-[1px] px-3 rounded-full self-start text-white ml-2 text-basic align-top font-semibold`}>{subOrDub}</div>
				</div>
				<div className='pr-8' dangerouslySetInnerHTML={{ __html: shortText(otherName, 120) }}></div>
				<ul className='flex gap-2 mb-2 flex-wrap'>
					{genres.map((genreObj) =>
						<li
							key={genreObj}
							onClick={() => genre !== genreObj || '' && dispatch(setGenre(genreObj))}
							className='px-2 py-1 pb-[6px] text-info border-info text-sm border leading-4 rounded-full hover:border-indigo-400 hover:text-indigo-400'
						>
							{genreObj + genre}
						</li>
					)}
				</ul>
				<div className='text-sm text-slate-500' dangerouslySetInnerHTML={{ __html: shortText(description, 300) }}></div>
				<div className='flex gap-4 text-sm text-slate-300'>
					<div>
						<p>Realse: {releaseDate}</p>
						<p>Status: {status}</p>
					</div>
					<div>
						<p>Episodes: {totalEpisodes}</p>
						<p>type: {type}</p>
					</div>
				</div>

				<svg className="w-6 h-6 mt-auto ml-auto fill-transparent stroke-yellow-400 hover:fill-yellow-400 cursor-pointer active:scale-75 transition-all duration-200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => addFavorite(id)}>
					<path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" strokeWidth="1.5" />
				</svg>
			</div>
		</div >
	)
}
export default FullCard