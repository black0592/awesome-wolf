import { combineReducers, createStore, applyMiddleware } from 'redux';
import initDraw from './tempInitDraw'

const reducer = (state = {notInit: true}, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, action.payload);
    case 'DIRT':
      return Object.assign({}, action.payload);
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
