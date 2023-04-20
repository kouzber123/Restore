import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layouts/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

// ! IN CATALOG COMPONENT WE RECEIVE THE ITEMS
export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, status } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
