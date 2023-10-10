const Spinner = () => {
  return (
    <div className='text-center mb-24 w-full flex flex-col items-center -mt-10'>
      <span className='loading loading-infinity w-24 text-info'></span>
      <div className='-mt-4 text-xl font-semibold'>Please wait a moment!</div>
    </div>
  );
};
export default Spinner;
