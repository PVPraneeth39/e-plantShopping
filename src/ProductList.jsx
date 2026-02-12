import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();

  // ✅ Correctly placed INSIDE component
  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15,
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12,
        },
      ],
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <a href="/" onClick={handleHomeClick}>
          <h3>Paradise Nursery</h3>
        </a>

        <a href="#" onClick={handleCartClick}>
          🛒
        </a>
      </div>

      {/* Product Grid OR Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">
                      {plant.description}
                    </div>
                    <div className="product-cost">
                      ${plant.cost}
                    </div>

                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
