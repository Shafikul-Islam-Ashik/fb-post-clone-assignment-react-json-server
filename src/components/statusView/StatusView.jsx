// dependencies
import { Card, CardBody } from "react-bootstrap";
import "./StatusView.scss";
import { FaGlobeAmericas } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiThumbsUpLight, PiShareFatLight } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";

const StatusView = ({ content, deletePost, editPost }) => {
  const [showActionBtn, setShowActionBtn] = useState(false);

  // handleActionBtn show
  const handleActionBtnShow = () => {
    setShowActionBtn(true);
  };

  // handleActionBtn hide
  const handleActionBtnHide = () => {
    setShowActionBtn(false);
  };

  return (
    <Card className="status_item_content">
      <CardBody>
        <div className="status_top d-flex justify-content-between">
          <div className="top-left d-flex align-items-center">
            <Link>
              <img
                style={{ height: "40px", width: "40px" }}
                src={content.author_photo}
                // src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                alt=""
              />
            </Link>
            <div className="content">
              <Link>{content.author_name}</Link>
              <p>
                2d · <FaGlobeAmericas />
              </p>
            </div>
          </div>

          <div className="top-right">
            <p onClick={handleActionBtnShow}>
              <HiDotsHorizontal />
            </p>
            {showActionBtn && (
              <div className="action-box">
                <span onClick={handleActionBtnHide}>&times;</span>
                <ul>
                  <li onClick={() => editPost(content.id)}>Edit post</li>
                  <li onClick={() => deletePost(content.id)}>Delete post</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="status_content">
          <p>{content.post_content}</p>
          <img className="w-100 rounded" src={content.post_photo} alt="" />
        </div>

        <div className="status_actions">
          <div className="actions_top d-flex justify-content-between">
            <div className="left">
              <img
                height="18"
                src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
              />
              <img
                height="18"
                src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
              />
              <span className="total_reactions">250</span>
            </div>
            <div className="right d-flex">
              <p>
                <span className="total_comments">32</span> comments
              </p>
              <p>
                <span className="total_shares">9</span> shares
              </p>
            </div>
          </div>

          <div className="actions_bottom">
            <ul className="d-flex">
              <li>
                <PiThumbsUpLight /> Like
              </li>
              <li>
                <LuMessageCircle /> Comment
              </li>
              <li>
                <PiShareFatLight /> Share
              </li>
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatusView;
