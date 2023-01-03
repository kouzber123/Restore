import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import { Product } from "../../app/models/product";
import LoadingComponent from "../../app/layouts/LoadingComponents";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);
  //! when getting data have setLoading component
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(parseInt(id))
      .then(response => setProduct(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    const val = event.target.value;
    if (val >= 0) {
      setQuantity(parseInt(val));
    }
  }
  function handleUpdateCart() {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false));
    }
  }

  if (loading) return <LoadingComponent message="Loading the Product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3"> {product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {" "}
          $ {(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField onChange={handleInputChange} variant="outlined" type="number" label="Quantity in Cart" fullWidth value={quantity} />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton disabled={item?.quantity === quantity || !item && quantity === 0} loading={submitting} onClick={handleUpdateCart} sx={{ height: "55px" }} color="primary" size="large" variant="contained" fullWidth>
              {item ? "Update" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
