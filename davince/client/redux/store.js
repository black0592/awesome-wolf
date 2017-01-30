import { combineReducers, createStore, applyMiddleware } from 'redux';
import initDraw from './tempInitDraw'
import getInitialState from './getInitialState'
const reducer = (state = getInitialState(), action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case 'INITDRAW':
      initDraw(nextState);
      return nextState;
    case 'DRAWCARD':
      return nextState;
    default:
      return nextState;
  }
}
const reducers = combineReducers({
  reducer
});

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
