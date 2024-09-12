export const FETCH_HOTELS_REQUEST = 'FETCH_HOTELS_REQUEST';
export const FETCH_HOTELS_SUCCESS = 'FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAILURE = 'FETCH_HOTELS_FAILURE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_DATES = 'SET_DATES';
export const SET_GUESTS = 'SET_GUESTS';

export const fetchHotelsRequest = () => ({ type: FETCH_HOTELS_REQUEST });
export const fetchHotelsSuccess = (hotels) => ({ type: FETCH_HOTELS_SUCCESS, payload: hotels });
export const fetchHotelsFailure = (error) => ({ type: FETCH_HOTELS_FAILURE, payload: error });
export const setSearchTerm = (term) => ({ type: SET_SEARCH_TERM, payload: term });
export const setDates = (checkInDate, checkOutDate) => ({ type: SET_DATES, payload: { checkInDate, checkOutDate } });
export const setGuests = (guests) => ({ type: SET_GUESTS, payload: guests });
