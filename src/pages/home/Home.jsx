import Movies from "../../components/Movies/Movies";
import Search from "../search/Search";

import { useParams } from "react-router-dom";

const Home = () => {
  const { query } = useParams();

  return (
    <>
      <div className="home-container">
        {/* <BannerCarousel/> */}
        {query ? <Search /> : <Movies />}
        {/* <Movies/> */}
      </div>
    </>
  );
};

export default Home;
