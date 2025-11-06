import { useState, useEffect } from "react";
import { useNotification } from "../components/NotificationProvider";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import * as noteService from "../services/noteService";
import * as categoryService from "../services/categoryService";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { notify } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    loadNotes();
    loadCategories();
  }, []);

  const loadNotes = () => {
    noteService
      .getNotes()
      .then((result) => result.data)
      .then((data) => setNotes(data))
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  const loadCategories = () => {
    categoryService
      .getCategories()
      .then((result) => result.data)
      .then((data) => setCategories(data))
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  const deleteNote = (id) => {
    noteService
      .deleteNote(id)
      .then((result) => {
        if (result.status === 204)
          notify({ message: "Note has been deleted!", type: "success" });
        else notify({ message: "Failed to delete note!", type: "error" });
        loadNotes();
      })
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  const createNote = (e) => {
    e.preventDefault();
    noteService
      .createNote({ content, title, category: selectedCategory })
      .then((result) => {
        if (result.status === 201) {
          notify({ message: "Note succesfully created!", type: "success" });
          setTitle("");
          setContent("");
          setSelectedCategory("");
        } else notify({ message: "Failed to create note!", type: "error" });
        loadNotes();
      })
      .catch((error) => notify({ message: String(error), type: "error" }));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => {
          return <Note note={note} onDelete={deleteNote} key={note.id} />;
        })}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />

        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <label htmlFor="category">Category:</label>
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <select
            id="category"
            value={selectedCategory}
            required
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">--Choose Category--</option>
            {categories.map((c) => {
              return (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            onClick={() => navigate("/categories")}
            style={{
              marginLeft: "4px",
              padding: "6px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create Category
          </button>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
