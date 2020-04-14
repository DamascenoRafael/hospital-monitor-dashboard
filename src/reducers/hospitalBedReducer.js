export default (state = [], action) => {
  switch (action.type) {
    case 'HOSPITAL_BEDS_UPDATED':
      return action.payload;
    default:
      return state;
  }
};
