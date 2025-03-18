import React from 'react';
import TomatoDecoration from '../TomatoDecoration/TomatoDecoration';
import './header.css';

const Header = () => {
  return (
    <header>
      <TomatoDecoration />
      <div className='text-wrapper'>
        <h1>TOMATO TRACKER</h1>
        <span className='subheadline'>
          Track the growth and taste of your tomatoes!
        </span>
      </div>
      <TomatoDecoration flipped />
    </header>
  );
};

export default Header;
