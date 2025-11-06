import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  NotificationProvider,
  useNotification,
} from "../components/NotificationProvider";
import "../styles/Categories.css";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { notify } = useNotification();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    api
      .get("/api/categories/")
      .then((result) => result.data)
      .then((data) => setCategories(data))
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  const createCategory = (e) => {
    e.preventDefault();
    api
      .post("/api/categories/", { name })
      .then((result) => {
        if (result.status === 201)
          notify({ message: "Category Created", type: "success" });
        getCategories();
        setName("");
      })
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  const deleteCategory = (id) => {
    api
      .delete(`/api/categories/${id}/`)
      .then((result) => {
        if (result.status === 204)
          notify({ message: "Category deleted", type: "success" });
        getCategories();
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          notify({
            message:
              "Cannot delete category because it has notes assigned to it. Please reassign or delete the notes first.",
            type: "error",
          });
        } else {
          notify({ message: String(error), type: "error" });
        }
      });
  };

  return (
    <div className="categories-container">
      <div className="header-section">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Notes
        </button>
        <h2>Categories</h2>
      </div>
      <ul className="categories-list">
        {categories.map((c) => (
          <li key={c.id} className="category-item">
            <span className="category-name">{c.name}</span>
            <div className="category-buttons">
              <button onClick={() => navigate(`/categories/update/${c.id}`)}>
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteCategory(c.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="create-category-form">
        <h3>Create Category</h3>
        <form onSubmit={createCategory}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Categories;
