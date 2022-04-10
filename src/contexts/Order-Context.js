import { createContext, useContext, useReducer } from "react";

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDERS":
      return { ...state, orderData: action.payload };
    default:
      return state;
  }
};

const OrderProvider = ({ children }) => {
  const [orderState, orderDispatch] = useReducer(orderReducer, {
    orderData: {},
  });
  return (
    <OrderContext.Provider value={{ orderState, orderDispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
