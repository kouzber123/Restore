import {
  Grid,
  Typography,
  Button,
} from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

//! THIS COMPONENT HANDLES THE  BASKET PAGE LIST AND REMOVE ITEMS
export default function BasketPage() {
  const { basket, status } = useAppSelector(state => state.basket);

  const dispatch = useAppDispatch();

  if (!basket) return <Typography variant="h3">Your Basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items}/>
      <Grid container>
        <Grid
          item
          xs={6}
        />
        <Grid
          item
          xs={6}
        >
          <BasketSummary />
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
