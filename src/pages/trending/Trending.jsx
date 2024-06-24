import React, { useEffect, useContext } from "react";
import ContextPage from "../../ContextPage";
import MovieCard from "../../components/MovieCard/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTextColor } from "../../Helper/textColor";
import noResultImage from "../../assets/images/Nosearch.png";
import "./styles.css";

const Trending = () => {
  const { trending, loader, page, setPage, totalPages, fetchTrending } =
    useContext(ContextPage);

  const textColor = useTextColor();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchTrending();
    }
  }, [page]);

  return (
    <>
      <div className={`trending-movies-container ${
          trending.length !== 0
            ? "trending-movies-container-with-result"
            : "trending-movies-container-no-result"
        }`}>
        <div className={`heading ${textColor}`}>
          <h1>Trending Movies</h1>
        </div>
        {trending.length !== 0 ? (
          <motion.div layout className="motion-container">
            <AnimatePresence>
              {loader ? (
                <span className="loader"></span>
              ) : (
                <>
                  <InfiniteScroll
                    className="infinite-scroll"
                    dataLength={trending.length}
                    next={() => setPage(page + 1)}
                    hasMore={page < totalPages}
                    loader={<span className="loader"></span>}
                    scrollThreshold={0.9}
                    style={{ overflow: "hidden" }}
                  >
                    {trending.map((trendingMovie) => (
                      <MovieCard
                        key={trendingMovie?.id}
                        movie={trendingMovie}
                      />
                    ))}
                  </InfiniteScroll>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="no-result-found-image-wrap" style={{ width: "100%", gap:"4.25rem" }}>
            <div className="no-result-image-container">
              <img src={noResultImage} style={{ height: "450px" }} />
            </div>
            <div className={`no_result_text ${textColor}`}>
              No Results Found!!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Trending;
