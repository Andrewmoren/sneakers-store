import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import AppContext from "../components/context";

const Orders = () => {
  const { onAddToCard, onAddToFavorite } = useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://636513347b209ece0f569692.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error!");
      }
    })();
  }, []);

  return (
    <div className="content  p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {isLoading
          ? [...Array(8)]
          : orders.map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
      </div>
    </div>
  );
};

export default Orders;
