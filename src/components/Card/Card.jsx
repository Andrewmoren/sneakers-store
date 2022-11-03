import React, { useState } from "react";

import styles from "./Card.module.scss";

const Card = ({
  id,
  name,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ name, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          onClick={onClickFavorite}
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Price:</span>
          <b>{price} $</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
};

export default Card;
