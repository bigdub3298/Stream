import streams from "../apis/streams";
import history from "../history";

export const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

export const createStream = values => async dispatch => {
  const response = await streams.post("/streams", values);
  dispatch({ type: "CREATE_STREAM", payload: response.data });
  history.push("/");
};

export const fetchAllStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const editStream = (id, values) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, values);

  dispatch({ type: "EDIT_STREAM", payload: response.data });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: "DELETE_STREAM", payload: id });
};
