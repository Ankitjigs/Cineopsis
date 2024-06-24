import React, { useContext, useEffect, useState } from "react";
import ContextPage from "../../ContextPage";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTextColor } from "../../Helper/textColor";
import noResultImage from "../../assets/images/Nosearch.png";
import "./styles.css";

const Search = () => {
  const { loader, searchedMovies, searchQuery, header } =
    useContext(ContextPage);
  const textColor = useTextColor();
  const { query } = useParams();

  useEffect(() => {
    searchQuery(query);
  }, [query]);

  return (
    <>
      <div className="movies-container">
        <div className={`heading ${textColor}`}>
          <h1>Results for {query}</h1>
        </div>
        {searchedMovies.length !== 0 ? (
          <motion.div layout className="motion-container">
            <AnimatePresence>
              {loader ? (
                <span className="loader"></span>
              ) : (
                <>
                  {searchedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="no-result-found-image-wrap" style={{width:"100%"}}>
            <div className="no-result-image-container">
              <img src={noResultImage} style={{}}/>
            </div>
            <div className={`no_result_text ${textColor}`}>No Results Found!!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
