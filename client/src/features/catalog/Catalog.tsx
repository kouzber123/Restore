import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layouts/LoadingComponents";

// ! IN CATALOG COMPONENT WE RECEIVE THE ITEMS
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  /*
  then = get data 
  catch = error handling
  finally = clean up and setting loading to false
  */
  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  //add optional message props
  if (loading) return <LoadingComponent message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

//intercept in the way or way out
