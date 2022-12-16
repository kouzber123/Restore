import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

// ! IN CATALOG COMPONENT WE RECEIVE THE ITEMS
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
