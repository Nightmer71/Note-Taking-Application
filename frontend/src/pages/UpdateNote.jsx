import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteDetail, updateNote } from "../services/noteService";
import { getCategories } from "../services/categoryService";
import "../styles/Home.css";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", category: "" });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noteData = await getNoteDetail(id);
        setNote({
          title: noteData.title,
          content: noteData.content || "",
          category: noteData.category || "",
        });
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError("Failed to fetch note details");
        console.error("Error fetching note:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, note);
      navigate("/");
    } catch (error) {
      setError("Failed to update note");
      console.error("Error updating note:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-container">
      <h2>Update Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={note.category}
            onChange={handleChange}
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Update Note
        </button>
      </form>
    </div>
  );
}

export default UpdateNote;
