import React, { useEffect, useState, useContext } from "react";
import { useParams} from "react-router-dom";
import Contextpage from "../../ContextPage";
import BackIcon from "../../assets/images/left-chevron.svg";
import noimage from "../../assets/images/no-image-found.jpg";
import { slugify } from "../../Helper/slugify";
import { API_KEY } from "../../constants/api";
import { useTextColor } from "../../Helper/textColor";
import "./styles.css";

export const Movie = () => {
  
  const textColor = useTextColor();
  const { loader, setLoader } = useContext(Contextpage);
  const { movieId } = useParams();

  const [moviedet, setMoviedet] = useState({});
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  };

  useEffect(() => {
    fetchMovie();
    fetchCast();
  }, []);

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <span className="loader-movie"></span>
        </div>
      ) : (
        <>
          <div className="movie-container" style={{display:'flex'}}>
            <div className="poster-container">
              <div className="shadow-backdrop"></div>
              <h1 className="movie-title">{moviedet.title}</h1>
              {moviedet.backdrop_path === null ? (
                <img src={noimage} className="poster-image" alt="noimage" />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original/${moviedet.backdrop_path}`}
                  className="poster-image"
                  alt="movie-poster"
                />
              )}
            </div>

            <h2 className={`movie-overview ${textColor}`}>{moviedet.overview}</h2>

            <div className="release-date-container">
            <h2 className={`release-date ${textColor}`}>Release Date: {moviedet.release_date}</h2>
          </div>

            <div className="genres-container">
            {moviegenres.map((tag) => (
              <div key={tag.id} className="genre-tag">{tag.name}</div>
            ))}
          </div>

            <div className="cast-container">
            <h1 className={`cast-title ${textColor}`}>Cast</h1>
            <div className="cast-list">
              {castdata.map((cast) => (
                cast.profile_path && (
                  <div key={cast.id} className={`cast-item ${textColor}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} className="cast-image" alt="cast"/>
                    <p className="cast-name">{cast.name}</p>
                    <p className="cast-character">({cast.character})</p>
                  </div>
                )
              ))}
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};
