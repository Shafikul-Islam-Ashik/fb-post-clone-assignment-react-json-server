import "./Home.scss";
import StatusCreationBox from "../../components/statusCreationBox/StatusCreationBox";
// import StatusView from "../../components/statusView/StatusView";
import Header from "../../components/header/Header";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import StatusView from "../../components/statusView/statusView";
import Meta from "../../components/meta/Meta";

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
      <Container>
        <Header />
        <Row>
          <Col md={4} className="left-content"></Col>
          <Col className="middle-content" md={5}>
            <StatusCreationBox showModal={handleModalShow} />

            {post.map((item, index) => (
              <StatusView
                key={index}
                content={item}
                deletePost={handleDeletePost}
                editPost={handleEditModal}
              />
            ))}
            {/* <StatusView />
            <StatusView />
            <StatusView /> */}
          </Col>
          <Col md={3} className="wright-content"></Col>
        </Row>
      </Container>

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
