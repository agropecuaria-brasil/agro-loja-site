
import React from 'react';
import { CategoryItem } from '../types';

interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCategory: (name: string) => void;
    categories: CategoryItem[];
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose, onSelectCategory, categories }) => {
    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box large">
                <span className="modal-close" onClick={onClose}>&times;</span>
                <h3 className="modal-title">
                    <i className="fas fa-th-large" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                    Todas as Categorias
                </h3>
                <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '0.95rem' }}>
                    Encontre tudo o que você precisa para o seu pet.
                </p>
                
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id} 
                            className="cat-card" 
                            onClick={() => {
                                onSelectCategory(cat.name);
                                onClose();
                            }}
                        >
                            <div className="cat-icon">
                                <i className={cat.icon}></i>
                            </div>
                            <div className="cat-name">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesModal;
