import React, { useState } from 'react'

const GalleryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const flowers = [
        { id: 1, name: 'Cherry Blossom', category: 'roses', price: '$25', emoji: '🌸' },
        { id: 2, name: 'Sunflower', category: 'sunflowers', price: '$30', emoji: '🌻' },
        { id: 3, name: 'Tulip', category: 'daisies', price: '$20', emoji: '🌷' },
        { id: 4, name: 'Rose', category: 'roses', price: '$35', emoji: '🌹' },
        { id: 5, name: 'Hibiscus', category: 'custom', price: '$40', emoji: '🌺' },
        { id: 6, name: 'Daisy', category: 'daisies', price: '$22', emoji: '🌼' }
    ];

    const filteredFlowers = selectedCategory === 'all' 
        ? flowers 
        : flowers.filter(flower => flower.category === selectedCategory);

    return (
        <div className="gallery-page">
            <section className="gallery">
                <div className="container">
                    <h2>Flower Gallery</h2>
                    <div className="gallery-filters">
                        {['all', 'roses', 'sunflowers', 'daisies', 'custom'].map(category =>
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        )}
                    </div>
                    <div className="gallery-grid">
                        {filteredFlowers.map(flower =>
                            <div key={flower.id} className="gallery-item" data-category={flower.category}>
                                <div className="gallery-image">
                                    <div className="flower-emoji">{flower.emoji}</div>
                                    <div className="image-overlay">
                                        <i className="fas fa-heart"></i>
                                    </div>
                                </div>
                                <div className="gallery-info">
                                    <h3>{flower.name}</h3>
                                    <p>Beautiful handmade {flower.name.toLowerCase()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GalleryPage;
