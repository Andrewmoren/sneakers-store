import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AppContext from "./components/context";

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://636513347b209ece0f569692.mockapi.io/cart"),
            axios.get("https://636513347b209ece0f569692.mockapi.io/favorite"),
            axios.get("https://636513347b209ece0f569692.mockapi.io/sneakers"),
          ]);
        // const cartResponse = await axios.get(
        //   "https://636513347b209ece0f569692.mockapi.io/cart"
        // );
        // const favoriteResponse = await axios.get(
        //   "https://636513347b209ece0f569692.mockapi.io/favorite"
        // );
        // const itemsResponse = await axios.get(
        //   "https://636513347b209ece0f569692.mockapi.io/sneakers"
        // );

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Error!");
      }
    }
    fetchData();
  }, []);

  const onAddToCard = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        await axios.delete(
          `https://636513347b209ece0f569692.mockapi.io/cart/${obj.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post(
          "https://636513347b209ece0f569692.mockapi.io/cart",
          obj
        );
      }
    } catch (error) {
      alert("Error!");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://636513347b209ece0f569692.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Error!");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://636513347b209ece0f569692.mockapi.io/favorite/${obj.id}`
        );

        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://636513347b209ece0f569692.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Error!");
    }
  };

  const onSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCard,
        setCartOpened,
        setCartItems,
        cartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearchInput={onSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCard={onAddToCard}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
