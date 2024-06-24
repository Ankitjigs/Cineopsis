import "./styles.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import genreIcons from "../../assets/images/genre";
import { genresList } from "../../constants/genre";
import { languages } from "../../constants/language";
import { ratings } from "../../constants/rating";
import { useContext, useEffect } from "react";
import ContextPage from "../../ContextPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
const SideBarComponent = ({ collapsed, toggled, setToggled }) => {
  const theme = useTheme();

  let { pathname } = useLocation();
  let navigate = useNavigate();

  const {
    activeGenre,
    setActiveGenre,
    language,
    setLanguage,
    lowerRating,
    higherRating,
    setLowerRating,
    setHigherRating,
  } = useContext(ContextPage);

  const menuItemStyles = {
    root: {
      borderRadius: "0.375rem",
      fontFamily: "Roboto",
    },
    button: () => {
      return {
        "&:hover": {
          backgroundColor: "#c893e3",
        },
      };
    },
  };

  const categories = [
    { label: "Trending", value: "trending" },
    { label: "Favourite", value: "favourite" },
    { label: "Upcoming", value: "upcoming" },
  ];

  const genreImagesStyle = {
    filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-wrap">
          <Sidebar
            toggled={toggled}
            breakPoint="md"
            collapsed={collapsed}
            onBackdropClick={() => setToggled(false)}
            style={
              theme?.palette?.mode === "light"
                ? { background: "#ffffff", color: "#2c2c2c", border: "none" }
                : { background: "#09020d", color: "#ffffff", border: "none" }
            }
          >
            <Menu menuItemStyles={menuItemStyles}>
              <div
                className={`menu-Heading-Class ${
                  theme.palette.mode === "light"
                    ? "menu-Heading-Class-Light"
                    : "menu-Heading-Class-Dark"
                }`}
              >
                Categories
              </div>
              {categories.map((item, index) => (
                <MenuItem
                  key={index}
                  className={
                    pathname === `/${item.value}`
                      ? theme?.palette.mode === "light"
                        ? "genreActive"
                        : "genreActiveDark"
                      : ""
                  }
                  icon={
                    <img
                      className="image-icon"
                      src={genreIcons[item?.label.toLowerCase()]}
                      style={genreImagesStyle}
                    />
                  }
                  onClick={() => navigate(`/${item?.value}`)}
                >
                  {item?.label}
                </MenuItem>
              ))}
            </Menu>
            <div
              className={`${
                theme.palette.mode === "light"
                  ? "borderBottomLight"
                  : "borderBottomDark"
              }`}
            ></div>
            <Menu menuItemStyles={menuItemStyles}>
              <div className="menu-Heading-Class">Language</div>
              {languages.map((item, index) => (
                <MenuItem
                  key={index}
                  className={
                    item?.iso_639_1 === language
                      ? theme?.palette.mode === "light"
                        ? "genreActive"
                        : "genreActiveDark"
                      : ""
                  }
                  onClick={() => {
                    setLanguage(item?.iso_639_1);
                  }}
                  style={{ paddingLeft: "2rem" }}
                >
                  {item?.name}
                </MenuItem>
              ))}
            </Menu>
            <div
              className={`${
                theme.palette.mode === "light"
                  ? "borderBottomLight"
                  : "borderBottomDark"
              }`}
            ></div>
            <Menu menuItemStyles={menuItemStyles}>
              <div className="menu-Heading-Class">Genre</div>

              {genresList?.genres.map((item) => (
                <MenuItem
                  className={
                    pathname === "/" && item?.id === activeGenre
                      ? theme?.palette.mode === "light"
                        ? "genreActive"
                        : "genreActiveDark"
                      : ""
                  }
                  onClick={() => {
                    setActiveGenre(item?.id);
                    navigate("/");
                  }}
                  icon={
                    <img
                      className="image-icon"
                      src={genreIcons[item?.name.toLowerCase()]}
                      style={genreImagesStyle}
                    />
                  }
                >
                  <div>{item?.name}</div>
                </MenuItem>
              ))}
            </Menu>
            <div
              className={`${
                theme.palette.mode === "light"
                  ? "borderBottomLight"
                  : "borderBottomDark"
              }`}
            ></div>
            <Menu menuItemStyles={menuItemStyles}>
              <div className="menu-Heading-Class">Ratings</div>
              {ratings.map((item, index) => (
                <MenuItem
                  key={index}
                  className={
                    item?.lower_rating === lowerRating &&
                    item?.higher_rating === higherRating
                      ? theme?.palette.mode === "light"
                        ? "genreActive"
                        : "genreActiveDark"
                      : ""
                  }
                  onClick={() => {
                    setLowerRating(item?.lower_rating);
                    setHigherRating(item?.higher_rating);
                  }}
                  style={{ paddingLeft: "2rem" }}
                >
                  {item?.lower_rating} - {item?.higher_rating}
                </MenuItem>
              ))}
            </Menu>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;
