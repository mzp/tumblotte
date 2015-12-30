import { handleActions } from 'redux-actions';

export default handleActions({
  CREATE: (state, action) => {
    return state+1;
  }
}, 0);
