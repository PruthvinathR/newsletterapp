import React from 'react';
import './AddCard.css'; // Create this CSS file for styling

const AddCard = ({ onClick }) => { // Accept onClick prop
  return (
    <div className="add-card" onClick={onClick}> {/* Add onClick handler */}
      <div className="add-card-icon">+</div>
      <h3>Add a customer</h3>
    </div>
  );
};

export default AddCard;