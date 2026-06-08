import React from 'react'

const AboutPage = () => (
    <div className="about-page">
        <section className="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>About Twisty Tales</h2>
                        <p>
                            Welcome to Twisty Tales, where imagination blooms into beautiful handmade creations. 
                            I specialize in crafting unique pipe cleaner flowers that bring joy and color to any occasion.
                        </p>
                        <p>
                            Each flower is carefully handcrafted with attention to detail, ensuring that every piece 
                            is one-of-a-kind and made with love.
                        </p>
                        <div className="features">
                            <div className="feature">
                                <i className="fas fa-heart"></i>
                                <span>Handmade with Love</span>
                            </div>
                            <div className="feature">
                                <i className="fas fa-palette"></i>
                                <span>Unique Designs</span>
                            </div>
                            <div className="feature">
                                <i className="fas fa-clock"></i>
                                <span>Long-lasting</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-image">
                        <div className="flower-showcase">
                            <div className="rotating-flower">🌸</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default AboutPage;
