// src/redux/slices/hotelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        filteredHotels: [],
        searchTerm: '',
        checkInDate: '',
        checkOutDate: '',
        guests: { adults: 2, children: 0, rooms: 1 },
        loading: false,
        error: null
    },
    reducers: {
        setHotels: (state, action) => {
            state.hotels = action.payload;
            state.filteredHotels = action.payload;
        },
        setFilteredHotels: (state, action) => {
            state.filteredHotels = action.payload;
        },
        setSearchTerm: (state, action) => {
            debugger
            state.searchTerm = action.payload;
        },
        setCheckInDate: (state, action) => {
            state.checkInDate = action.payload;
        },
        setCheckOutDate: (state, action) => {
            state.checkOutDate = action.payload;
        },
        setGuests: (state, action) => {
            state.guests = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setHotels,
    setFilteredHotels,
    setSearchTerm,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    setLoading,
    setError
} = hotelsSlice.actions;

export const fetchHotels = () => async dispatch => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const response = await axios.get('https://localhost:7034/api/Hotels');
        if (response.data && response.data.$values) {
            dispatch(setHotels(response.data.$values));
        } else {
            console.error('Unexpected data format:', response.data);
            dispatch(setError('Unexpected data format from API'));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setError('Failed to fetch hotel data'));
    } finally {
        dispatch(setLoading(false));
    }
};

export default hotelsSlice.reducer;
