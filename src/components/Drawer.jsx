import React, { useState, useContext } from "react";
import AppContext from "./context";
import Info from "./Info";

const Drawer = ({ items, onClose, onRemove }) => {
  const { setCartItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Basket
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} $</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div ul className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Total:</span>
                  <div></div>
                  <b>780 $</b>
                </li>
                <li className="d-flex">
                  <span>Order 5%</span>
                  <div></div>
                  <b>20 $</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Continue to checkout <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order completed!" : "Empty basket"}
            description={
              isOrderComplete
                ? "Your order will be delivered soon!"
                : "Please add at least one product to proceed with the order"
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
