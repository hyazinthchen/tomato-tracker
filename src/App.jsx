import React, { useState, useEffect } from 'react';
import { Slide } from '@progress/kendo-react-animation';
import { Notification } from '@progress/kendo-react-notification';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import tomatoImage from './images/tomato-with-stem.png';
import PlantSection from './components/PlantSection';
import WishlistSection from './components/WishlistSection';

function App() {
  const [showTomato, setShowTomato] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Trigger the animation when the component mounts
  useEffect(() => {
    setShowTomato(true);
  }, []);

  // Callback function to handle notification
  const handlePlantAdded = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="content">
      <div className="tomato-image-container">
        <Slide direction="down" transitionEnterDuration={1000} transitionExitDuration={1000}>
          {showTomato && (
            <img src={tomatoImage} alt="Three tomatoes on a stem" className="tomato-image" />
          )}
        </Slide>
      </div>
      <header>
        <h1>TOMATO TRACKER</h1>
        <span className="subheadline">Track the growth and taste of your tomatoes!</span>
      </header>
      <main>
        {/* Use the PlantSection component */}
        <PlantSection onPlantAdded={handlePlantAdded} />

        {/* Use the WishlistSection component */}
        <WishlistSection />
      </main>
      <footer>
        <p>© 2025 TomatoTracker. All rights reserved.</p>
      </footer>

      {showNotification && (
        <Notification
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
          type={{ style: 'success', icon: true }}
        >
          New plant added successfully!
        </Notification>
      )}
    </div>
  );
}

export default App;