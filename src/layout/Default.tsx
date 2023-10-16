import { Outlet } from 'react-router-dom';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../components/Header';
import ScrollButton from '../components/ScrollButton';

const Default: React.FC = () => {
  const { inView, ref } = useInView({ rootMargin: '500px' });
  const overlay = React.useRef<HTMLDivElement>(null);
  return (
    <div className='wrapper' ref={overlay}>
      <Header watcher={ref} overlay={overlay} />
      <main className='fullHeight'>
        <Outlet />
      </main>
      {!inView && <ScrollButton />}
    </div>
  );
};
export default Default;
