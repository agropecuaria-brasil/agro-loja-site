
import React from 'react';

interface FooterProps {
    logoUrl?: string;
    footerText?: string;
    whatsappNumber?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    onNavigate?: (view: string, category?: string) => void;
    onOpenWhatsApp?: () => void;
    onOpenCategories?: () => void; 
    onOpenCookieSettings?: () => void; // Nova prop para abrir configs de cookie
}

const Footer: React.FC<FooterProps> = ({ 
    logoUrl, 
    footerText, 
    whatsappNumber, 
    instagramUrl, 
    facebookUrl, 
    onNavigate, 
    onOpenWhatsApp,
    onOpenCategories,
    onOpenCookieSettings
}) => {
    const igLink = instagramUrl || "#";
    const fbLink = facebookUrl || "#";

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <a href="#" className="logo-link" style={{ marginBottom: '20px' }} onClick={(e) => e.preventDefault()}>
                            {logoUrl ? (
                                <img src={logoUrl} alt="Agropecuária Brasil" className="logo-img" />
                            ) : (
                                <>
                                    <i className="fas fa-leaf logo-icon-simple" style={{ fontSize: '2rem' }}></i>
                                    <div className="logo-text-simple" style={{ fontSize: '1.5rem' }}>
                                        <span className="txt-agro-simple">Agropecuária</span>
                                        <span className="txt-brasil-simple">Brasil</span>
                                    </div>
                                </>
                            )}
                        </a>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            {footerText || "Seu pet shop online favorito. Trazendo alegria e saúde para quem você mais ama desde 2010."}
                        </p>
                        <div className="social-links">
                            <a href={igLink} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href={fbLink} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a 
                                href="#" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    if(onOpenWhatsApp) onOpenWhatsApp(); 
                                }} 
                                className="social-btn" 
                                aria-label="WhatsApp"
                            >
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Categorias</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('category', 'Cães'); }}>Cães</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('category', 'Gatos'); }}>Gatos</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('category', 'Pássaros'); }}>Pássaros</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('category', 'Medicamentos'); }}>Medicamentos</a></li>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); if(onOpenCategories) onOpenCategories(); }}>
                                    Todas as Categorias
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Links Úteis</h4>
                        <ul>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('store'); }}>
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('privacy'); }}>
                                    Política de Privacidade
                                </a>
                            </li>
                            {/* Link obrigatório para LGPD compliance */}
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); if(onOpenCookieSettings) onOpenCookieSettings(); }}>
                                    Preferências de Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2025 Agropecuária Brasil. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
