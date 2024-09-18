import React, { useState } from 'react';
import './AddCardDialog.css'; // Create this CSS file for styling

const AddCardDialog = ({ onClose }) => {
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ icon, title, description });
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2 className="dialog-title">Add New Client Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="icon">Icon URL:</label>
            <input
              id="icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-primary">Add Card</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardDialog;