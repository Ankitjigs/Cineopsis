import { useState, useContext } from "react";
import "./styles.css";
import SideBarToggleIcon from "../../assets/images/hamburger.svg";
import AppIcon from "../../assets/images/cineopsislogo2.png";
import SearchIcon from "../../assets/images/search.svg";
import BackIcon from "../../assets/images/left-chevron.svg";
import Search from "../SearchComponent/SearchComponent";
import { useNavigate } from "react-router-dom";
import { Tooltip, useTheme } from "@mui/material";
import { useTextColor } from "../../Helper/textColor";
import LightModeIcon from "../../assets/images/lightMode.svg";
import DarkModeIcon from "../../assets/images/darkMode.svg";
import { ThemeContext } from "../../utils/ToggleTheme";

const Header = ({ handleToggleSideBar }) => {
  const theme = useTheme();
  const textColor = useTextColor();

  const { toggleTheme } = useContext(ThemeContext);

  const [searchMobile, setSearchMobile] = useState(false);
  const navigate = useNavigate();

  const imageStyle = {
    filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
  };

  return (
    <>
      <div className="header-container">
        <div
          className="header-wrap"
          style={
            theme?.palette?.mode === "light"
              ? { background: "#ffffff", color: textColor }
              : {
                  backgroundImage:
                    "linear-gradient(to bottom, #170217, #09020d)",
                  color: textColor,
                }
          }
        >
          {searchMobile ? (
            <>
              <div className="start-mobile">
                <div
                  onClick={() => {
                    navigate("/");
                    setSearchMobile(false);
                  }}
                >
                  <img src={BackIcon} className="back-icon-search" />
                </div>
              </div>
              <div className="center-mobile">
                <Search />
              </div>
            </>
          ) : (
            <>
              <div className="start">
                <div className="sidebar-toggle" onClick={handleToggleSideBar}>
                  <img
                    className="sidebar-icon"
                    src={SideBarToggleIcon}
                    alt="hamburger-icon"
                    style={imageStyle}
                  />
                </div>
                <a href="/" className="app-icon-wrap">
                  <div className="app-icon">
                    <img src={AppIcon} className="logo" alt="app-icon" />
                  </div>
                  <div className={`app-title ${textColor}`}>CINEOPSIS</div>
                </a>
              </div>
              <div className="center">
                <Search />
              </div>

              <div className="end">
                <div
                  className="search-mobile"
                  onClick={() => setSearchMobile(true)}
                >
                  <img
                    src={SearchIcon}
                    className="search-icon"
                    alt="search-icon"
                  />
                </div>
                <Tooltip title={`Toggle ${theme?.palette?.mode ==='light'?"dark":"light"} Mode`}>
                <div className="theme-icon-wrap" onClick={toggleTheme}>
                  <img
                    src={
                      theme?.palette?.mode === "light"
                        ? DarkModeIcon
                        : LightModeIcon
                    }
                    className="theme-icon"
                    alt="app-icon"
                  />
                </div>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
