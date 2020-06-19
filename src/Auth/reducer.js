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
    case "REFRESH":
      return {
        ...state,
        isLoading: false,
        googleId: action.payload.googleId,
        first_name: action.payload.first_name
      }
    default:
      return state;
  }
};
