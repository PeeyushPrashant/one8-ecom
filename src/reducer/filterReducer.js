import { initialFilter } from "../contexts/Filter-context";
const filterReducer = (state, action) => {
  switch (action.type) {
    case "filter":
      const newFilter = {
        ...state.filter,
        [action.payload[0]]: action.payload[1],
      };
      return { ...state, filter: newFilter };
    case "clear":
      console.log(initialFilter);
      return { ...state, filter: initialFilter };

    default:
      return state;
  }
};
export { filterReducer };
