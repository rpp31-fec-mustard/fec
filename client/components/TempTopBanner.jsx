import React, {useState} from 'react';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const productId = Math.floor(Math.random() * (max - min + 1) + min);
  console.log('random productId:', productId);
  return productId;
};

const TempTopBanner = (props) => {
  // console.log('TempTop:', props)
  const [borderShow, setBorderShow] = useState(true);

  const clickHandlerRandom = () => {
    // console.log('Random:', props)
    props.sendNumber(getRandomIntInclusive(59553, 59700).toString());
  };

  const clickHandlerBorder = () => {
    if (borderShow) {
      //turn off border
      let d = document.querySelectorAll('div');
      d.forEach(x => x.style.border = '0px');
      setBorderShow(false);
    } else {
      //turn on border
      let d = document.querySelectorAll('div');
      d.forEach(x => x.style.border = '1px solid var(--global-border-color)');
      setBorderShow(true);
    }
  };


  return (
    <div id='top_banner'>
      <div id='top_bar'>
        <h3 className='top_text'>STORE LOGOTYPE</h3>
        <p id='outlines' onClick={clickHandlerBorder}>outlines</p>
        <p id='product_59553' onClick={() => { props.sendNumber('59553'); }}>59553</p>
        <h3 className='top_text' onClick={clickHandlerRandom}>SEARCH</h3>
      </div>
      <p id='announcements'>
        announcements *** Click outlines to toggle outlines! Click search to change product! *** announcements
      </p>
    </div>
  );
};

export default TempTopBanner;
