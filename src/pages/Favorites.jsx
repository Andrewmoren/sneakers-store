import React from "react";

import Card from "../components/Card/Card";

const Favorites = ({ items, onAddToFavorite }) => {
  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Favorites</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item, index) => (
          <Card
            {...item}
            favorited={true}
            onFavorite={onAddToFavorite}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
