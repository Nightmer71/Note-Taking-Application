import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryDetail, updateCategory } from "../services/categoryService";
import "../styles/Form.css";

function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryDetail(id);
        setCategory({ name: data.name });
      } catch (error) {
        setError("Failed to fetch category details");
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, category);
      navigate("/categories");
    } catch (error) {
      setError("Failed to update category");
      console.error("Error updating category:", error);
    }
  };

  const handleChange = (e) => {
    setCategory({ name: e.target.value });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-container">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Category
        </button>
      </form>
    </div>
  );
}

export default UpdateCategory;
