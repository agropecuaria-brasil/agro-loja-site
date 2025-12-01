
import React, { useState, useRef, useEffect } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import CategoriesModal from './components/CategoriesModal';
import CategoryPage from './components/CategoryPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import OurStorePage from './components/OurStorePage';
import Newsletter from './components/Newsletter';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import SEO from './components/SEO';
import LgpdBanner from './components/LgpdBanner';
import GoogleTagManager from './components/GoogleTagManager';
import { ALL_PRODUCTS } from './constants';
import { api, urlFor } from './services/sanity';
import { Product, PromoBanner, Brand, SiteConfig, CategoryItem } from './types';

const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [selectedProductForBuy, setSelectedProductForBuy] = useState<Product | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Estado para controlar abertura das configurações de Cookies
    const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
    
    // Navigation State
    const [currentView, setCurrentView] = useState<'home' | 'category' | 'product' | 'store' | 'privacy'>('home');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewProduct, setViewProduct] = useState<Product | null>(null);

    // Data State (CMS Ready)
    const [products, setProducts] = useState<Product[]>([]);
    const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [siteConfig, setSiteConfig] = useState<SiteConfig>({});
    const [loading, setLoading] = useState(true);

    const offersTrackRef = useRef<HTMLDivElement>(null);
    const brandsTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleToggleMenu = () => setMobileMenuOpen(prev => !prev);
        window.addEventListener('toggleMobileMenu', handleToggleMenu);
        return () => window.removeEventListener('toggleMobileMenu', handleToggleMenu);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsData, bannersData, brandsData, configData, categoriesData] = await Promise.all([
                    api.getProducts(),
                    api.getPromoBanners(),
                    api.getBrands(),
                    api.getSiteConfig(),
                    api.getCategories()
                ]);
                
                setProducts(productsData);
                setPromoBanners(bannersData);
                setBrands(brandsData);
                setSiteConfig(configData);
                setCategories(categoriesData);

                processInitialUrl(productsData);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();

        window.addEventListener('popstate', () => processInitialUrl(products));
        return () => window.removeEventListener('popstate', () => processInitialUrl(products));
    }, []);

    const processInitialUrl = (loadedProducts: Product[]) => {
        const path = window.location.pathname;
        const parts = path.replace(/^\/|\/$/g, '').split('/');
        
        const route = parts[0];
        const param = parts[1] ? decodeURIComponent(parts[1]) : null;

        if (route === '' || route === 'home') {
            setCurrentView('home');
        } else if (route === 'loja') {
            setCurrentView('store');
        } else if (route === 'privacidade') {
            setCurrentView('privacy');
        } else if (route === 'categoria' && param) {
            setCurrentView('category');
            setSelectedCategory(param);
        } else if (route === 'produto' && param) {
            const prod = loadedProducts.find(p => p.id === param) || ALL_PRODUCTS.find(p => p.id === param);
            if (prod) {
                setViewProduct(prod);
                setCurrentView('product');
            } else {
                setCurrentView('home'); 
            }
        }
    };

    const handleOpenBuyModal = (product: Product | null = null) => {
        setSelectedProductForBuy(product);
        setModalOpen(true);
    };

    const handleNavigate = (view: string, categoryName?: string, productId?: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
        
        let newPath = "/";

        if (view === 'home') {
            setCurrentView('home');
            setSelectedCategory(null);
            setViewProduct(null);
            newPath = "/";
        } 
        else if (view === 'store') {
            setCurrentView('store');
            setSelectedCategory(null);
            setViewProduct(null);
            newPath = "/loja";
        }
        else if (view === 'privacy') {
            setCurrentView('privacy');
            setSelectedCategory(null);
            setViewProduct(null);
            newPath = "/privacidade";
        }
        else if (view === 'category' && categoryName) {
            setCurrentView('category');
            setSelectedCategory(categoryName);
            setViewProduct(null);
            newPath = `/categoria/${encodeURIComponent(categoryName)}`;
        }
        else if (view === 'product' && productId) {
            const prod = products.find(p => p.id === productId) || ALL_PRODUCTS.find(p => p.id === productId);
            if (prod) {
                setViewProduct(prod);
                setCurrentView('product');
                newPath = `/produto/${prod.id}`;
            }
        }

        if (window.location.pathname !== newPath) {
            window.history.pushState({}, "", newPath);
        }
    };

    const handleSearch = (term: string) => {
        handleNavigate('category', `Search: ${term}`);
    };

    const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (ref.current) {
            const itemWidth = (ref.current.firstElementChild as HTMLElement)?.offsetWidth || 300;
            const scrollAmount = itemWidth + 20; 
            ref.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    const homeFeaturedProducts = products.filter(p => p.badge || p.oldPrice).slice(0, 8);
    const popularCategoryNames = ['Rações', 'Medicamentos', 'Brinquedos', 'Higiene', 'Acessórios', 'Cães'];
    const popularCategoriesToRender = categories.filter(cat => popularCategoryNames.includes(cat.name));

    let pageTitle = "Agropecuária Brasil | O Shopping do seu Melhor Amigo";
    let pageDesc = "Encontre tudo para seu pet: rações, brinquedos, medicamentos e muito mais.";

    if (currentView === 'product' && viewProduct) {
        pageTitle = `${viewProduct.name} | Agropecuária Brasil`;
        pageDesc = `Compre ${viewProduct.name} com o melhor preço. ${viewProduct.description?.substring(0, 150)}...`;
    } else if (currentView === 'category' && selectedCategory) {
        const cleanName = selectedCategory.replace('Search:', 'Busca:');
        pageTitle = `${cleanName} | Agropecuária Brasil`;
    } else if (currentView === 'store') {
        pageTitle = "Sobre a Loja | Agropecuária Brasil";
    } else if (currentView === 'privacy') {
        pageTitle = "Política de Privacidade | Agropecuária Brasil";
        pageDesc = "Conheça nossa política de privacidade e como tratamos seus dados de acordo com a LGPD.";
    }

    return (
        <>
            <SEO title={pageTitle} description={pageDesc} />
            <GoogleTagManager gtmId={siteConfig.gtmId} />
            
            <div className="sticky-wrapper">
                <TopBar text={siteConfig.topBarText} icon={siteConfig.topBarIcon} />
                <Header 
                    onGoHome={() => handleNavigate('home')} 
                    onNavigate={handleNavigate}
                    onSearch={handleSearch}
                    logoUrl={siteConfig.logoUrl}
                />
                <NavBar 
                    onOpenCategories={() => setCategoriesModalOpen(true)} 
                    onNavigate={handleNavigate}
                    activeView={currentView}
                    activeCategory={selectedCategory}
                    mobileMenuOpen={mobileMenuOpen}
                    onCloseMobileMenu={() => setMobileMenuOpen(false)}
                />
            </div>
            
            {currentView === 'home' && (
                <>
                    <Hero onNavigate={handleNavigate} />
                    <section className="section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Categorias Populares</h2>
                                <a href="#" className="section-link" onClick={(e) => { e.preventDefault(); setCategoriesModalOpen(true); }}>
                                    Ver todas <i className="fas fa-chevron-right"></i>
                                </a>
                            </div>
                            <div className="category-grid">
                                {popularCategoriesToRender.map(cat => (
                                    <div key={cat.id} className="cat-card" onClick={() => handleNavigate('category', cat.name)}>
                                        <div className="cat-icon"><i className={cat.icon}></i></div>
                                        <div className="cat-name">{cat.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="section" style={{ backgroundColor: 'white' }}>
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Ofertas</h2>
                                <a href="#" className="section-link" onClick={(e) => { e.preventDefault(); handleNavigate('category', 'Ofertas'); }}>
                                    Ver todas <i className="fas fa-chevron-right"></i>
                                </a>
                            </div>
                            {loading ? (
                                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--primary)' }}>
                                    <i className="fas fa-circle-notch fa-spin fa-2x"></i>
                                    <p style={{ marginTop: '10px' }}>Carregando ofertas...</p>
                                </div>
                            ) : (
                                <div className="carousel-container">
                                    <button className="carousel-btn prev" onClick={() => scrollCarousel(offersTrackRef, 'left')}><i className="fas fa-chevron-left"></i></button>
                                    <button className="carousel-btn next" onClick={() => scrollCarousel(offersTrackRef, 'right')}><i className="fas fa-chevron-right"></i></button>
                                    <div className="carousel-track" ref={offersTrackRef} id="offersCarousel">
                                        {homeFeaturedProducts.map(product => (
                                            <ProductCard 
                                                key={product.id} 
                                                product={product} 
                                                onBuy={handleOpenBuyModal}
                                                onNavigate={handleNavigate}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="section banner-section" style={{ paddingTop: 0 }}>
                        <div className="container">
                            <div className="dual-banner-grid">
                                {promoBanners.map((banner, index) => (
                                    <div key={index} className={`banner-item ${banner.styleClass}`}>
                                        <div className="banner-content">
                                            <h3>{banner.title}</h3>
                                            <p>{banner.description}</p>
                                            <a 
                                                href="#" 
                                                className="btn-banner" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handleNavigate('category', banner.linkCategory); 
                                                }}
                                            >
                                                {banner.cta}
                                            </a>
                                        </div>
                                        {banner.image ? (
                                             <div 
                                                className="banner-img-placeholder"
                                                style={{ backgroundImage: `url('${urlFor(banner.image)}')` }}
                                             ></div>
                                        ) : (
                                            <div className={`banner-img-placeholder ${banner.imgClass}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="section brands-section">
                        <div className="container">
                            <h2 className="section-title">Nossas Marcas Parceiras</h2>
                            <div className="carousel-container">
                                <button className="carousel-btn prev" onClick={() => scrollCarousel(brandsTrackRef, 'left')}><i className="fas fa-chevron-left"></i></button>
                                <button className="carousel-btn next" onClick={() => scrollCarousel(brandsTrackRef, 'right')}><i className="fas fa-chevron-right"></i></button>
                                <div className="carousel-track" ref={brandsTrackRef} id="brandsCarousel">
                                    {brands.map((brand, idx) => (
                                        <div key={idx} className="brand-item">
                                            <img src={urlFor(brand.image)} alt={brand.name} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentView === 'category' && selectedCategory && (
                <CategoryPage 
                    categoryName={selectedCategory} 
                    onBuy={handleOpenBuyModal}
                    onNavigate={handleNavigate}
                    categories={categories}
                />
            )}

            {currentView === 'product' && viewProduct && (
                <ProductDetailsPage 
                    product={viewProduct} 
                    onBuy={handleOpenBuyModal}
                    onNavigate={handleNavigate}
                />
            )}
            
            {currentView === 'store' && (
                <OurStorePage onOpenWhatsApp={() => handleOpenBuyModal(null)} />
            )}

            {currentView === 'privacy' && (
                <PrivacyPolicyPage onNavigate={(view) => handleNavigate(view)} />
            )}

            <Newsletter onNavigate={(view) => handleNavigate(view)} />

            <Footer 
                logoUrl={siteConfig.logoUrl} 
                footerText={siteConfig.footerText}
                whatsappNumber={siteConfig.whatsappNumber}
                instagramUrl={siteConfig.instagramUrl}
                facebookUrl={siteConfig.facebookUrl}
                onNavigate={(view) => handleNavigate(view)}
                onOpenWhatsApp={() => handleOpenBuyModal(null)}
                onOpenCategories={() => setCategoriesModalOpen(true)}
                onOpenCookieSettings={() => setCookieSettingsOpen(true)}
            />

            <div className="whatsapp-float" onClick={() => handleOpenBuyModal(null)}>
                <i className="fab fa-whatsapp"></i>
            </div>

            <WhatsAppModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                product={selectedProductForBuy}
                whatsappNumber={siteConfig.whatsappNumber}
            />

            <CategoriesModal 
                isOpen={categoriesModalOpen}
                onClose={() => setCategoriesModalOpen(false)}
                onSelectCategory={(catName) => handleNavigate('category', catName)}
                categories={categories}
            />

            {/* LGPD Banner com Controle de Estado para abertura via Footer */}
            <LgpdBanner 
                onNavigate={(view) => handleNavigate(view)} 
                forceOpenSettings={cookieSettingsOpen}
                onCloseSettings={() => setCookieSettingsOpen(false)}
            />
        </>
    );
};

export default App;
