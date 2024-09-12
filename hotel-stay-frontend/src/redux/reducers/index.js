import { combineReducers } from '@reduxjs/toolkit';
import hotelsReducer from '../slices/hotelsSlice'; // Adjust this path if necessary

const rootReducer = combineReducers({
    hotels: hotelsReducer,
    // Add other reducers here if needed
});

export default rootReducer;
