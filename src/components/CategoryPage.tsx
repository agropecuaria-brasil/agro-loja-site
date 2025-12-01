
import React, { useState, useEffect } from 'react';
import { Product, CategoryItem } from '../types';
import ProductCard from './ProductCard';
import { ALL_PRODUCTS } from '../constants';

interface CategoryPageProps {
    categoryName: string; // Pode ser "Search: termo"
    onBuy: (product: Product) => void;
    onNavigate: (view: string, category?: string, productId?: string) => void;
    categories: CategoryItem[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, onBuy, onNavigate, categories }) => {
    // Estados para filtros e ordenação
    const [sortOption, setSortOption] = useState<string>('default');
    const [subCategoryFilter, setSubCategoryFilter] = useState<string>('all');

    // Reseta os filtros sempre que o usuário muda de página
    useEffect(() => {
        setSortOption('default');
        setSubCategoryFilter('all');
    }, [categoryName]);

    // Verifica se é uma busca
    const isSearch = categoryName.startsWith('Search:');
    const searchTerm = isSearch ? categoryName.replace('Search:', '').trim().toLowerCase() : '';
    const displayTitle = isSearch ? `Resultados para: "${searchTerm}"` : 
                         categoryName === 'Ofertas' ? 'Ofertas Especiais' : 
                         categoryName === 'Todos' ? 'Todos os Produtos' : 
                         `Tudo para ${categoryName}`;

    // 1. FILTRAGEM INICIAL
    let filteredProducts = ALL_PRODUCTS.filter(p => {
        // LÓGICA DE BUSCA ABERTA (IA SIMULADA VIA TAGS)
        if (isSearch) {
            const inName = p.name.toLowerCase().includes(searchTerm);
            const inCat = p.category.toLowerCase().includes(searchTerm);
            const inDesc = p.description?.toLowerCase().includes(searchTerm) || false;
            // Busca nas TAGS
            const inTags = p.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) || false;

            return inName || inCat || inDesc || inTags;
        }

        if (categoryName === 'Todos') {
            return true;
        }
        if (categoryName === 'Ofertas') {
            return (p.badge && p.badge !== '') || (p.oldPrice && p.oldPrice !== '');
        }
        return p.category.toLowerCase() === categoryName.toLowerCase();
    });

    // 2. SUB-FILTRO (Apenas visível em 'Todos' ou Busca)
    if ((categoryName === 'Todos' || isSearch) && subCategoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === subCategoryFilter);
    }

    // 3. ORDENAÇÃO
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getPrice = (priceStr: string) => {
            return parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.'));
        };

        switch (sortOption) {
            case 'price_asc':
                return getPrice(a.price) - getPrice(b.price);
            case 'price_desc':
                return getPrice(b.price) - getPrice(a.price);
            case 'name_asc':
                return a.name.localeCompare(b.name);
            case 'name_desc':
                return b.name.localeCompare(a.name);
            case 'cat_asc':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });

    return (
        <section className="section" style={{ paddingTop: '40px', minHeight: '600px' }}>
            <div className="container">
                <div className="section-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                    
                    {/* TÍTULO E CONTADOR */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                            <h2 className="section-title" style={{ marginBottom: '5px' }}>
                                {displayTitle}
                            </h2>
                            <span style={{ color: 'var(--text-gray)' }}>{sortedProducts.length} produtos encontrados</span>
                        </div>
                    </div>

                    {/* BARRA DE FERRAMENTAS */}
                    <div style={{ 
                        width: '100%', 
                        background: '#f8fbf9', 
                        padding: '15px', 
                        borderRadius: '12px', 
                        border: '1px solid #e5efe9',
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        {/* Dropdown de Subcategoria */}
                        {(categoryName === 'Todos' || isSearch) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Filtrar Categoria:</label>
                                <select 
                                    value={subCategoryFilter} 
                                    onChange={(e) => setSubCategoryFilter(e.target.value)}
                                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', cursor: 'pointer', minWidth: '150px' }}
                                >
                                    <option value="all">Todas</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Dropdown de Ordenação */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Ordenar por:</label>
                            <select 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.target.value)}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', cursor: 'pointer', minWidth: '150px' }}
                            >
                                <option value="default">Relevância</option>
                                <option value="price_asc">Menor Preço</option>
                                <option value="price_desc">Maior Preço</option>
                                <option value="name_asc">Nome (A-Z)</option>
                                <option value="name_desc">Nome (Z-A)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* GRADE DE PRODUTOS */}
                {sortedProducts.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                        gap: '30px',
                        marginTop: '20px'
                    }}>
                        {sortedProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onBuy={onBuy}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                        <i className="fas fa-search" style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }}></i>
                        <p>Nenhum produto encontrado para "{searchTerm}".</p>
                        <p style={{ fontSize: '0.9rem' }}>Tente usar palavras-chave mais simples como "ração", "brinquedo" ou "gato".</p>
                        <button 
                            onClick={() => onNavigate('home')}
                            style={{ 
                                marginTop: '20px', 
                                padding: '10px 25px', 
                                background: 'var(--primary)', 
                                border: 'none', 
                                color: 'white', 
                                borderRadius: '20px', 
                                cursor: 'pointer',
                                fontWeight: 700
                            }}
                        >
                            Voltar para Home
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;
