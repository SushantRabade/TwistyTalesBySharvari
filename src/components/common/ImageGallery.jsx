import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styled from '@emotion/styled'

// Emotion Styled Components
const GallerySection = styled.section`
    padding: 100px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="50" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="50" r="0.5" fill="white" opacity="0.1"/><circle cx="50" cy="90" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
`;

const SectionTitle = styled.h2`
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-family: 'Dancing Script', cursive;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const SectionSubtitle = styled.p`
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 4rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
`;

const CustomSwiper = styled(Swiper)`
    padding: 60px 40px 80px;
    
    .swiper-slide {
        background-position: center;
        background-size: cover;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
            z-index: 1;
        }
        
        &:hover {
            transform: scale(1.05);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
    }
    
    .swiper-slide-active {
        transform: scale(1.1);
        z-index: 10;
    }
`;

const SlideContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 2;
    color: white;
    text-align: center;
`;

const SlideTitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

const SlideDescription = styled.p`
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 1rem;
`;

const SlideButton = styled.button`
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
    }
`;

const CustomNavigation = styled.div`
    position: relative;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const NavButton = styled.button`
    width: 60px;
    height: 60px;
    border: 2px solid white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
        border-color: #ff6b6b;
    }
`;

const CustomPagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
    
    .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.3);
        opacity: 1;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        
        &:hover {
            background: rgba(255, 255, 255, 0.5);
        }
    }
    
    .swiper-pagination-bullet-active {
        background: white;
        border-color: #ff6b6b;
        transform: scale(1.3);
    }
`;

// Gallery Data
const galleryImages = [
    {
        id: 1,
        title: "Spring Collection",
        description: "Vibrant colors of spring",
        image: "https://picsum.photos/seed/spring-flowers/600/400",
        emoji: "🌸"
    },
    {
        id: 2,
        title: "Summer Blooms",
        description: "Bright and cheerful arrangements",
        image: "https://picsum.photos/seed/summer-flowers/600/400",
        emoji: "🌺"
    },
    {
        id: 3,
        title: "Autumn Harmony",
        description: "Warm tones of fall",
        image: "https://picsum.photos/seed/autumn-flowers/600/400",
        emoji: "🍂"
    },
    {
        id: 4,
        title: "Winter Magic",
        description: "Elegant winter designs",
        image: "https://picsum.photos/seed/winter-flowers/600/400",
        emoji: "❄️"
    },
    {
        id: 5,
        title: "Custom Creations",
        description: "Personalized just for you",
        image: "https://picsum.photos/seed/custom-flowers/600/400",
        emoji: "🎨"
    }
];

const ImageGallery = () => {
    const [swiperRef, setSwiperRef] = useState(null);

    return (
        <GallerySection>
            <Container>
                <SectionTitle>Floral Gallery</SectionTitle>
                <SectionSubtitle>Explore our stunning collection of handmade flower arrangements</SectionSubtitle>
                
                <CustomSwiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        el: '.custom-pagination',
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: '.swiper-prev',
                        nextEl: '.swiper-next',
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: false,
                        waitForTransition: false,
                    }}
                    loop={true}
                    onSwiper={setSwiperRef}
                    className="gallery-swiper"
                >
                    {galleryImages.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div 
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    height: '400px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    fontSize: '3rem',
                                    zIndex: 2,
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {item.emoji}
                                </div>
                            </div>
                            <SlideContent>
                                <SlideTitle>{item.title}</SlideTitle>
                                <SlideDescription>{item.description}</SlideDescription>
                                <SlideButton>View Collection</SlideButton>
                            </SlideContent>
                        </SwiperSlide>
                    ))}
                </CustomSwiper>
                
                <CustomNavigation>
                    <NavButton className="swiper-prev">
                        <i className="fas fa-chevron-left"></i>
                    </NavButton>
                    <NavButton className="swiper-next">
                        <i className="fas fa-chevron-right"></i>
                    </NavButton>
                </CustomNavigation>
                
                <CustomPagination className="custom-pagination"></CustomPagination>
            </Container>
        </GallerySection>
    );
};

export default ImageGallery;
