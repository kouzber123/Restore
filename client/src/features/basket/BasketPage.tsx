import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ListItem, Button } from '@mui/material';
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layouts/LoadingComponents";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from 'react-router-dom';

//! THIS COMPONENT HANDLES THE  BASKET PAGE LIST AND REMOVE ITEMS
export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ""
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(err => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(err => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }
  if (!basket) return <Typography variant="h3">Your Basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>

              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow key={item.productId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>

                <TableCell align="center">
                  <LoadingButton loading={status.loading && status.name === "rem" + item.productId} color="error" onClick={() => handleRemoveItem(item.productId, 1, "rem" + item.productId)}>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status.loading && status.name === "add" + item.productId} color="secondary" onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>

                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.name === "del" + item.productId} color="error" onClick={() => handleRemoveItem(item.productId, item.quantity, "del" + item.productId)}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary/>
          <Button
          component={Link}
          to="/checkout"
          variant="contained"
          size="large"
          fullWidth
          >
            
            CheckOut
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
