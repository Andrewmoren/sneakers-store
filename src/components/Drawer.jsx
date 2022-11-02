import React from "react";

const Drawer = () => {
  return (
    <div style={{ display: "none" }} className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Basket
          <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>

            <div className="mr-20">
              <p className="mb-5">Nike blazer mid suede men's</p>
              <b>300 $</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>

            <div className="mr-20">
              <p className="mb-5">Nike blazer mid suede men's</p>
              <b>300 $</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
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
      </div>
    </div>
  );
};

export default Drawer;