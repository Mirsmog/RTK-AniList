import ContentLoader from "react-content-loader";

const MainCardSkeleton = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={332}
    viewBox="0 0 200 332"
    backgroundColor="#7689a3"
    foregroundColor="#8797ad"
  >
    <rect x="0" y="0" rx="12" ry="12" width="200" height="300" />
    <rect x="10" y="315" rx="4" ry="4" width="180" height="15" />
  </ContentLoader>
);

export default MainCardSkeleton;
