import { useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

// Import Images
import laptop from "./assets/laptop.png";
import shoes from "./assets/shoes.png";
import phone from "./assets/phone.png";
import tshirt from "./assets/t-shirt.png";

function App() {
  const productsData = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 700,
      image: laptop,
    },
    {
      id: 2,
      name: "Shoes",
      category: "Fashion",
      price: 80,
      image: shoes,
    },
    {
      id: 3,
      name: "Phone",
      category: "Electronics",
      price: 500,
      image: phone,
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Fashion",
      price: 30,
      image: tshirt,
    },
  ];

  const [products, setProducts] = useState(productsData);

  const filterProducts = (category) => {
    if (category === "All") {
      setProducts(productsData);
    } else {
      const filtered = productsData.filter(
        (product) => product.category === category
      );

      setProducts(filtered);
    }
  };

  return (
    <div className="container">
      <h1>🛒 Product Listing UI</h1>

      <div className="filters">
        <button onClick={() => filterProducts("All")}>All</button>

        <button onClick={() => filterProducts("Electronics")}>
          Electronics
        </button>

        <button onClick={() => filterProducts("Fashion")}>
          Fashion
        </button>
      </div>

      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;