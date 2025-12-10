import api from "../../api/axios";

// FETCH ALL PRODUCTS
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const res = await api.get("/products");

    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response?.data?.message || "Failed to load products",
    });
  }
};

// CREATE PRODUCT
export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const res = await api.post("/products", data);

    dispatch({
      type: "PRODUCT_ADD",
      payload: res.data.product,
    });

  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const res = await api.put(`/products/${id}`, data);

    dispatch({
      type: "PRODUCT_UPDATE",
      payload: res.data.updatedProduct,
    });

  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response?.data?.message || "Failed to update product",
    });
  }
};

// DELETE PRODUCT — THIS WAS MISSING
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    await api.delete(`/products/${id}`);

    dispatch({
      type: "PRODUCT_DELETE",
      payload: id,
    });

  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};
