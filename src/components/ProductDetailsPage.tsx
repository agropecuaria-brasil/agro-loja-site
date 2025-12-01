
import React, { useState } from 'react';
import { Product } from '../types';
import { urlFor } from '../services/sanity';

interface ProductDetailsPageProps {
    product: Product;
    onBuy: (product: Product) => void;
    onNavigate: (view: string, category?: string) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onBuy, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');
    
    // Se tiver galeria no produto, usa ela. Se não, usa a imagem principal repetida apenas como fallback visual ou array vazio
    const galleryImages = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [product.image]; // Mostra pelo menos a principal

    const [mainImage, setMainImage] = useState(product.image);

    return (
        <div className="section" style={{ backgroundColor: '#fff', minHeight: '80vh' }}>
            <div className="container">
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                    <span 
                        style={{ cursor: 'pointer', fontWeight: 600 }} 
                        onClick={() => onNavigate('home')}
                    >
                        Home
                    </span>
                    <span style={{ margin: '0 10px' }}>/</span>
                    <span 
                        style={{ cursor: 'pointer', fontWeight: 600 }} 
                        onClick={() => onNavigate('category', product.category)}
                    >
                        {product.category}
                    </span>
                    <span style={{ margin: '0 10px' }}>/</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{product.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', marginBottom: '60px' }}>
                    {/* LEFT: IMAGE GALLERY */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ 
                            borderRadius: 'var(--radius)', 
                            overflow: 'hidden', 
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '400px',
                            position: 'relative'
                        }}>
                            {product.badge && (
                                <span className="badge" style={{ top: '20px', left: '20px', background: product.badgeColor || 'var(--accent)' }}>
                                    {product.badge}
                                </span>
                            )}
                            <img src={urlFor(mainImage)} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                        {/* Thumbnails */}
                        {galleryImages.length > 0 && (
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {/* Sempre mostra a imagem principal original como primeira opção */}
                                <div 
                                    onClick={() => setMainImage(product.image)}
                                    style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '8px', 
                                        border: mainImage === product.image ? '2px solid var(--primary)' : '1px solid #eee',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        padding: '5px'
                                    }}
                                >
                                    <img src={urlFor(product.image)} alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>

                                {/* Renderiza o resto da galeria */}
                                {galleryImages.map((img, i) => (
                                    <div key={i} 
                                        onClick={() => setMainImage(img)}
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            borderRadius: '8px', 
                                            border: mainImage === img ? '2px solid var(--primary)' : '1px solid #eee',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            padding: '5px'
                                        }}>
                                        <img src={urlFor(img)} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: INFO */}
                    <div>
                        <span style={{ 
                            background: '#E9F5EC', 
                            color: 'var(--primary)', 
                            padding: '5px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.85rem', 
                            fontWeight: 700, 
                            textTransform: 'uppercase'
                        }}>
                            {product.category}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', margin: '15px 0 10px', lineHeight: 1.2 }}>{product.name}</h1>
                        <div style={{ fontSize: '0.95rem', color: '#999', marginBottom: '20px' }}>
                            Cód. Produto: {product.id}
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            {product.oldPrice && (
                                <span style={{ textDecoration: 'lineThrough', color: '#bbb', fontSize: '1.1rem', display: 'block' }}>
                                    De: {product.oldPrice}
                                </span>
                            )}
                            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                {product.price}
                            </span>
                            <span style={{ display: 'block', fontSize: '0.9rem', color: '#666' }}>
                                À vista ou em até 3x sem juros
                            </span>
                        </div>

                        <button 
                            className="btn-add" 
                            style={{ 
                                background: 'var(--whatsapp-color)', 
                                color: 'white', 
                                borderColor: 'transparent',
                                fontSize: '1.2rem',
                                padding: '18px',
                                maxWidth: '350px',
                                boxShadow: '0 10px 25px rgba(37, 211, 102, 0.25)'
                            }}
                            onClick={() => onBuy(product)}
                        >
                            <i className="fab fa-whatsapp" style={{ fontSize: '1.5rem' }}></i> Comprar pelo WhatsApp
                        </button>
                        
                        <div style={{ marginTop: '25px', fontSize: '0.9rem', color: '#666', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <span><i className="fas fa-truck" style={{ color: 'var(--primary)' }}></i> Entrega Rápida</span>
                            <span><i className="fas fa-box-open" style={{ color: 'var(--primary)' }}></i> Enviamos para todo Brasil</span>
                            <span><i className="fas fa-shield-alt" style={{ color: 'var(--primary)' }}></i> Compra Segura</span>
                        </div>
                    </div>
                </div>

                {/* DETAILS TABS */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                    <div style={{ display: 'flex', gap: '30px', marginBottom: '25px', borderBottom: '2px solid #f0f0f0' }}>
                        <button 
                            onClick={() => setActiveTab('desc')}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                padding: '0 0 15px 0', 
                                fontSize: '1.1rem', 
                                fontWeight: 700, 
                                color: activeTab === 'desc' ? 'var(--primary)' : 'var(--text-gray)',
                                borderBottom: activeTab === 'desc' ? '3px solid var(--primary)' : '3px solid transparent',
                                marginBottom: '-2px',
                                cursor: 'pointer'
                            }}
                        >
                            Descrição do Produto
                        </button>
                        <button 
                            onClick={() => setActiveTab('specs')}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                padding: '0 0 15px 0', 
                                fontSize: '1.1rem', 
                                fontWeight: 700, 
                                color: activeTab === 'specs' ? 'var(--primary)' : 'var(--text-gray)',
                                borderBottom: activeTab === 'specs' ? '3px solid var(--primary)' : '3px solid transparent',
                                marginBottom: '-2px',
                                cursor: 'pointer'
                            }}
                        >
                            Ficha Técnica
                        </button>
                    </div>

                    <div style={{ color: 'var(--text-dark)', lineHeight: 1.8 }}>
                        {activeTab === 'desc' && (
                            <div style={{ maxWidth: '900px' }}>
                                <p>{product.description || "Descrição detalhada não disponível para este produto no momento."}</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div style={{ maxWidth: '600px' }}>
                                {product.specifications ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            {product.specifications.map((spec, idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                    <td style={{ padding: '12px 0', fontWeight: 700, width: '40%', color: 'var(--text-gray)' }}>{spec.label}</td>
                                                    <td style={{ padding: '12px 0' }}>{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Informações técnicas não disponíveis.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
