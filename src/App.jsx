import React, { useState } from "react";
import Header from "./components/Header/Header";
import { MovieProvider } from "./ContextPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SideBar from "./components/SideBar/SideBarComponent";
import Trending from "./pages/trending/Trending";
import Upcoming from "./pages/upcoming/Upcoming";
import Favourite from "./pages/favourite/Favourite";
import Search from "./pages/search/Search";
import { Movie } from "./components/Movie/Movie";
import { useBackgroundColor } from "./Helper/backgroundThemeColor";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const backgroundColor = useBackgroundColor();

  function handleToggleSideBar() {
    window.innerWidth >= 768 ? setCollapsed(!collapsed) : setToggled(!toggled);
  }

  return (
    <>
      <MovieProvider>
        <Header handleToggleSideBar={handleToggleSideBar} />
        <div style={{ display: "flex", marginTop: "3rem", height: "100%" }}>
          <SideBar
            collapsed={collapsed}
            toggled={toggled}
            setToggled={setToggled}
          />
          <div
            className={`${backgroundColor}`}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/trending" element={<Trending />}></Route>
              <Route path="/upcoming" element={<Upcoming />}></Route>
              <Route path="/favourite" element={<Favourite />}></Route>
              <Route path="/search/:query" element={<Search />}></Route>
              <Route path="/search/" element={<Search />}></Route>
              <Route path="/movie/:movieId" element={<Movie />}></Route>
            </Routes>
          </div>
        </div>

        {/* <BannerCarousel/> */}
      </MovieProvider>
    </>
  );
};

export default App;
