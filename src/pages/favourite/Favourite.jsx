import React, { useState, useEffect, useContext } from "react";
import ContextPage from "../../ContextPage";
import MovieCard from "../../components/MovieCard/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { useTextColor } from "../../Helper/textColor";
import noResultImage from "../../assets/images/Nosearch.png";
import "./styles.css";

const Favourite = () => {
  const { loader, getFavouriteMovie } = useContext(ContextPage);
  const [localStorageData, setLocalStorageData] = useState([]);
  const textColor = useTextColor();
  useEffect(() => {
    getFavouriteMovie();

    const data = localStorage;
    setLocalStorageData(data);
  }, []);
  return (
    <>
      <div className="movies-container" style={{height:"100vh"}}>
        <div className={`heading ${textColor}`}>
          <h1>Favourite Movies</h1>
        </div>
        <motion.div layout className="motion-container">
          <AnimatePresence>
            {loader ? (
              <span className="loader"></span>
            ) : (
              <>
                {Object.keys(localStorageData).filter((key) => !isNaN(key))
                  .length == 0 ? (
                  <div
                    className="no-result-found-image-wrap"
                    style={{ width: "100%", gap:"9rem" }}
                  >
                    <div className="no-result-image-container-favourite">
                      <img src={noResultImage} style={{height:"450px"}} />
                    </div>
                    <div className={`no_result_text ${textColor}`}>
                      No Results Found!!
                    </div>
                  </div>
                ) : (
                  Object.keys(localStorageData)
                    .filter((key) => !isNaN(key))
                    .map((key, index) => (
                      <div className="favourite-card-wrap" key={key}>
                        <MovieCard
                          key={index}
                          movie={{ ...JSON.parse(localStorageData[key]) }}
                        />
                      </div>
                    ))
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default Favourite;
