import { Button, ButtonGroup, Typography } from "@mui/material";
import { changeString } from "./counterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector(state => state.counter);
  console.log(data);
  console.log(title);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">{data}</Typography>
      <ButtonGroup>
        <Button variant="contained" onClick={() => dispatch(increment(100))}>
          Click to Increment
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement(40))}>
          Click to Decrement
        </Button>
        <Button variant="contained" onClick={() => dispatch(changeString("iver the limp"))}>
          Change title value
        </Button>
      </ButtonGroup>
    </>
  );
}
