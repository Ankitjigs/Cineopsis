import React, { useEffect, useContext } from "react";
import ContextPage from "../../ContextPage";
import MovieCard from "../MovieCard/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import noResultImage from "../../assets/images/Nosearch.png"
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.css";
import { useTextColor } from "../../Helper/textColor";

const Movies = () => {
  const {
    movies,
    loader,
    page,
    setPage,
    totalPages,
    setMovies,
    activeGenre,
    filteredGenres,
    language,
    lowerRating,
    higherRating,
    getRatedMovies,
  } = useContext(ContextPage);

  const textColor = useTextColor();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(0);
  }, [activeGenre]);

  useEffect(() => {
    if (page > 0) {
      filteredGenres();
    }
  }, [page]);
  

  useEffect(() => {
    setMovies([]);
    setPage(0);
    filteredGenres();
  }, [language]);

  useEffect(() => {
    setMovies([]);
    setPage(0);
    getRatedMovies();
  }, [lowerRating, higherRating]);

  return (
    <>
      {movies.length !== 0 ? (
        <div className="movies-container">
          <motion.div layout className="motion-container">
            <AnimatePresence>
              {loader ? (
                <span className="loader"></span>
              ) : (
                <>
                  <InfiniteScroll
                    className="infinite-scroll"
                    dataLength={movies.length}
                    next={() => setPage(page + 1)}
                    hasMore={page < totalPages}
                    loader={<span className="loader"></span>}
                    scrollThreshold={0.9}
                    style={{ overflow: "hidden" }}
                  >
                    {movies.map((movie) => (
                      <MovieCard key={movie?.id} movie={movie} />
                    ))}
                  </InfiniteScroll>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        <div className="no-result-found-image-wrap" style={{ width: "100%" }}>
          <div className="no-result-image-container">
            <img src={noResultImage} style={{ height: "140px" }} alt="no_result_image"/>
          </div>
          <div style={{display:'flex',color:textColor}}>No Results Found</div>
        </div>
      )}
    </>
  );
};

export default Movies;
