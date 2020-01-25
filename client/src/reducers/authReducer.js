const INITIAL_STATE = {
  userId: null,
  isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { isSignedIn: true, userId: action.payload };
    case "SIGN_OUT":
      return { isSignedIn: false, userId: null };
    default:
      return state;
  }
};
