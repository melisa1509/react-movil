import { createStore, compose, applyMiddleware } from 'redux';
import { forbiddenWordsMiddleware } from 'middleware/Index.jsx';
import { loadState, saveState } from "actions/actions.jsx";
import indexReducer from 'reducers/index.jsx';
import thunk from 'redux-thunk';


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistedState = loadState();
export const store = createStore(
  indexReducer,
  persistedState,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, thunk ))
);
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});