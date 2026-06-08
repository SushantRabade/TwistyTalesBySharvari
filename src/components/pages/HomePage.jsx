import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const HomePage = () => {
    const scrollToProducts = () => {
        const productsSection = document.querySelector('.products-showcase');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const products = [
        { id: 1, name: 'Mini Bouquet', price: '$15', description: 'Perfect small arrangement for desks', emoji: '🌸' },
        { id: 2, name: 'Standard Bouquet', price: '$25', description: 'Medium-sized bouquet for any occasion', emoji: '🌺' },
        { id: 3, name: 'Large Arrangement', price: '$40', description: 'Impressive large centerpiece', emoji: '🌻' },
        { id: 4, name: 'Custom Design', price: '$50+', description: 'Personalized creation just for you', emoji: '🌹' }
    ];

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-video-container">
                        <div className="hero-overlay"></div>
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Twisty Tales</h1>
                        <h2 className="hero-subtitle">Handmade Pipe Cleaner Flowers</h2>
                        <p className="hero-description">
                            Unique, beautiful, and lasting floral arrangements crafted with love and creativity
                        </p>
                        <div className="hero-buttons">
                            <Link to="/gallery" className="btn-primary">View Gallery</Link>
                            <Link to="/contact" className="btn-secondary">Order Now</Link>
                        </div>
                    </div>
                    <div className="scroll-arrow" onClick={scrollToProducts}>
                        <div className="arrow-icon">
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <span className="arrow-text">Explore Products</span>
                    </div>
                </div>
            </section>

            {/* Products Carousel Section */}
            <section className="products-showcase">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Discover our beautiful handmade flower arrangements</p>
                    
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        className="products-swiper"
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="product-card">
                                    <div className="product-image">
                                        <div className="product-flower">{product.emoji}</div>
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <div className="product-price">{product.price}</div>
                                        <p className="product-description">{product.description}</p>
                                        <button className="btn-product">Order Now</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    <div className="swiper-button-prev">
                        <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="swiper-button-next">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
