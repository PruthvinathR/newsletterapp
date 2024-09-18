import React from 'react';

function Pricing() {
  return (
    <div className="pricing" style={{ height: '100vh', width: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontSize: '1.5em', zIndex: 2  }}>
      <h1>Pricing Plans</h1>
      <div className="pricing-cards" style={{ display: 'flex', justifyContent: 'space-between', width: '100vh' }}>
        <div className="pricing-card" style={{ border: '1px solid #ccc', padding: '20px', flex: '1', margin: '10px', backgroundColor: 'white', color: 'black' }}>
          <h4>Basic</h4>
          <p>$9.99/month</p>
          <p>billed annually</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
          </ul>
        </div>
        <div className="pricing-card" style={{ border: '1px solid #ccc', padding: '20px', flex: '1', margin: '10px', backgroundColor: 'white', color: 'black' }}>
          <h4>Pro</h4>
          <p>$14.99/month</p>
          <p>billed annually</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
            <li>✔ Feature 4</li>
          </ul>
        </div>
        <div className="pricing-card" style={{ border: '1px solid #ccc', padding: '20px', flex: '1', margin: '10px', backgroundColor: 'white', color: 'black' }}>
          <h4>Enterprise</h4>
          <p>Contact Sales</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
            <li>✔ Feature 4</li>
            <li>✔ Feature 5</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pricing;