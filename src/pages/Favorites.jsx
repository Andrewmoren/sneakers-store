import React, { useContext } from "react";

import Card from "../components/Card/Card";
import AppContext from "../components/context";

const Favorites = ({ onAddToFavorite }) => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Favorites</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
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
