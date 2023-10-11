import { Link, NavLink } from "react-router-dom"
import Search from "./Search"
import React, { FC } from "react"

interface Props {
  overlay: React.RefObject<HTMLDivElement>
}

const Header: FC<Props> = ({ overlay }) => {
  const searchRef = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      const target = e as MouseEvent & {
        composedPath: Node[]
      }
      if (target.composedPath().includes(searchRef.current as HTMLDivElement) &&
        !target.composedPath().some((node: EventTarget) => (node as Node).nodeName === 'IMG') &&
        !target.composedPath().some((node: EventTarget) => (node as Node).nodeName === 'A')
        ){
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    overlay.current?.addEventListener('click', handleClickOut)
    return () => overlay.current?.removeEventListener('click', handleClickOut)
  }, [])

  return (
    <header className='bg-slate-900 py-4'>
      <div className='container mx-auto flex items-center justify-between ' ref={overlay}>
        <Link to={'/'} className='text-4xl font-bold text-info'><span className='text-white'>RTK</span> AniList</Link>
        <Search searchRef={searchRef} visible={visible} />
        <nav>
          <ul className='flex gap-4'>
            <NavLink className={({ isActive }) => isActive ? 'text-info nav-link_active' : 'nav-link_hover'} to={'/'}>Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-info nav-link_active' : 'nav-link_hover'} to={'/favorites'}>Bookmark</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default Header