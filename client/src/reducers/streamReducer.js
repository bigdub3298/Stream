export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "FETCH_STREAMS":
      const newState = { ...state };
      for (const stream of action.payload) {
        newState[stream.id] = stream;
      }
      return newState;
    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_STREAM":
      const { [action.payload]: omitted, ...rest } = state;
      console.log(omitted);
      return rest;
    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
