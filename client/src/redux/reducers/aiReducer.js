const initialState = {
  loading: false,
  insights: null,
  error: null,
};

export default function aiReducer(state = initialState, action) {
  switch (action.type) {
    case "AI_REQUEST":
      return { ...state, loading: true };

    case "AI_SUCCESS":
      return { loading: false, insights: action.payload, error: null };

    case "AI_FAIL":
      return { loading: false, insights: null, error: action.payload };

    default:
      return state;
  }
}
