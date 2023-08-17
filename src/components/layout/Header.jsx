import { Button } from "antd";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoginOutlined } from "@ant-design/icons";
import logo2 from "../../assets/images/logo.svg";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [loadings, setLoadings] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });

      if (index === 1) {
        if (isAuthenticated) {
          navigate("/account");
        } else {
          navigate("/login");
        }
      }
    }, 1000);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav  ">
          <NavLink className="nav__brand">
            <img src={logo2} alt="logo" />
          </NavLink>
          <ul className={active}>
            <li className="nav__item">
              <NavLink to={`/`} className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to={`my-posts`} className="nav__link">
                My-post
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="posts" className="nav__link">
                Blog
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="about" className="nav__link">
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="register" className="nav__link">
                Register
              </NavLink>
            </li>
            <div className="login">
              <Link to={isAuthenticated ? "/account" : "/login"}>
                <Button
                  className="loginbtn"
                  style={{ width: "120px", height: "45px" }}
                  loading={loadings[1]}
                  onClick={() => enterLoading(1)}
                >
                  {isAuthenticated ? "Account" : "Login"}
                </Button>
              </Link>
            </div>
            <div className="logout">
              <Link to={"login"}>
                <LoginOutlined style={{ color: "white" }} />
              </Link>
            </div>
            <div className={`app ${darkMode ? "dark" : ""}`}>
              <button className="btn-dark" onClick={toggleDarkMode}>
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </ul>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
