import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://63452c19dcae733e8feb2bd7.mockapi.io/sneakers")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://63452c19dcae733e8feb2bd7.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://63452c19dcae733e8feb2bd7.mockapi.io/favorite")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://63452c19dcae733e8feb2bd7.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63452c19dcae733e8feb2bd7.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(
        `https://63452c19dcae733e8feb2bd7.mockapi.io/favorite/${obj.id}`
      );
      // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const resp = await axios.post(
        "https://63452c19dcae733e8feb2bd7.mockapi.io/favorite",
        obj
      );
      setFavorites((prev) => [...prev, obj]);
    }
  };

  const onSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearchInput={onSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCard={onAddToCard}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
