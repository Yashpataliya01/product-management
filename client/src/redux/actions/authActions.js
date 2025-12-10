import api from "../../api/axios";

// LOGIN
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    const res = await api.post("/auth/login", userData);

    dispatch({
      type: "AUTH_SUCCESS",
      payload: res.data.user,
    });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return { success: true, user: res.data.user };

  } catch (error) {
    const message = error.response?.data?.message || "Login failed";

    dispatch({
      type: "AUTH_FAIL",
      payload: message,
    });

    return { error: true, payload: message }; // RETURN FAILURE
  }
};

// REGISTER
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    const res = await api.post("/auth/register", userData);

    dispatch({
      type: "AUTH_SUCCESS",
      payload: res.data.user,
    });

    return res.data; // return data for navigation

  } catch (error) {
    dispatch({
      type: "AUTH_FAIL",
      payload: error.response?.data?.message || "Registration failed",
    });

    return { error: true, payload: error.response?.data?.message };
  }
};

// GET LOGGED IN USER
export const getMe = () => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    const res = await api.get("/auth/me");

    dispatch({
      type: "AUTH_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
  }
};

// LOGOUT
export const logoutUser = () => async (dispatch) => {
  try {
    await api.post("/auth/logout"); // Clear cookie on server
  } catch (err) {
    console.error("Logout API Error:", err);
  }
  localStorage.removeItem("user");
  dispatch({ type: "AUTH_LOGOUT" });
};
