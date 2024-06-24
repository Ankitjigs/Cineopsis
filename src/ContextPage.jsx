import { createContext, useState, useEffect } from "react";
import { API_KEY } from "./constants/api";
import { genresList } from "./constants/genre";

const ContextPage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("Trending");
  const [totalPages, setTotalPages] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(28);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loader, setLoader] = useState(true);
  const [backGenre, setBackGenre] = useState(false);
  const [language, setLanguage] = useState("hi");
  const [ lowerRating, setLowerRating] = useState(0.0);
  const [higherRating, setHigherRating] = useState(10.0);
  

  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
  }, [page]);

  async function filteredGenres() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${activeGenre}&with_original_language=${language}&api_key=${API_KEY}&page=${page}`
      );

      if (response.ok) {
        const filteredGenres = await response.json();
        setMovies((prevMovies) => {
          const newMovies = filteredGenres?.results.filter(
            (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(filteredGenres?.total_pages);
        setLoader(false);
        let headerObject = genresList["genres"].find(
          (item) => item?.id === activeGenre
        );
        setHeader(String(headerObject?.name));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getRatedMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${activeGenre}&with_original_language=${language}&api_key=${API_KEY}&page=${page}&vote_average.gte=${lowerRating}&vote_average.lte=${higherRating}`
      );

      if (response.ok) {
        const filteredRatedMovies = await response.json();
        // setMovies((prevMovies) => {
        //   const newMovies = filteredRatedMovies?.results.filter(
        //     (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
        //   );
        //   return [...prevMovies, ...newMovies];
        // });
        setMovies(filteredRatedMovies?.results);
        setTotalPages(filteredRatedMovies?.total_pages);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }



  async function searchQuery(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
      );

      if (response.ok) {
        const searchMovies = await response.json();
        setSearchedMovies(searchMovies?.results);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getGenre() {
    setGenres(genresList?.["genres"]);
  }

  async function fetchUpcoming() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&&with_original_language=${language}&language=en-US&page=${page}`
      );

      if (response.ok) {
        const upcomingMovies = await response.json();
        setUpcoming((prevMovies) => {
          const newMovies = upcomingMovies?.results.filter(
            (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(upcomingMovies?.total_pages);
        setLoader(false);
        setHeader("Upcoming Movies");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&&with_original_language=${language}&page=${page}`
      );

      if (response.ok) {
        const trendingMovies = await response.json();
        setTrending((prevMovies) => {
          const newMovies = trendingMovies?.results.filter(
            (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(trendingMovies?.total_pages);
        setLoader(false);
        setHeader("Trending Movies");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getFavouriteMovie() {
    setLoader(false);
  }

  return (
    <ContextPage.Provider
      value={{
        getGenre,
        genres,
        setGenres,
        filteredGenres,
        activeGenre,
        setActiveGenre,
        header,
        setHeader,
        movies,
        setMovies,
        searchedMovies,
        page,
        setPage,
        searchQuery,
        loader,
        setLoader,
        backGenre,
        setBackGenre,
        trending,
        setTrending,
        fetchTrending,
        upcoming,
        setUpcoming,
        fetchUpcoming,
        getFavouriteMovie,
        totalPages,
        language,
        setLanguage,
        lowerRating,
        higherRating,
        setLowerRating,
        setHigherRating,
        getRatedMovies
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextPage;
