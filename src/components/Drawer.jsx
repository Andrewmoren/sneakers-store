import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "./context";
import Info from "./Info";

const delay = (s) => new Promise((resolve) => setTimeout(resolve, s));

const Drawer = ({ items = [], onClose, onRemove }) => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://636513347b209ece0f569692.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://636513347b209ece0f569692.mockapi.io/cart" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Error");
    }
    setIsLoading(false);
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
                  <b>{totalPrice} $</b>
                </li>
                <li className="d-flex">
                  <span>Order 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} $</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Continue to checkout <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order completed!" : "Empty basket"}
            description={
              isOrderComplete
                ? `Your order ${orderId} will be delivered soon!`
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
