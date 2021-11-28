import React from 'react';
import ReactDOM from 'react-dom';

const Thumbnail = ({photo, photoIndex, counter, handleThumbnailClick, altText}) => {


  //change className to add style

  let thumbSelected = '';
  (photoIndex === counter) ? thumbSelected = 'thumb_selected_po' : '';

  return (
    <React.Fragment>
      <div className={`thumbnail_frame_po ${thumbSelected}`} id={`${thumbSelected}`} key={`TF${counter}`}>
        <img className='thumbnail_box_po'
          src={photo}
          alt={`${altText} ${counter} Thumbnail`}
          onClick={ () => { handleThumbnailClick(counter); }}/>
      </div>
    </React.Fragment>
  );
};

export default Thumbnail;
