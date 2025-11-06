import { useState, useEffect } from "react";
import api from "../api";
import {
  NotificationProvider,
  useNotification,
} from "../components/NotificationProvider";

function Categories() {
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
      .delete(`/api/categories/${id}`)
      .then((result) => {
        if (result.status === 204)
          notify({ message: "Category deletes", type: "success" });
        getCategories();
      })
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}{" "}
            <button onClick={() => deleteCategory(c.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Create Category</h3>
      <form onSubmit={createCategory}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Categories;
