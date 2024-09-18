import React, { useState } from 'react';
import NavHeader from './components/ui/navHeader';
import ClientCard from './components/ui/ClientCard';
import './Homepage.css'; // Create this CSS file for styling
import supplierIcon from './assets/supplier.png'; // Make sure to add this icon
import SearchBar from './components/ui/SearchBar'; // Import the new SearchBar component
import AddCard from './components/ui/AddCard'; // Add this line
import EmailCopy from './components/ui/EmailCopy'; // Import the new EmailCopy component
import nikeLogo from './assets/nike.png'; // Import the Nike logo
import AddCardDialog from './components/ui/AddCardDialog'; // Import the new dialog component
import clientCardsData from './components/Data'; // Import the clientCardsData

function Homepage() {
  const [isDialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePricingClick = () => {
    scrollToSection('pricing'); // Scroll to the pricing section
  };

  const handleAddCardClick = () => {
    setDialogOpen(true); // Open the dialog when Add Card is clicked
  };

  const closeDialog = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div className="homepage w-full text-center">
      <header>
        <NavHeader onNavClick={scrollToSection} /> {/* Pass scroll function */}
      </header>
      <div className="homepage-container w-full">
        <div className="homepage-content text-center"> 
          <h1 style={{ fontSize: '3rem' }}>CONTEXTI.FYI</h1> {/* Increased font size */}
          <p style={{ fontSize: '1.5rem' }}>One email ID to rule them all!</p> {/* Increased font size */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}> {/* Increased space */}
            <EmailCopy email="rohit.challa.company1@contexti.fyi" />
          </div>
          <p style={{ fontSize: '1.2rem' }}>Use this email ID to subscribe/forward any context</p> {/* Increased font size */}
          <SearchBar searchTerm='Search clients..' /> 

          <div className="client-cards-grid justify-center">
            {clientCardsData.map((card, index) => (
              <ClientCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                lastUpdated={card.lastUpdated}
              />
            ))}
            <AddCard onClick={handleAddCardClick} /> {/* Pass the click handler */}
          </div>
          {isDialogOpen && <AddCardDialog onClose={closeDialog} />} {/* Render dialog if open */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;