
import React from 'react';
import { Product } from '../types';
import { urlFor } from '../services/sanity';

interface ProductCardProps {
    product: Product;
    onBuy: (product: Product) => void;
    onNavigate?: (view: string, category?: string, productId?: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, onNavigate }) => {
    const handleDetailsClick = () => {
        if (onNavigate) {
            onNavigate('product', undefined, product.id);
        }
    };

    return (
        <div className="product-card">
            {product.badge && (
                <span 
                    className="badge" 
                    style={product.badgeColor ? { background: product.badgeColor, color: 'white' } : {}}
                >
                    {product.badge}
                </span>
            )}
            
            <div 
                className="product-img-wrapper" 
                onClick={handleDetailsClick}
                style={{ cursor: onNavigate ? 'pointer' : 'default' }}
            >
                <img 
                    src={urlFor(product.image)} 
                    alt={product.name} 
                    loading="lazy"
                    width="250"
                    height="220"
                />
            </div>
            
            <div className="product-cat">{product.category}</div>
            
            <h3 
                className="product-title"
                onClick={handleDetailsClick}
                style={{ cursor: onNavigate ? 'pointer' : 'default' }}
            >
                {product.name}
            </h3>
            
            {product.oldPrice ? (
                <div className="price-container-discount">
                    <span className="price-old">De: {product.oldPrice}</span>
                    <span className="price-new">Por: {product.price}</span>
                </div>
            ) : (
                <div className="product-price">{product.price}</div>
            )}

            <button 
                className="btn-add" 
                onClick={() => onBuy(product)}
            >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Compre Agora
            </button>
        </div>
    );
};

export default ProductCard;
