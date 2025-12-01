
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface NavBarProps {
    onOpenCategories: () => void;
    onNavigate: (view: string, category?: string) => void;
    activeView: string;
    activeCategory: string | null;
    mobileMenuOpen?: boolean;
    onCloseMobileMenu?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
    onOpenCategories, 
    onNavigate, 
    activeView, 
    activeCategory, 
    mobileMenuOpen, 
    onCloseMobileMenu 
}) => {
    const handleNavClick = (e: React.MouseEvent, item: any) => {
        e.preventDefault();
        
        if (onCloseMobileMenu) {
            onCloseMobileMenu();
        }

        if (item.action === 'modal_categories') {
            onOpenCategories();
        } else if (item.action === 'home') {
            onNavigate('home');
        } else if (item.action === 'category' && item.categoryName) {
            onNavigate('category', item.categoryName);
        }
    };

    return (
        <nav className={`nav-scroll ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="container">
                <ul className="nav-list">
                    {NAV_ITEMS.filter(item => item.isActive !== false).map((item, index) => {
                        const hasManyChildren = item.children && item.children.length > 8;
                        
                        // Determine active state
                        let isActive = false;
                        if (item.action === 'home' && activeView === 'home') isActive = true;
                        if (item.action === 'category' && activeView === 'category' && item.categoryName === activeCategory) isActive = true;
                        
                        // Use a darker gold color (#B8860B) for highlights to improve readability on white background
                        const highlightStyle = item.highlight ? { color: '#B8860B', fontWeight: '800' } : {};

                        return (
                            <li key={index} className={`nav-item ${item.children ? 'dropdown-container' : ''}`}>
                                <a 
                                    href={item.href} 
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                    style={highlightStyle}
                                    onClick={(e) => handleNavClick(e, item)}
                                >
                                    {item.icon && <i className={item.icon} style={{marginRight: '5px'}}></i>}
                                    {item.label}
                                    {item.children && (
                                        <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '4px', verticalAlign: 'middle' }}></i>
                                    )}
                                </a>
                                
                                {item.children && (
                                    <div className={`dropdown-menu ${hasManyChildren ? 'columns-2' : ''}`}>
                                        {item.children.map((child, cIndex) => (
                                            <a 
                                                key={cIndex} 
                                                href={child.href} 
                                                className="dropdown-item"
                                                style={child.highlight ? { color: '#B8860B', fontWeight: 800 } : {}}
                                                onClick={() => {
                                                    if (onCloseMobileMenu) onCloseMobileMenu();
                                                }}
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
