import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelSlice';

const store = configureStore({
    reducer: {
        hotels: hotelsReducer
    }
});

export default store;
