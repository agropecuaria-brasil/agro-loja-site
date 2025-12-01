
import React, { useState } from 'react';

interface HeaderProps {
    onGoHome: () => void;
    onNavigate?: (view: string, category?: string) => void;
    onSearch?: (term: string) => void; // Nova prop
    logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onNavigate, onSearch, logoUrl }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchSubmit = () => {
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <header>
            <div className="container">
                <div className="header-flex">
                    {/* Botão Hambúrguer Mobile */}
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => {
                            // Dispara evento customizado para o NavBar ouvir (já que o estado está no App/NavBar)
                            const event = new CustomEvent('toggleMobileMenu');
                            window.dispatchEvent(event);
                        }}
                        style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--primary)', cursor: 'pointer' }}
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <a 
                        href="#" 
                        className="logo-link"
                        onClick={(e) => { e.preventDefault(); onGoHome(); }}
                    >
                        {logoUrl ? (
                            <img src={logoUrl} alt="Agropecuária Brasil" className="logo-img" />
                        ) : (
                            <>
                                <i className="fas fa-leaf logo-icon-simple"></i>
                                <div className="logo-text-simple">
                                    <span className="txt-agro-simple">Agropecuária</span>
                                    <span className="txt-brasil-simple">Brasil</span>
                                </div>
                            </>
                        )}
                    </a>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="O que seu pet precisa hoje?" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearchSubmit}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <div className="header-links">
                        <a 
                            href="#"
                            onClick={(e) => { 
                                e.preventDefault(); 
                                if (onNavigate) onNavigate('store'); 
                            }}
                        >
                            <i className="fas fa-store-alt"></i> Sobre a Agropecuária Brasil
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
