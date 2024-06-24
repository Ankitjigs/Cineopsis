import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import noImageFound from "../../assets/images/no-image-found.jpg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import "./styles.css";

const MovieCard = ({ movie }) => {
  const [isFavouriteMovie, setIsFavouriteMovie] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(movie?.id)) {
      setIsFavouriteMovie(true);
    } else {
      setIsFavouriteMovie(false);
    }
  }, [movie?.id]);

  function FavouriteMovie() {
    setIsFavouriteMovie(!isFavouriteMovie);
    if (isFavouriteMovie) {
      localStorage.removeItem(movie?.id);
    } else {
      localStorage.setItem(movie?.id, JSON.stringify(movie));
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        layout
        className="card"
        key={movie?.id}
      >
        <div className="card-content-year">
          <h1 className="card-year">{movie?.release_date.slice(0, 4)}</h1>
        </div>
        <div className="card-content">
          <h1 className="card-title">
            {movie?.title.toString().length > 13
              ? movie?.title.slice(0, 12) + "..." ||
                movie?.name.slice(0, 12) + "..."
              : movie?.title || movie?.name}
          </h1>
        </div>
        <button className="bookmark-button" onClick={FavouriteMovie}>
          {isFavouriteMovie ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <Link to={`/movie/${movie.id}`} className="link"></Link>

        <div>
          {movie.poster_path === null ? (
            <img className="img" src={noImageFound} />
          ) : (
            <LazyLoadImage
              effect="blur"
              className="img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MovieCard;
