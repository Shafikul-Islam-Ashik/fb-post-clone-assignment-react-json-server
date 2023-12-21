// dependencies
import { Card } from "react-bootstrap";
import "./StatusCreationBox.scss";

const StatusCreationBox = ({ showModal }) => {
  return (
    <Card className="status_creation_box">
      <Card.Body>
        <div className="status_create_top d-flex">
          <div className="avatar">
            <img
              className="rounded-circle"
              style={{ height: "40px", width: "40px" }}
              src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
              alt=""
            />
          </div>

          <input
            type="text"
            className="w-100"
            placeholder="What's on your mind, Shafikul?"
            onClick={showModal}
          />
        </div>

        <div className="status_create_bottom border-top">
          <ul className="d-flex justify-content-center align-items-center">
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" />{" "}
              <span>Live Video</span>
            </li>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />{" "}
              <span>Photo/Video</span>
            </li>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/t2NS5_5UwDb.png" />{" "}
              <span>Reels</span>
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatusCreationBox;
