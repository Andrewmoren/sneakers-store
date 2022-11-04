import React, { useState } from "react";

const Drawer = ({ items, onClose, onRemove }) => {
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
          <>
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
              <button className="greenButton">
                Continue to checkout <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              height="120px"
              src="/img/empty-cart.jpg"
              alt="Empty"
            />
            <h2>Empty cart</h2>
            <p className="opacity-6">
              Please add at least one product to proceed with the order
            </p>
            <button onClick={onClose} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
