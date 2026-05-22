import React, { useState, useEffect } from "react";
import "./NoteApp.css";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("quickNotes");
    const savedTheme = localStorage.getItem("theme");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    if (savedTheme === "dark") {
      setIsDarkTheme(true);
    }
  }, []);

  // Apply dark theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  // Save notes to localStorage
  const saveNotesToStorage = (notesToSave) => {
    localStorage.setItem("quickNotes", JSON.stringify(notesToSave));
  };

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString();
  };

  // Handle saving or updating a note
  const handleSaveNote = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    let updatedNotes;

    if (editingNoteId) {
      // Update existing note
      updatedNotes = notes.map((note) =>
        note.id === editingNoteId
          ? {
              ...note,
              title: formData.title.trim(),
              content: formData.content.trim(),
            }
          : note,
      );
    } else {
      // Add new note
      const newNote = {
        id: generateId(),
        title: formData.title.trim(),
        content: formData.content.trim(),
      };
      updatedNotes = [newNote, ...notes];
    }

    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    closeNoteDialog();
  };

  // Handle deleting a note
  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  // Open dialog for adding new note or editing existing
  const openNoteDialog = (noteId = null) => {
    setIsDialogOpen(true);

    if (noteId) {
      const noteToEdit = notes.find((note) => note.id === noteId);
      if (noteToEdit) {
        setEditingNoteId(noteId);
        setFormData({
          title: noteToEdit.title,
          content: noteToEdit.content,
        });
      }
    } else {
      setEditingNoteId(null);
      setFormData({
        title: "",
        content: "",
      });
    }
  };

  // Close dialog
  const closeNoteDialog = () => {
    setIsDialogOpen(false);
    setEditingNoteId(null);
    setFormData({
      title: "",
      content: "",
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className="note-app">
      {/* Header */}
      <header className="app-header">
        <h1>Quick Notes</h1>
        <div className="header-actions">
          <button className="add-note-btn" onClick={() => openNoteDialog()}>
            Add Note
          </button>
          <button
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            title="Toggle Theme"
          >
            {isDarkTheme ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Notes Container */}
      <main className="notes-grid" id="notesContainer">
        {notes.length === 0 ? (
          <div className="empty-state">
            <h2>No notes yet</h2>
            <p>Create your first note to get started!</p>
            <button className="add-note-btn" onClick={() => openNoteDialog()}>
              Create Note
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card" id={note.id}>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
              <div className="note-actions">
                <button
                  className="edit-btn"
                  onClick={() => openNoteDialog(note.id)}
                  title="Edit Note"
                  aria-label="Edit note"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M184-184v-83.77l497.23-498.77q5.15-5.48 11.07-7.47 5.93-1.99 11.99-1.99 6.06 0 11.62 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 12.25 0 6.13-2.24 12.06-2.24 5.92-7.22 11.07L267.77-184H184Zm505.15-466.46L744-704.54 704.54-744l-54.08 54.85 38.69 38.69Z" />
                  </svg>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteNote(note.id)}
                  title="Delete Note"
                  aria-label="Delete note"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M291-267.69 267.69-291l189-189-189-189L291-692.31l189 189 189-189L692.31-669l-189 189 189 189L669-267.69l-189-189-189 189Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="modal-backdrop" onClick={closeNoteDialog}>
          <dialog className="note-dialog" open>
            <div className="dialog-content">
              <div className="dialog-header">
                <h2 className="dialog-title">
                  {editingNoteId ? "Edit Note" : "Add New Note"}
                </h2>
                <button
                  className="close-btn"
                  onClick={closeNoteDialog}
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSaveNote}>
                <div className="form-group">
                  <label htmlFor="noteTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="noteTitle"
                    name="title"
                    placeholder="Enter Note Title ..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="noteContent" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-textarea"
                    id="noteContent"
                    name="content"
                    placeholder="Write your Note here"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="dialog-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeNoteDialog}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default NoteApp;
