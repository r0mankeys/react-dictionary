import { useState } from "react";
import LogoLight from "../assets/Logo-light.svg";
import LogoDark from "../assets/Logo-dark.svg";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import "../styles/Navbar.css";

const Navbar = ({ changeTheme, theme, changeFont, pageFont }) => {
  const [dropdown, setDropdown] = useState(false); // controlling states of dropdown

  const fonts = ["Clash", "Helvetica", "Verdana", "Palatino"];
  return (
    <div className="navbar">
      <div className="logo">
        {theme == "light" ? (
          <img src={LogoLight} alt="logo for light mode" />
        ) : (
          <img src={LogoDark} alt="logo for dark mode" />
        )}
      </div>
      <div className="controls">
        <div className="dropdown-container">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="font-picker"
          >
            <p className="font">{pageFont}</p>
            {dropdown ? (
              <ChevronDownIcon className="chevron" />
            ) : (
              <ChevronUpIcon className="chevron" />
            )}
          </button>
          {dropdown && (
            <ul className="dropdown-menu">
              {fonts.map((font) => (
                <div
                  onClick={() => changeFont(font)}
                  className="font-option"
                  key={`${font}4002`}
                >
                  <li
                    style={{
                      fontFamily: font,
                      fontWeight: "normal",
                    }}
                  >
                    {font}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
        <button onClick={() => changeTheme()} className="theme-toggle">
          <div className="ball">
            {theme == "light" ? (
              <MoonIcon className="moon-icon icon" />
            ) : (
              <svg
                className="sun-icon icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.9999 14.5556C12.9636 14.5556 14.5554 12.9637 14.5554 11C14.5554 9.03633 12.9636 7.44446 10.9999 7.44446C9.03621 7.44446 7.44434 9.03633 7.44434 11C7.44434 12.9637 9.03621 14.5556 10.9999 14.5556Z"
                  stroke="#353535"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3V3.88889M11 18.1111V19M3 11H3.88889M18.1111 11H19M16.6569 5.34311L16.0284 5.97156M5.97156 16.0284L5.34311 16.6569M5.34311 5.34311L5.97156 5.97156M16.0284 16.0284L16.6569 16.6569"
                  stroke="#353535"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
