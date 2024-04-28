import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "../DeleteModal";

const Posts = () => {
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const [editID, setEditID] = useState(0);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const { userId, id, title, body } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId && id && title && body) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData)
        .then((res) => {
          setData([...data, res.data]);
          setFormData({ userId: "", id: "", title: "", body: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteClick = (deleteID) => {
    setDeleteID(deleteID);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
      .then((res) => {
        setData(data.filter((item) => item.id !== deleteID));
        console.log("Delete Successful", res);
      })
      .catch((err) => console.log("Delete Error", err))
      .finally(() => {
        setDeleteID(null);
        setShowModal(false);
      });
  };

  const handleEdit = (editID) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${editID}`)
      .then((res) => {
        setFormData(res.data);
        setData(data.filter((item) => item.id !== editID));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div>
          <h1> User Posts Data App</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userId"></label>
              <input
                type="text"
                className="form-input"
                id="userId"
                placeholder="Enter user id"
                name="userId"
                value={userId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="id"></label>
              <input
                type="text"
                className="form-input"
                id="id"
                placeholder="Enter id"
                name="id"
                value={id}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title"></label>
              <input
                type="text"
                className="form-input"
                id="title"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body"></label>
              <textarea
                className="form-input"
                id="body"
                rows="3"
                placeholder="Enter body"
                name="body"
                value={body}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn submit">
              Submit
            </button>
          </form>

          <hr />

          <table className="table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userId}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => {
                        handleEdit(item.id);
                        setEditID(item.id);
                      }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn delete"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
