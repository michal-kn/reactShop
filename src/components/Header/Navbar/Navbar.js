// Based on the state of the component Navbar is expanding / shrinking when site is in the "mobile mode" (width of the screen / window below 1100px)
import React, { Component } from "react";
import { MenuList } from "./MenuList";
import "./Navbar.css";
import { FiMenu } from "react-icons/fi";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false };

  clickAction = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  hideNavBar = () => {
    this.setState({ clicked: false });
  };

  updateNavbar() {
    if (window.innerWidth > 1100) {
      this.setState({ clicked: false });
    }
  }

  componentDidMount() {
    this.updateNavbar();
    window.addEventListener("resize", this.updateNavbar.bind(this));
  }

  render() {
    return (
      <div className="Navbar">
        <IconContext.Provider value={{ color: "black", size: "1.75em" }}>
          <div className="menu" onClick={this.clickAction}>
            <FiMenu />
          </div>
        </IconContext.Provider>

        <div className={this.state.clicked ? "logo-Navbar-Mobile" : "logo"}>
          THE FURNITURE <br />
          COMPANY LOGO
        </div>

        <ul className={this.state.clicked ? "Navbar-Mobile" : "Navbar-Desktop"}>
          {MenuList.map((item, index) => {
            return (
              <li key={index} onClick={this.hideNavBar}>
                <NavLink
                  className={item.cName}
                  to={item.url}
                  exact
                  activeClassName="activeNavbar"
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Navbar;
