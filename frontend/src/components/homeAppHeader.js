import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppHeader({ onScrollToPricing }) { // Accept the scroll function as a prop
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/home'); // Navigate to homepage on sign-up
  };

  const handleScrollToPricing = () => {
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  }; // Function defined but not used

  const handleScrollToHowItWorks = () => {
    const howItWorksElement = document.getElementById('how-it-works');
    if (howItWorksElement) {
      howItWorksElement.scrollIntoView({ behavior: 'smooth' });
    }
  }; // New function to scroll to "How it works"

  return (
    <header className="app-header" style={{ width: '90%', margin: '5 20px', zIndex: 2 }}> {/* Changed to padding */}
      <div className="logo">CONTEXTI.FYI</div>
      <nav>
        <ul className="header-options">
          <li onClick={handleScrollToHowItWorks}>How it works</li>
          <li onClick={handleScrollToPricing}>Pricing</li> {/* Updated to use the function */}
        </ul>
      </nav>
      <button className="signup-button" onClick={handleSignUp}>Sign-up</button>
    </header>
  );
}

export default AppHeader;