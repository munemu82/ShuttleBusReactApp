import { createStore, combineReducers } from 'redux';
import bookingsReducer from '../reducers/bookings';
import filtersReducer from '../reducers/filters';

//Create store
export default () => {
    const store = createStore(
        combineReducers({
          bookings: bookingsReducer,
          filters: filtersReducer
        }),
        //below is the required settings for Redux DevTools to connect to this store
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    return store;
};
