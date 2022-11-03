import React from "react";

import Card from "../components/Card/Card";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onSearchInput,
  onAddToFavorite,
  onAddToCard,
}) => {
  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>All shoes</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className=" clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            value={searchValue}
            onChange={onSearchInput}
            placeholder="Search...."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchValue))
          .map((item, id) => (
            <Card
              {...item}
              key={id}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCard(obj)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
