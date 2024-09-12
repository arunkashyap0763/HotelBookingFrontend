import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, setFilteredHotels, setSearchTerm, setCheckInDate, setCheckOutDate, setGuests, setLoading, setError } from '../redux/slices/hotelSlice';


const HotelList = () => {
    const dispatch = useDispatch();
    const { hotels, filteredHotels, searchTerm, checkInDate, checkOutDate, guests, error, loading } = useSelector(state => state.hotels);

    useEffect(() => {
        dispatch(fetchHotels());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        const filtered = hotels.filter(hotel =>
            hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        dispatch(setFilteredHotels(filtered));
        dispatch(setLoading(false));
    };

    const getImageUrl = (pictureUrl) => {
        // Assuming the pictures are stored in the public/images folder
        return `${pictureUrl}`;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#003580' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#003580', padding: '20px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>Booking.com</div>
                    <nav style={{ display: 'flex', gap: '20px' }}>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Stays</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Flights</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Flight + Hotel</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Car rentals</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Attractions</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Airport taxis</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ padding: '40px 20px', backgroundColor: '#f9f9f9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h1 style={{ color: '#003580', fontSize: '2.5rem', margin: '0' }}>Find your next stay</h1>
                        <p style={{ color: '#003580', fontSize: '1.2rem', marginTop: '10px' }}>Search low prices on hotels, homes, and much more...</p>
                    </div>

                    <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            style={{
                                padding: '15px',
                                width: '250px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => dispatch(setCheckInDate(e.target.value))}
                            style={{
                                padding: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => dispatch(setCheckOutDate(e.target.value))}
                            style={{
                                padding: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                        <select
                            value={`${guests.adults} adults · ${guests.children} children · ${guests.rooms} room`}
                            onChange={(e) => {
                                const [adults, , children, , rooms] = e.target.value.split(' ');
                                dispatch(setGuests({ adults: parseInt(adults), children: parseInt(children), rooms: parseInt(rooms) }));
                            }}
                            style={{
                                padding: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
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
                                padding: '15px 30px',
                                backgroundColor: '#003580',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Search
                        </button>
                    </form>

                    <div>
                        {loading && <div>Loading hotels...</div>}
                        {!loading && filteredHotels.length === 0 && <div>No hotels found for your search.</div>}
                        {filteredHotels.length > 0 && (
                            <>
                                <h2 style={{ marginBottom: '20px', color: '#333' }}>Hotel Stays</h2>
                                <ul style={{ listStyle: 'none', padding: '0' }}>
                                    {filteredHotels.map(hotel => (
                                        <li key={hotel.hotelId} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
                                            <h3 style={{ marginBottom: '10px', color: '#003580' }}>{hotel.name}</h3>
                                            <p style={{ marginBottom: '10px', color: '#666' }}>{hotel.address}</p>

                                            <h4 style={{ marginBottom: '10px', color: '#333' }}>Rooms</h4>
                                            <ul style={{ listStyle: 'none', padding: '0' }}>
                                                {hotel.room.$values.map(room => {
                                                    const discountedRate = room.rate - (room.rate * room.discountPercentage / 100);
                                                    const roomPictures = room.roomPicture.$values;
                                                    const roomImage = roomPictures.length > 0 ? getImageUrl(roomPictures[0].pictureUrl) : '/images/placeholder.png'; // Placeholder image

                                                    return (
                                                        <li key={room.roomId} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <img 
                                                                src={roomImage} 
                                                                alt={room.roomType}
                                                                style={{ 
                                                                    width: '100px', 
                                                                    height: '75px', 
                                                                    objectFit: 'cover', 
                                                                    marginRight: '20px', 
                                                                    borderRadius: '8px', 
                                                                    border: '1px solid #ccc' 
                                                                }}
                                                            />
                                                            <div>
                                                                <h5 style={{ marginBottom: '5px', color: '#003580' }}>{room.roomType}</h5>
                                                                {room.discountPercentage > 0 ? (
                                                                    <div>
                                                                        <p style={{ marginBottom: '5px', color: '#e74c3c' }}>
                                                                            <s>{room.rate} INR</s> {discountedRate} INR
                                                                        </p>
                                                                        <p style={{ color: '#2ecc71' }}>Discounted Rate</p>
                                                                    </div>
                                                                ) : (
                                                                    <p style={{ marginBottom: '5px', color: '#333' }}>
                                                                        {room.rate} INR
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#003580', color: '#fff', padding: '20px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>&copy; 2024 Booking.com. All rights reserved.</p>
                    <div>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>Privacy Policy</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HotelList;
