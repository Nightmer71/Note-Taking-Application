import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteDetail, updateNote } from "../services/noteService";
import { getCategories } from "../services/categoryService";
import "../styles/Home.css";

function UpdateNote() {
        const { id } = useParams();
        const navigate = useNavigate();
        const [note, setNote] = useState({
                title: "",
                content: "",
                category: "",
        });
        const [categories, setCategories] = useState([]);
        const [error, setError] = useState("");
        useEffect(() => {
                const fetchData = async () => {
                        try {
                                // services return axios responses — take .data
                                const noteResp = await getNoteDetail(id);
                                const noteData = noteResp.data;
                                setNote({
                                        title: noteData.title,
                                        content: noteData.content || "",
                                        // keep as empty string when null so select works
                                        category:
                                                noteData.category === null
                                                        ? ""
                                                        : String(
                                                                  noteData.category
                                                          ),
                                });
                                const categoriesResp = await getCategories();
                                setCategories(categoriesResp.data);
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
                        // Prepare payload: category should be null or integer
                        const payload = {
                                title: note.title,
                                content: note.content,
                                category:
                                        note.category === "" ||
                                        note.category === null
                                                ? null
                                                : parseInt(note.category, 10),
                        };

                        await updateNote(id, payload);
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
                                        <label htmlFor="content">
                                                Content:
                                        </label>
                                        <textarea
                                                id="content"
                                                name="content"
                                                value={note.content}
                                                onChange={handleChange}
                                                rows="4"
                                        />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="category">
                                                Category:
                                        </label>
                                        <select
                                                id="category"
                                                name="category"
                                                value={note.category}
                                                onChange={handleChange}
                                        >
                                                <option value="">
                                                        No Category
                                                </option>
                                                {categories.map((cat) => (
                                                        <option
                                                                key={cat.id}
                                                                value={cat.id}
                                                        >
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
