import "./Home.scss";
import StatusCreationBox from "../../components/statusCreationBox/StatusCreationBox";

import Header from "../../components/header/Header";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import StatusView from "../../components/statusView/statusView";
import Meta from "../../components/meta/Meta";

// import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

const Home = () => {
  // state for create student modal
  const [modal, setModal] = useState(false);

  // state for edit student modal
  const [editModal, setEditModal] = useState(false);

  // state for all posts
  const [post, setPost] = useState([]);

  // show modal
  const handleModalShow = () => {
    setModal(true);
  };

  // hide modal
  const handleModalHide = () => {
    setModal(false);
  };

  // show edit modal
  const handleEditModalShow = () => {
    setEditModal(true);
  };
  // hide edit modal
  const handleEditModalHide = () => {
    setEditModal(false);

    // clear form
    setInput({
      author_name: "",
      author_photo: "",
      post_photo: "",
      post_content: "",
    });
  };

  // student form management
  const [input, setInput] = useState({
    author_name: "",
    author_photo: "",
    post_photo: "",
    post_content: "",
  });

  //  handle Input Change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * handle CreatePost
   * @param {*} e
   */
  const handleCreatePost = async (e) => {
    e.preventDefault();

    // validation
    if (
      !input.author_name ||
      !input.author_photo ||
      !input.post_photo ||
      !input.post_content
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      await axios.post("http://localhost:7070/posts", input);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Post created successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // clear form
      setInput({
        author_name: "",
        author_photo: "",
        post_photo: "",
        post_content: "",
      });

      // close modal
      handleModalHide();
      // call getAllpost
      getAllPost();
    }
  };

  /**
   * handle get all student
   * @param {*} e
   */
  const getAllPost = async () => {
    const response = await axios.get("http://localhost:7070/posts");

    // set all post data to the "post" state
    setPost(response.data);
  };

  /**
   * handle delete post
   * @param {*} e
   */
  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        axios.delete(`http://localhost:7070/posts/${id}`);

        // get all student
        getAllPost();

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  /**
   *  handle Edit Modal
   * @param {*} e
   */
  const handleEditModal = (id) => {
    // show edit modal
    handleEditModalShow();

    // set student data to the input state
    setInput(post.find((data) => data.id === id));
  };

  /**
   *  handle Update Student
   * @param {*} e
   */
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    // alert();
    // validation
    if (
      !input.author_name ||
      !input.author_photo ||
      !input.post_photo ||
      !input.post_content
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      await axios.patch(`http://localhost:7070/posts/${input.id}`, input);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Post updated successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // clear form
      setInput({
        author_name: "",
        author_photo: "",
        post_photo: "",
        post_content: "",
      });

      // close modal
      handleEditModalHide();
      // call getAllpost
      getAllPost();
    }
  };

  // call getAllPost function to load all posts data
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      <Meta title="Facebook" />
      <Header />

      <div className="body-wrapper">
        <div className="left">
          <div className="sidebar">
            <ul className="ms-3 mt-3">
              <li>
                <img
                  className="rounded-circle"
                  style={{ height: "40px", width: "40px" }}
                  src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                  alt=""
                />
                <p>Shafikul Islam Ashik</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Friends</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Groups</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Video</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png')",
                  }}
                ></span>
                <p>Feeds</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>MarketPlace</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Memory</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Saved</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/UcI9fM2oUUV.png?_nc_eui2=AeEoXy2ZyQVw6QokaX71nMzOXnfhz3hpqpFed-HPeGmqkbJBIl0dl_lPyLjApZcASf6hhssOrD-HioGezYcMD0Nb')",
                  }}
                ></span>
                <p>Professional dashboard</p>
              </li>
              <li>
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4GR4KRf3hN2.png')",
                  }}
                ></span>
                <p>Pages</p>
              </li>
              <li>
                <span>
                  <FaChevronDown />
                </span>
                <p>See more</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="middle">
          <StatusCreationBox showModal={handleModalShow} />

          {post.map((item, index) => (
            <StatusView
              key={index}
              content={item}
              deletePost={handleDeletePost}
              editPost={handleEditModal}
            />
          ))}
        </div>

        <div className="right">
          <div className="right-sidebar-wrapper">
            <div className="right-sidebar-content">
              <div className="content-header">
                <h4>Sponsored</h4>
              </div>
              <div className="sponsored">
                <div className="item">
                  <img
                    src="https://scontent.frjh4-1.fna.fbcdn.net/v/t45.1600-4/366122583_23857909276450117_7506049779045189376_n.png?stp=cp0_dst-jpg_p296x100_q90_spS444&_nc_cat=102&ccb=1-7&_nc_sid=528f85&_nc_eui2=AeGv769wLwgGt-HcTFGKXfUEsHdGrBFal2Owd0asEVqXYwyzoKVLUnq2GzlLvyK3d6WqbzsHK124kDKGJoJ_GjVt&_nc_ohc=H3Ut37h4sd4AX-WbEEC&_nc_ht=scontent.frjh4-1.fna&oh=00_AfA11ktA4n7ImbGpDK9Ui4ZuyPXGrdmCvPKGnDoHslHjFg&oe=658A6003"
                    alt=""
                  />

                  <p>GRE-এর প্রস্তুতিতে এগিয়ে থাকতে এনরোল করুন আজই</p>
                </div>
                <div className="item">
                  <img
                    src="https://scontent.frjh4-1.fna.fbcdn.net/v/t45.1600-4/406199489_120202153492320024_764831522039061113_n.png?stp=cp0_dst-jpg_p296x100_q90_spS444&_nc_cat=101&ccb=1-7&_nc_sid=528f85&_nc_eui2=AeHz6Vs5Zv76ifq3LZL_vu1CqPcdy1SQ34-o9x3LVJDfj99jxoZse4k-qgL4JX3_kM5VfXlSGqcsBTHQiYUgp4z-&_nc_ohc=cadbNbZltpYAX_k-_vp&_nc_ht=scontent.frjh4-1.fna&oh=00_AfCtmnjPjxxIXGx5fI47gqBqUKuWhMJNzT_A7kz61dDG9Q&oe=6589746C"
                    alt=""
                  />

                  <p>Digital Marketing Strategist - Codexpert HR</p>
                </div>
              </div>

              <hr />

              <div className="content-header">
                <h4>Your Pages and profiles</h4>
                <div className="icons">
                  <BsThreeDots />
                </div>
              </div>

              <div className="profiles d-flex align-center ">
                <img
                  className="rounded-circle me-2"
                  style={{ height: "30px", width: "30px" }}
                  src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                  alt=""
                />
                <p>Shafikul Islam Ashik</p>
              </div>

              <p className="promotion">
                <HiSpeakerphone />
                <span className="ms-2">Create promotion</span>
              </p>
              <hr />
              <div className="content-header">
                <h4>Birthdays</h4>
              </div>

              <div className="birthdays d-flex">
                <span
                  style={{
                    backgroundImage:
                      "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/E1_6saTrWsu.png?_nc_eui2=AeGsW0Gfi-X5QmaMeooxGjTqs51-xKDgPiGznX7EoOA-IRv0HzLzay-JdE8w_vXiGryBHI08NyahsMBFnNA2qroK')",
                  }}
                ></span>
                <p>
                  <strong>Mokta Rahman</strong> and <strong>10 others</strong>{" "}
                  have birthdays today
                </p>
              </div>

              <hr />

              <div className="content-header">
                <h4>Contacts</h4>
                <div className="icons contact-icons">
                  <IoIosSearch className="me-3" size={20} />
                  <BsThreeDots size={20} />
                </div>
              </div>

              <div className="contacts">
                <ul>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                  <li className="d-flex align-center">
                    <img
                      className="rounded-circle me-2"
                      style={{ height: "30px", width: "30px" }}
                      src="https://scontent.frjh4-1.fna.fbcdn.net/v/t39.30808-6/387815552_3494756454110075_2828672575439126122_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE7Bbrv2MxQKn9dSg9mNGGIFMvOQIodv7kUy85Aih2_uXy3rEYZJtXaBdbM-wqdHN0AyilIDWrlKP4KMo8qKhZN&_nc_ohc=RerupdfA6AgAX-TNt_F&_nc_ht=scontent.frjh4-1.fna&oh=00_AfBXjJgt2ar0_MEnQGYIMADPsdR9-jhlAXB7YoMZuXDMZg&oe=6587F065"
                      alt=""
                    />
                    <p>Shafikul Islam Ashik</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* create post modal  starts*/}
      <Modal show={modal} onHide={handleModalHide} centered>
        <Modal.Header>
          <Modal.Title>Create a post</Modal.Title>
          <Button className="btn-close" onClick={handleModalHide}></Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreatePost}>
            <div className="py-2">
              <label htmlFor="">Author Name</label>
              <input
                type="text"
                name="author_name"
                value={input.author_name}
                onChange={handleInputChange}
                id=""
                className="form-control"
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Author Photo URL</label>
              <input
                type="text"
                id=""
                className="form-control"
                name="author_photo"
                value={input.author_photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Post Photo URL</label>
              <input
                type="text"
                id=""
                className="form-control"
                name="post_photo"
                value={input.post_photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Post content</label>
              <textarea
                id=""
                className="form-control"
                name="post_content"
                value={input.post_content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <Button type="submit"> Create</Button>
          </form>
        </Modal.Body>
      </Modal>
      {/* create post modal ends */}

      {/* edit post modal  starts*/}
      <Modal show={editModal} onHide={handleEditModalHide} centered>
        <Modal.Header>
          <Modal.Title>Edit post</Modal.Title>
          <Button className="btn-close" onClick={handleEditModalHide}></Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdatePost}>
            <div className="py-2">
              <label htmlFor="">Author Name</label>
              <input
                type="text"
                name="author_name"
                value={input.author_name}
                onChange={handleInputChange}
                id=""
                className="form-control"
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Author Photo URL</label>
              <input
                type="text"
                id=""
                className="form-control"
                name="author_photo"
                value={input.author_photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Post Photo URL</label>
              <input
                type="text"
                id=""
                className="form-control"
                name="post_photo"
                value={input.post_photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label htmlFor="">Post content</label>
              <textarea
                id=""
                className="form-control"
                name="post_content"
                value={input.post_content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Modal.Body>
      </Modal>
      {/* create post modal ends */}
    </>
  );
};

export default Home;
