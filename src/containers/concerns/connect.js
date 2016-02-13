import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapValues from 'lodash.mapvalues';
import loadingActions from '../../actions/loading';

function id(x) { return x };

export function connect(actions) {
  return reduxConnect(id, (dispatch) => bindActionCreators(actions, dispatch));
}

function bindLoadingActions(actions, dispatch) {
  const loadingAction = bindActionCreators(loadingActions, dispatch);
  const props = bindActionCreators(actions, dispatch);

  return mapValues(props, (f, name) => {
    return (...args) => {
      loadingAction.start(name);
      return f(...args);
    }
  });
}

export function connectWithLoading(actions) {
  return reduxConnect(id, (dispatch) => bindLoadingActions(actions, dispatch));
}
