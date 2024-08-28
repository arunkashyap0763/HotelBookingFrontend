// src/components/HotelList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7034/api/Hotels')
            .then(response => {
                if (response.data && response.data.$values) {
                    setHotels(response.data.$values);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setError('Unexpected data format from API');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch hotel data');
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here if needed
        console.log('Search Term:', searchTerm);
        console.log('Check-In Date:', checkInDate);
        console.log('Check-Out Date:', checkOutDate);
        console.log('Guests:', guests);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hotels.length) {
        return <div>Loading hotels...</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#003580', fontSize: '2rem' }}>Find your next stay</h1>
                <p style={{ color: '#003580', fontSize: '1.2rem' }}>Search low prices on hotels, homes, and much more...</p>

                <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px',
                            width: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '4px 0 0 4px',
                            fontSize: '1rem'
                        }}
                    />
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <select
                        value={`${guests.adults} adults · ${guests.children} children · ${guests.rooms} room`}
                        onChange={(e) => {
                            const [adults, , children, , rooms] = e.target.value.split(' ');
                            setGuests({ adults: parseInt(adults), children: parseInt(children), rooms: parseInt(rooms) });
                        }}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="2 adults · 0 children · 1 room">2 adults · 0 children · 1 room</option>
                        <option value="2 adults · 1 child · 1 room">2 adults · 1 child · 1 room</option>
                        <option value="3 adults · 0 children · 1 room">3 adults · 0 children · 1 room</option>
                        <option value="2 adults · 2 children · 1 room">2 adults · 2 children · 1 room</option>
                        <option value="4 adults · 0 children · 2 rooms">4 adults · 0 children · 2 rooms</option>
                    </select>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#003580',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0 4px 4px 0',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Search
                    </button>
                </form>
            </div>

            <div>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Hotel Stays</h2>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                    {hotels.map(hotel => (
                        <li key={hotel.hotelId} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
                            <h3 style={{ marginBottom: '10px', color: '#003580' }}>{hotel.name}</h3>
                            <p style={{ marginBottom: '10px', color: '#666' }}>{hotel.address}</p>
                            <div>
                                <h4 style={{ marginBottom: '10px', color: '#333' }}>Rooms</h4>
                                <ul style={{ listStyle: 'none', padding: '0' }}>
                                    {hotel.room.$values.map(room => (
                                        <li key={room.roomId} style={{ marginBottom: '10px' }}>
                                            <h5 style={{ marginBottom: '5px', color: '#003580' }}>{room.roomType}</h5>
                                            <p style={{ marginBottom: '5px', color: '#666' }}>Rate: ₹{room.rate}</p>
                                            {/* If roomPicture has URLs, they should be rendered here */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HotelList;
