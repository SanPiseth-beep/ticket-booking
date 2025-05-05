import React, { useState } from 'react';
import events from '../data/data';
import { Link } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredEvents = events
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="card-container">
      <h1 className="section-title">Explore Events</h1>
      <div className="sort-filter">
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select onChange={(e) => setSortBy(e.target.value)} className="select-input">
          <option value="">Sort By</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="card-wrapper">
        {filteredEvents.map(event => (
          <div key={event.id} className="card">
            <img src={event.thumbnail} alt={event.title} className="card-img" />
            <div className="card-content">
              <h2 className="card-title">{event.title}</h2>
              <p className="card-meta">{event.date} • {event.location}</p>
              <p className="card-price">${event.price}</p>
              <Link to={`/event/${event.id}`} className="card-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
