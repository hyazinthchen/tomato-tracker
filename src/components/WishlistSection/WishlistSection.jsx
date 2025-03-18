import React, { useState, useEffect } from 'react';
import {
  ListBox,
  ListBoxToolbar,
  processListBoxData,
} from '@progress/kendo-react-listbox';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { plusIcon } from '@progress/kendo-svg-icons';
import seedIcon from '../../images/seeds.svg';
import crownIcon from '../../images/crown.svg';
import './wishlistSection.css';

const WishlistSection = ({ plantData }) => {
  const [seedsToBuy, setSeedsToBuy] = useState(() => {
    const savedSeedsToBuy = localStorage.getItem('seedsToBuy');
    return savedSeedsToBuy ? JSON.parse(savedSeedsToBuy) : [];
  });

  const [seedsAcquired, setSeedsAcquired] = useState(() => {
    const savedSeedsAcquired = localStorage.getItem('seedsAcquired');
    return savedSeedsAcquired ? JSON.parse(savedSeedsAcquired) : [];
  });

  const [newSeed, setNewSeed] = useState('');

  useEffect(() => {
    localStorage.setItem('seedsToBuy', JSON.stringify(seedsToBuy));
  }, [seedsToBuy]);

  useEffect(() => {
    localStorage.setItem('seedsAcquired', JSON.stringify(seedsAcquired));
  }, [seedsAcquired]);

  const handleAddSeed = () => {
    if (newSeed && !seedsToBuy.some((seed) => seed.text === newSeed)) {
      const updatedSeedsToBuy = [
        ...seedsToBuy,
        { text: newSeed, selected: false },
      ];
      setSeedsToBuy(updatedSeedsToBuy);
      setNewSeed('');
    }
  };

  const handleToolBarClick = (e) => {
    const toolName = e.toolName || '';
    const result = processListBoxData(
      seedsToBuy,
      seedsAcquired,
      toolName,
      'selected'
    );
    setSeedsToBuy(result.listBoxOneData);
    setSeedsAcquired(result.listBoxTwoData);
  };

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

  const highestRatedTomato =
    plantData.length > 0
      ? plantData.reduce((prev, current) => {
          if (!prev || current.taste > prev.taste) {
            return current;
          }
          return prev;
        }, null)
      : null;

  const shortestGrowthPeriodTomato =
    plantData.length > 0
      ? plantData.reduce((prev, current) => {
          if (!prev || current.growthPeriod < prev.growthPeriod) {
            return current;
          }
          return prev;
        }, null)
      : null;

  return (
    <section className='wishlist-section'>
      <div>
        <div className='headline-wrapper'>
          <img src={seedIcon} alt='Image of a hand sowing seeds' />
          <h2>Seed Management</h2>
        </div>
        <div className='wishlist-wrapper'>
          <div className='listbox-container'>
            <div>
              <h3>Seeds I need to buy</h3>
              <ListBox
                style={{ height: 300, width: '100%' }}
                data={seedsToBuy}
                textField='text'
                selectedField='selected'
                onItemClick={(e) =>
                  handleItemClick(e, seedsToBuy, seedsAcquired)
                }
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
            <div>
              <h3>Seeds acquired</h3>
              <ListBox
                style={{ height: 300, width: '100%' }}
                data={seedsAcquired}
                textField='text'
                selectedField='selected'
                onItemClick={(e) =>
                  handleItemClick(e, seedsAcquired, seedsToBuy)
                }
              />
            </div>
          </div>
          <div className='seed-form-wrapper'>
            <div className='input-group'>
              <Label editorId='newSeed'>New Seed Variety:</Label>
              <Input
                name='newSeed'
                id='newSeed'
                placeholder='Enter a new seed'
                value={newSeed}
                onChange={(e) => setNewSeed(e.value)}
              />
            </div>
            <Button
              themeColor='primary'
              icon='plus'
              svgIcon={plusIcon}
              onClick={handleAddSeed}
              disabled={!newSeed}
              style={{ backgroundColor: '#0d5039', borderColor: '#0d5039' }}
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className='headline-wrapper'>
          <img src={crownIcon} alt='Image of a crown' />
          <h2>Top Tomatoes</h2>
        </div>
        <div className='top-tomato-wrapper'>
          {highestRatedTomato ? (
            <div>
              <h3>Highest Rated Tomato</h3>
              <div className='table'>
                <div>
                  <span>Variety:</span>
                  <span>{highestRatedTomato.variety}</span>
                </div>
                <div>
                  <span>Taste Rating:</span>
                  <span>{highestRatedTomato.taste}</span>
                </div>
                <div>
                  <span>Planting Date:</span>
                  <span>{highestRatedTomato.formattedPlantingDate}</span>
                </div>
                <div>
                  <span>First Harvest:</span>
                  <span>{highestRatedTomato.formattedFirstHarvest}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>No data available for highest rated tomato.</p>
          )}
          {shortestGrowthPeriodTomato ? (
            <div>
              <h3>Shortest Growth Period</h3>
              <div className='table'>
                <div>
                  <span>Variety:</span>
                  <span>{shortestGrowthPeriodTomato.variety} </span>
                </div>
                <div>
                  <span>Growth Period:</span>
                  <span>{shortestGrowthPeriodTomato.growthPeriod}</span>
                </div>
                <div>
                  <span>Planting Date:</span>
                  <span>
                    {shortestGrowthPeriodTomato.formattedPlantingDate}
                  </span>
                </div>
                <div>
                  <span>First Harvest:</span>
                  <span>
                    {shortestGrowthPeriodTomato.formattedFirstHarvest}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p>No data available for shortest growth period.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishlistSection;
