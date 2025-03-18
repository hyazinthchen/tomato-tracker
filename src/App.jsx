import React, { useState } from 'react';
import { Notification } from '@progress/kendo-react-notification';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Header from './components/Header/Header';
import PlantSection from './components/PlantSection/PlantSection';
import WishlistSection from './components/WishlistSection/WishlistSection';
import Footer from './components/Footer/Footer';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [plantData, setPlantData] = useState(() => {
    const savedData = localStorage.getItem('plants');
    return savedData ? JSON.parse(savedData) : [];
  });

  const handlePlantAdded = (data) => {
    setPlantData(data);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className='content'>
      <Header />
      <main>
        <PlantSection onPlantAdded={handlePlantAdded} />
        <WishlistSection plantData={plantData} />
      </main>
      <Footer />

      {showNotification && (
        <Notification type={{ style: 'success', icon: true }}>
          New plant added successfully!
        </Notification>
      )}
    </div>
  );
}

export default App;
