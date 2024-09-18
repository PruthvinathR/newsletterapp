import React from 'react';
import { Link } from 'react-router-dom';

const NavHeader = () => {
  return (
    <header className="nav-header" style={{ margin: '20px', textAlign: 'center' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '10px' }}>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
          <li style={{ marginRight: '10px' }}><span style={{ color: 'black', fontWeight: 'bold' }}>Client</span></li>
          <li style={{ marginRight: '10px' }}><span style={{ color: 'black', fontWeight: 'bold' }}>Context</span></li>
          <li><span style={{ color: 'black', fontWeight: 'bold' }}>Category</span></li>
        </ul>
        <button className="account-btn" style={{ border: '1px solid black', backgroundColor: 'white', color: 'black' , marginRight: '10px'}}>Account</button>
      </nav>
    </header>
  );
};

export default NavHeader;
