import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  const formattedDate = new Date(Note.created_at).toLocaleDateString("hu");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      {note.category_name && (
        <p className="note-category">Category: {note.category_name}</p>
      )}
      <p className="note-date">{formattedDate}</p>
      <button className="delete-btn" onClick={() => onDelete(note.id)}>
        Delete Note
      </button>
    </div>
  );
}

export default Note;
