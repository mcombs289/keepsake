export default function count(state = 0, action) {
  if (action.type === "INC") {
    state++;
  } else if (action.type === "DEC") {
    state--;
  }
  return state;
}
