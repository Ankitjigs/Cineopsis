import React, { useState } from "react";
import "./styles.css";
import SearchIcon from "../../assets/images/search.svg";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../Helper/slugify";
import { useTheme } from "@mui/material";

const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const theme = useTheme();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  const handleSearch = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      onKeyUp(searchItem);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    if (query !== "") {
      query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`);
      }
    }
  };

  const onFocus = () => {
    let searchGroup = document.getElementById("search-containerId");
    searchGroup.classList.add("boxShadowInput");
    searchGroup.classList.add("inputClassFocus");
  };

  const onBlur = () => {
    let searchGroup = document.getElementById("search-containerId");
    searchGroup.classList.remove("boxShadowInput");
    searchGroup.classList.remove("inputClassFocus");
  };

  const imageStyle = {
    filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
  };

  return (
    <>
      <div className="container">
        <div className="search-wrap">
          <div
            id="search-containerId"
            className={`search-container ${
              theme?.palette?.mode === "light"
                ? "search-container-light"
                : "search-container-dark"
            }`}
          >
            <input
              name="search"
              id="search"
              className={`search-input ${
                theme?.palette?.mode === "light"
                  ? "search-input-color-light"
                  : "search-input-color-dark"
              }`}
              placeholder="Search Movies"
              value={searchItem}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyUp={(e) => handleSearch()}
            />
          </div>
          <button
            className={`search-button ${
              theme?.palette?.mode === "light"
                ? "search-button-light"
                : "search-button-dark"
            }`}
          >
            <div className="search-icon-wrap">
              <div>
                <img
                  src={SearchIcon}
                  className="search-icon"
                  alt="search-icon"
                  style={imageStyle}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
