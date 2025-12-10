import api from "../../api/axios";

export const fetchAiInsights = () => async (dispatch) => {
  try {
    dispatch({ type: "AI_REQUEST" });

    const res = await api.get("/ai");

    dispatch({
      type: "AI_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "AI_FAIL",
      payload: error.response?.data?.message || "Failed to load AI insights",
    });
  }
};
