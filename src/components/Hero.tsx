
import React, { useState, useEffect } from 'react';
import { api, urlFor } from '../services/sanity';
import { Slide } from '../types';

interface HeroProps {
    onNavigate: (view: string, category?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSlides = async () => {
            try {
                const data = await api.getSlides();
                setSlides(data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading slides:", error);
                setLoading(false);
            }
        };
        loadSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    if (loading || slides.length === 0) {
        return <div style={{ height: '400px', background: '#f4f7f5' }}></div>;
    }

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-carousel">
                    {/* INDICATORS */}
                    <div className="carousel-indicators">
                        {slides.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`dot ${idx === currentSlide ? 'active' : ''}`} 
                                onClick={() => goToSlide(idx)}
                            ></span>
                        ))}
                    </div>

                    {/* SLIDES */}
                    {slides.map((slide, index) => (
                        <div 
                            key={slide.id} 
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`} 
                            style={{ background: slide.background }}
                        >
                            <div className="hero-banner">
                                <div className="hero-content">
                                    <span className="hero-tag" style={slide.tagStyle}>{slide.tag}</span>
                                    <h1 className="hero-title" style={slide.titleStyle}>
                                        {slide.title}
                                    </h1>
                                    <p className="hero-desc">{slide.description}</p>
                                    <button 
                                        className="btn-primary" 
                                        style={{ ...slide.ctaStyle, border: 'none', cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavigate('category', slide.categoryLink);
                                        }}
                                    >
                                        {slide.cta} <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                <div 
                                    className="hero-image" 
                                    style={{ 
                                        backgroundImage: `url('${urlFor(slide.image)}')`,
                                        backgroundPosition: slide.imagePosition || 'center'
                                    }}
                                    // Atributos especiais para SEO/LCP no primeiro slide
                                    {...(index === 0 ? {
                                        fetchpriority: "high",
                                        loading: "eager"
                                    } as any : {})}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
