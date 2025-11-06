import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  const navigate = useNavigate();
  const formattedDate = new Date(note.created_at).toLocaleDateString("hu");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      {note.category_name && (
        <p className="note-category">Category: {note.category_name}</p>
      )}
      <p className="note-date">{formattedDate}</p>
      <div className="note-buttons">
        <button
          className="update-btn"
          onClick={() => navigate(`/notes/update/${note.id}`)}
        >
          Update Note
        </button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          Delete Note
        </button>
      </div>
    </div>
  );
}

export default Note;
