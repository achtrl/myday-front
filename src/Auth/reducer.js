export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        googleId: action.payload.googleId,
        first_name: action.payload.first_name,
      };
    case "API_REQUEST":
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};
