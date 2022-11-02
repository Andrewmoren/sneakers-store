import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://63452c19dcae733e8feb2bd7.mockapi.io/sneakers")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCard = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content  p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All shoes</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search...." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item, id) => (
            <Card
              {...item}
              key={id}
              onClickFavorite={() => console.log("Add to favorite")}
              onPlus={(obj) => onAddToCard(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
