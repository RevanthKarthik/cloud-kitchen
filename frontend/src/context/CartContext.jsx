import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ✅ LOAD FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCALSTORAGE (AUTO)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
const addToCart = (item) => {
  if (item.status === "out-of-stock") return;

  setCart((prev) => {
    const existing = prev.find((i) => i._id === item._id);

    if (existing) {
      return prev.map((i) =>
        i._id === item._id
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    }

    return [...prev, { ...item, qty: 1 }];
  });
};
  // ✅ INCREASE
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ✅ DECREASE
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};