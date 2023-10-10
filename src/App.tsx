import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AnimeContent from './pages/FullAnime';
import { FC } from 'react';
import Default from './layout/Default';
import Favorites from './pages/Favorites';
import SearchResult from './pages/SearchResult';

const App: FC = () => {
  return (
    <div className='bg-slate-800 w-full h-full text-white font-Raleway body-scroll'>
      <Routes>
        <Route path='/' element={<Default />}>
          <Route index element={<Home />}></Route>
          <Route path='favorites' element={<Favorites />}></Route>
          <Route path='anime/:id' element={<AnimeContent />}></Route>
          <Route path='search/:query' element={<SearchResult />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
