import React from 'react';
import './MissingGallery.css';

const missingItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=80', // Bag
      date: '2025-04-04', 
      location: 'Library Hall',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=500&q=80', // Notebook
      date: '2025-04-03',
      location: 'Canteen',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=80', // Phone
      date: '2025-04-01',
      location: 'Hostel Block B',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=500&q=80', // Pen Drive
      date: '2025-04-02',
      location: 'Computer Lab',
    },
  ];
  

const MissingGallery = () => {
  return (
    <div className="missing-gallery-container">
      <h2 className="gallery-title">🎒 Missing College Items</h2>
      <div className="missing-gallery-grid">
        {missingItems.map((item) => (
          <div className="missing-card" key={item.id}>
            <img src={item.image} alt={`Missing Item ${item.id}`} />
            <div className="missing-hover-info">
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Place:</strong> {item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingGallery;
