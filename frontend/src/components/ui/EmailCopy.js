import React from 'react';
import { FaCopy } from 'react-icons/fa';

const EmailCopy = ({ email }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    // alert('Email copied to clipboard!'); // Removed alert
  };

  return (
    <div className="email-copy-container" onClick={copyToClipboard} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', // Center align items
        backgroundColor: '#F1F1F1', 
        borderRadius: '5px', 
        padding: '10px 20px', 
        width: 'fit-content' // Adjust width to content
    }}>
      <p style={{ marginRight: '8px', textAlign: 'center', flex: 1 }}>{email}</p> {/* Center aligned text */}
      <FaCopy className="copy-icon" style={{ fontSize: '1.5em' }} />
    </div>
  );
};

export default EmailCopy;