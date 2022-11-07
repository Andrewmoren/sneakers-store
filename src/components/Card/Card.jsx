import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../components/context";
import styles from "./Card.module.scss";

const Card = ({
  id,
  name,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, price, imageUrl };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={160}
          height={250}
          viewBox="0 0 160 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="160" height="155" />
          <rect x="0" y="167" rx="10" ry="10" width="160" height="15" />
          <rect x="0" y="192" rx="10" ry="10" width="100" height="15" />
          <rect x="0" y="230" rx="10" ry="10" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="35" height="35" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                onClick={onClickFavorite}
                src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
                alt="Unliked"
              />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
