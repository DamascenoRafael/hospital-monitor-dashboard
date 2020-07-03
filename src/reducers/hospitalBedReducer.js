import { UPDATE_HOSPITAL_BEDS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_HOSPITAL_BEDS:
      return action.payload;
    default:
      return state;
  }
};
