import React from 'react';
import AppHeader from './components/homeAppHeader';
import Pricing from './components/homePricing';

function LandingPage() {
  const handleScrollToPricing = () => {
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="LandingPage" style={{ zIndex: 2 }}>
      <AppHeader onScrollToPricing={handleScrollToPricing} /> {/* Pass the function */}
      <div className="App-header" style={{height: '100vh', textAlign: 'center', position: 'relative', zIndex: 2}} > {/* Added zIndex */}
        <h1 style={{ fontSize: '4rem' }}>CONTEXTI.FYI</h1> {/* Font size doubled */}
        <h2 style={{ fontSize: '2rem' }}>
          Say no to an <br /> OVERWHELMING INBOX
        </h2> {/* Font size doubled */}
        <p style={{ fontSize: '1.5rem' }}>Read only what matters</p> {/* Font size doubled */}
        <p style={{ fontSize: '1.5rem' }}>Stay ahead while saving 10+ hours a week</p> {/* Font size doubled */}
        <div className="input-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}> 
          <input type="email" placeholder="Enter your email ID" style={{ flex: '0 0 25%', padding: '10px' }} />
          <button style={{ padding: '10px 20px' }}>Start for free</button>
        </div>
      </div>
      <section style={{ width: '70%', margin: '0 auto', height: '100vh', zIndex: 2 }}>
        <h3>How it works?</h3>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/4MFOBeUCPkw" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
        ></iframe>
      </section>
      <div id="pricing" style={{ zIndex: 2 }}>
        <Pricing />
      </div>
    </div>
  );
}

export default LandingPage;