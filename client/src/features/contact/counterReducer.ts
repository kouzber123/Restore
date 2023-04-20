export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export const CHANGE_TITLE = "CHANGE_TITLE";
export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "YARC (YET ANOTHER REDUX COUNTER)"
};

export function increment(amount = 1) {
  return {
    type: INCREMENT_COUNTER,
    payload: amount
  };
}
export function decrement(amount = 1) {
  return {
    type: DECREMENT_COUNTER,
    payload: amount
  };
}

export function changeString(word = "iver the cruel") {
  return {
    type: CHANGE_TITLE,
    payload: word
  };
}
export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload
      };
    case CHANGE_TITLE:
      return {
        ...state,
        title: (state.title = action.payload)
      };

    default:
      return state;
  }
}
