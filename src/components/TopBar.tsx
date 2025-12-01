
import React from 'react';

interface TopBarProps {
    text?: string;
    icon?: string;
}

const TopBar: React.FC<TopBarProps> = ({ text, icon }) => {
    // Valores padrão caso não venha da API
    const displayText = text || "Quarta Animal: Toda Quarta-feira 10% de desconto na Loja Física";
    const displayIcon = icon || "fas fa-shopping-cart";

    return (
        <div className="top-bar">
            <div className="container top-info">
                <span>
                    <i className={displayIcon}></i> {displayText}
                </span>
                <span className="top-separator">|</span>
                <span><i className="fas fa-map-marker-alt"></i> São Carlos - SP</span>
            </div>
        </div>
    );
};

export default TopBar;
