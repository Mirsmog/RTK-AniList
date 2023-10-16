import { animateScroll as scroll } from 'react-scroll';
const ScrollButton = () => {

  return (
    <svg
      onClick={() => scroll.scrollToTop()}
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='fixed bottom-16 right-20 w-16 group cursor-pointer -rotate-90'
    >
      <path
        className='group-hover:fill-info transition-all duration-150'
        d='M50 0C36.7392 0 24.0215 5.26784 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C24.0215 94.7322 36.7392 100 50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 36.7392 94.7322 24.0215 85.3553 14.6447C75.9785 5.26784 63.2608 0 50 0ZM75 50.1C75.0084 50.6379 74.9083 51.172 74.7055 51.6702C74.5028 52.1685 74.2016 52.6208 73.82 53L57.36 69.41C56.9864 69.7843 56.5427 70.0813 56.0543 70.2841C55.5659 70.4869 55.0424 70.5915 54.5135 70.592C53.9847 70.5924 53.461 70.4887 52.9722 70.2868C52.4835 70.0848 52.0393 69.7886 51.665 69.415C51.2907 69.0414 50.9937 68.5977 50.7909 68.1093C50.5881 67.6209 50.4835 67.0974 50.483 66.5685C50.4826 66.0397 50.5863 65.516 50.7882 65.0272C50.9902 64.5385 51.2864 64.0943 51.66 63.72L61.3 54.07H29C27.9391 54.07 26.9217 53.6486 26.1716 52.8984C25.4214 52.1483 25 51.1309 25 50.07C25 49.0091 25.4214 47.9917 26.1716 47.2416C26.9217 46.4914 27.9391 46.07 29 46.07H61.39L51.66 36.34C50.9041 35.5841 50.4795 34.559 50.4795 33.49C50.4795 32.9607 50.5837 32.4366 50.7863 31.9476C50.9888 31.4586 51.2857 31.0143 51.66 30.64C52.0343 30.2657 52.4786 29.9688 52.9676 29.7663C53.4566 29.5637 53.9807 29.4595 54.51 29.4595C55.579 29.4595 56.6041 29.8841 57.36 30.64L73.82 47.05C74.1955 47.4233 74.4932 47.8674 74.6958 48.3567C74.8983 48.8459 75.0017 49.3705 75 49.9V50.1Z'
        fill='CurrentColor'
      />
    </svg>
  );
};
export default ScrollButton;
