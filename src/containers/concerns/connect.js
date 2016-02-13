import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapValues from 'lodash.mapvalues';
import loadingActions from '../../actions/loading';

function id(x) { return x };

function withLoading(dispatch, props) {
  const loadingAction = bindActionCreators(loadingActions, dispatch);

  return mapValues(props, (f, name) => {
    return (...args) => {
      loadingAction.start(name);
      return f(...args);
    }
  });
}

function raw(_, props) {
  return props;
}

function parseOption(option) {
  const { loading } = option || {};
  return loading ? withLoading : raw;
}

export function connect(actions, option) {
  return reduxConnect(id, (dispatch) => {
    const wrap = parseOption(option);
    return wrap(dispatch, bindActionCreators(actions, dispatch));
  });
}

export function connectCombine(combineActions, option) {
  return reduxConnect(id, (dispatch) => {
    const wrap = parseOption(option);
    return mapValues(combineActions, (actions) => {
      return wrap(dispatch, bindActionCreators(actions, dispatch));
    });
  });
}
