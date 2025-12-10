const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {

    case "PRODUCT_REQUEST":
      return { ...state, loading: true };

    case "PRODUCT_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

    // new product add
    case "PRODUCT_ADD":
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    // update product
    case "PRODUCT_UPDATE":
      return {
        ...state,
        loading: false,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

    // delete product
    case "PRODUCT_DELETE":
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
}
