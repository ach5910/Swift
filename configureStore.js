import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {workoutReducer} from './reducers/workout';
import {logger} from './logger';
import { exerciseReducer } from './reducers/exercises';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const middleWare = [thunk, logger];
    const store = createStore(
      combineReducers({
        workout: workoutReducer,
        exercises: exerciseReducer,
      }),
      composeEnhancers(applyMiddleware(...middleWare))
    );
  
    return store;
};