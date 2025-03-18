import React, { useState, useEffect } from 'react';
import { Slide } from '@progress/kendo-react-animation';
import './tomatoDecoration.css';
import tomatoImage from '../../images/tomato-with-stem.png';

const TomatoDecoration = ({ flipped = false }) => {
  const [showTomato, setShowTomato] = useState(false);

  useEffect(() => {
    setShowTomato(true);
  }, []);

  return (
    <div className='tomato-image-container'>
      <Slide
        direction='down'
        transitionEnterDuration={1000}
        transitionExitDuration={1000}
      >
        {showTomato && (
          <img
            src={tomatoImage}
            alt='Three tomatoes on a stem'
            className={`tomato-image ${flipped ? 'flipped' : ''}`}
          />
        )}
      </Slide>
    </div>
  );
};

export default TomatoDecoration;
