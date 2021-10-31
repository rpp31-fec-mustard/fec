import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';

const Related = (props) => {
  const [productId, setProductId] = useState(props.product);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfitList, setOutfitList] = useState([]);

  useEffect(() => {
    axios.post('/related', { product: props.product })
      .then((result) => {
        setRelatedProducts(result.data);
      })
      .catch((error) => {
        console.log({error});
      });
  }, []);

  const handleAction = (event) => {
    const target = event.target.tagName === 'I' ? event.target : event.target.firstElementChild;
    const productId = target.parentElement.parentElement.parentElement.classList[1];

    if (target.className === 'fas fa-star') {
      // add to outfit list
      relatedProducts.forEach((item) => {
        const itemId = item.id.toString(10);
        if (itemId === productId) {
          setOutfitList(outfitList.concat([item]));
        }
      });
    } else {
      // remove from outfit list
      const newOutfitList = outfitList.filter((item) => {
        const itemId = item.id.toString(10);
        return itemId !== productId;
      });
      setOutfitList(newOutfitList);
    }
  };

  return (
    <div id="related_main" className="module_container">
      <RelatedProducts
        productId={productId}
        relatedProducts={relatedProducts}
        handleStar={handleAction}
      />
      <Outfit
        outfitList={outfitList}
        handleX={handleAction}
      />
    </div>
  );
};

export default Related;
