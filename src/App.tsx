import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import AnimeContent from '@/pages/FullAnime';
import React from 'react';
import Default from '@/layout/Default';
import SearchResult from '@/pages/SearchResult';
import Bookmarks from '@/pages/Bookmarks';

const App: React.FC = () => {
  return (
    <div className="bg-slate-800 w-full h-full text-white font-Raleway">
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<Home />}></Route>
          <Route path="bookmarks" element={<Bookmarks />}></Route>
          <Route path="anime" element={<AnimeContent />}></Route>
          <Route path="search/:query" element={<SearchResult />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
