import { Link, NavLink } from "react-router-dom"
import Search from "./Search"
import Genres from "./Genres"

const Header = () => {
  return (
    <header className='bg-slate-900 py-4'>
      <div className='container mx-auto flex items-center justify-between '>
        <Link to={'/'} className='text-4xl font-bold text-info'><span className='text-white'>RTK</span> AniList</Link>
        <Search />
        <nav>
          <ul className='flex gap-4'>
            <NavLink className={({ isActive }) => isActive ? 'text-info border-b border-info' : 'nav-link_hover'} to={'/'}>Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-info border-b border-info' : 'nav-link_hover'} to={'/favorites'}>Favorites</NavLink>
            <div className={'nav-link_hover dropdown dropdown-bottom dropdown-left'}>
              <label tabIndex={0} className="cursor-pointer">Genres</label>
              <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-[600px]">
                <Genres />
              </ul>

            </div>
            <NavLink className={({ isActive }) => isActive ? 'text-info border-b border-info' : 'nav-link_hover'} to={'/favorites'}>New episode</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default Header