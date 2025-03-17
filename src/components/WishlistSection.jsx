import React, { useState, useEffect } from 'react';
import { ListBox, ListBoxToolbar, processListBoxData } from '@progress/kendo-react-listbox';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { plusIcon } from '@progress/kendo-svg-icons';

const WishlistSection = () => {
  // Load data from local storage on initial render
  const [seedsToBuy, setSeedsToBuy] = useState(() => {
    const savedSeedsToBuy = localStorage.getItem('seedsToBuy');
    return savedSeedsToBuy ? JSON.parse(savedSeedsToBuy) : [];
  });

  const [seedsAcquired, setSeedsAcquired] = useState(() => {
    const savedSeedsAcquired = localStorage.getItem('seedsAcquired');
    return savedSeedsAcquired ? JSON.parse(savedSeedsAcquired) : [];
  });

  const [newSeed, setNewSeed] = useState(''); // Input field for new seed

  // Save seedsToBuy to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('seedsToBuy', JSON.stringify(seedsToBuy));
  }, [seedsToBuy]);

  // Save seedsAcquired to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('seedsAcquired', JSON.stringify(seedsAcquired));
  }, [seedsAcquired]);

  // Add a new seed to the "Seeds I need to buy" list
  const handleAddSeed = () => {
    if (newSeed && !seedsToBuy.some((seed) => seed.text === newSeed)) {
      const updatedSeedsToBuy = [...seedsToBuy, { text: newSeed, selected: false }];
      setSeedsToBuy(updatedSeedsToBuy);
      setNewSeed(''); // Clear the input field
    }
  };

  // Handle transferring seeds between the two lists
  const handleToolBarClick = (e) => {
    const toolName = e.toolName || '';
    const result = processListBoxData(seedsToBuy, seedsAcquired, toolName, 'selected');
    setSeedsToBuy(result.listBoxOneData);
    setSeedsAcquired(result.listBoxTwoData);
  };

  // Handle item selection in the ListBox
  const handleItemClick = (e, data, connectedData) => {
    const updatedData = data.map((item) => {
      if (item.text === e.dataItem.text) {
        item.selected = !item.selected;
      } else if (!e.nativeEvent.ctrlKey) {
        item.selected = false;
      }
      return item;
    });

    const updatedConnectedData = connectedData.map((item) => {
      item.selected = false;
      return item;
    });

    setSeedsToBuy(updatedData);
    setSeedsAcquired(updatedConnectedData);
  };

  return (
    <section id="wishlist">
      <h2>Seed Management</h2>
      <div className="listbox-container">
        <div className="listbox-column">
          <h3>Seeds I need to buy</h3>
          <ListBox
            style={{ height: 300, width: '100%' }}
            data={seedsToBuy}
            textField="text"
            selectedField="selected"
            onItemClick={(e) => handleItemClick(e, seedsToBuy, seedsAcquired)}
            toolbar={() => (
              <ListBoxToolbar
                tools={[
                  'moveUp',
                  'moveDown',
                  'transferTo',
                  'transferFrom',
                  'transferAllTo',
                  'transferAllFrom',
                  'remove',
                ]}
                data={seedsToBuy}
                dataConnected={seedsAcquired}
                onToolClick={handleToolBarClick}
              />
            )}
          />
        </div>
        <div className="listbox-column">
          <h3>Seeds acquired</h3>
          <ListBox
            style={{ height: 300, width: '100%' }}
            data={seedsAcquired}
            textField="text"
            selectedField="selected"
            onItemClick={(e) => handleItemClick(e, seedsAcquired, seedsToBuy)}
          />
        </div>
      </div>

      {/* Input and Button to add new seeds */}
      <div className="add-seed-form">
        <Input
          placeholder="Enter a new seed"
          value={newSeed}
          onChange={(e) => setNewSeed(e.value)}
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Button
          themeColor="primary"
          icon="plus"
          svgIcon={plusIcon}
          onClick={handleAddSeed}
          disabled={!newSeed}
        >
          Add to Wishlist
        </Button>
      </div>
    </section>
  );
};

export default WishlistSection;