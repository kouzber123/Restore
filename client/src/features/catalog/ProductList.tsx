import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector(state => state.catalog);

  return (
    //spacing != pixels 1 spacing = 8px, 4x8
    <Grid
      container
      spacing={4}
    >
      {products.map(product => (
        <Grid
          item
          xs={4}
          key={product.id}
        >
          {!productsLoaded ? <ProductCardSkeleton /> : <ProductCard product={product} />}
        </Grid>
      ))}
    </Grid>
  );
}
