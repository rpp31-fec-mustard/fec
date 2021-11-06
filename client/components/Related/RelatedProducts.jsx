import React from 'react';
import ProductCard from './ProductCard.jsx';
import LeftButton from './LeftButton.jsx';
import RightButton from './RightButton.jsx';

const RelatedProducts = (props) => {
  const productCards = props.relatedProducts.map((item, i) => {
    console.log(item.name, item.features);
    return (
      <ProductCard
        key={item.id}
        handleAction={props.handleAction}
        product={item}
        homeProduct={props.homeProduct}
      />
    );
  });

  return (
    <div id="related-products" className="related-submodule">
      <h3>RELATED PRODUCTS</h3>
      <div className="prod-card-container">
        <LeftButton />
        {productCards}
        <RightButton />
      </div>
    </div>
  );
};

export default RelatedProducts;
