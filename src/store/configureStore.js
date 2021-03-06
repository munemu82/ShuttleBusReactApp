import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookingsReducer from '../reducers/bookings';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;
//Create store
export default () => {
    const store = createStore(
        combineReducers({
          bookings: bookingsReducer,
          filters: filtersReducer,
          auth: authReducer
        }),
        //below is the required settings for Redux DevTools to connect to this store
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    return store;
};
