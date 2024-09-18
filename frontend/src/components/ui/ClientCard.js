import React from 'react';
import './ClientCard.css';

const ClientCard = ({ icon, title, description, lastUpdated }) => {
  return (
    <div className="client-card">
      <div className="card-header">
        <img src={icon} alt={`${title} icon`} className="card-icon" />
        <div className="card-title-container" style={{ justifyContent: 'start' }}>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
      <div className="card-tags">
        <span className="tag">News</span>
        <span className="tag">Newsletter</span>
        <span className="tag">Web-track</span>
        <span className="tag">Articles</span>
      </div>
      <button className="engage-button">Engage</button>
      <span className="last-updated">{lastUpdated}</span>
    </div>
  );
};

export default ClientCard;
