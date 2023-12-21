// dependencies
import { Link } from "react-router-dom";
import "./Header.scss";
import { IoIosSearch } from "react-icons/io";
import { RiHome5Fill, RiGroup2Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { LuGamepad2 } from "react-icons/lu";
import { TbGridDots } from "react-icons/tb";
import { FaFacebookMessenger } from "react-icons/fa";
import { HiMiniBell } from "react-icons/hi2";
import { Badge } from "react-bootstrap";
import img from "../../../public/img/fb-icon.png";

const Header = () => {
  return (
    <header className="header-wrap">
      <div className="px-3 d-flex justify-content-between align-items-center header-content">
        <div className="header-left d-flex">
          <Link to="/home" className="logo">
            <img src={img} alt="" />
          </Link>

          <div className="search-box">
            <form>
              <label htmlFor="" className="d-flext">
                <IoIosSearch />
                <input type="text" placeholder="Search Facebook" />
              </label>
            </form>
          </div>
        </div>
        <div className="header-middle">
          <ul className="header-middle-nav d-flex justify-content-center align-items-center">
            <li>
              <Link to="/home" className="active">
                <RiHome5Fill />
              </Link>
            </li>
            <li>
              <Link to="/friends">
                <BsPeople />
              </Link>
            </li>
            <li>
              <Link to="/marketplace">
                <AiOutlineShop />
              </Link>
            </li>
            <li>
              <Link to="/groups">
                <RiGroup2Line />
              </Link>
            </li>
            <li>
              <Link to="/gaming/play">
                <LuGamepad2 className="no-fill" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          <ul className="header-right-nav d-flex justify-content-end align-items-center">
            <li>
              <TbGridDots />
            </li>
            <li>
              <FaFacebookMessenger />
            </li>
            <li>
              <HiMiniBell /> <Badge>40</Badge>
            </li>
            <li>
              <img
                style={{ height: "40px", width: "40px" }}
                src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
