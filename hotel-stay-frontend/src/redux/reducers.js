import {
    FETCH_HOTELS_REQUEST,
    FETCH_HOTELS_SUCCESS,
    FETCH_HOTELS_FAILURE,
    SET_SEARCH_TERM,
    SET_DATES,
    SET_GUESTS
} from './actions';

const initialState = {
    hotels: [],
    filteredHotels: [],
    searchTerm: '',
    checkInDate: '',
    checkOutDate: '',
    guests: { adults: 2, children: 0, rooms: 1 },
    error: null,
    loading: false
};

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOTELS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_HOTELS_SUCCESS:
            return {
                ...state,
                loading: false,
                hotels: action.payload,
                filteredHotels: action.payload
            };
        case FETCH_HOTELS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        case SET_DATES:
            return { ...state, checkInDate: action.payload.checkInDate, checkOutDate: action.payload.checkOutDate };
        case SET_GUESTS:
            return { ...state, guests: action.payload };
        default:
            return state;
    }
};

export default hotelReducer;
