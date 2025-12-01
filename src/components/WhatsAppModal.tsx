
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

// USE A MESMA URL DO GOOGLE SCRIPT DA NEWSLETTER
const GOOGLE_SCRIPT_URL = "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI"; 

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    whatsappNumber?: string;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, product, whatsappNumber }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'redirecting'>('idle');

    // Valor padrão de fallback caso a prop venha vazia
    const targetNumber = whatsappNumber || '5516999999999';

    useEffect(() => {
        if (!isOpen) {
            setFormData({ name: '', email: '', phone: '' });
            setStatus('idle');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        let whatsappMsg = "";
        const systemNote = "\n\n_(Não apague esta mensagem para o correto atendimento)_";

        if (product) {
            whatsappMsg = `Olá! Me chamo *${formData.name}*. Gostaria de saber mais sobre o produto: *${product.name}* (Cód: ${product.id}), que vi no site por *${product.price}*.${systemNote}`;
        } else {
            whatsappMsg = `Olá! Me chamo *${formData.name}*. Vim do site da Agropecuária Brasil e preciso de atendimento para cotação ou compra de um produto.${systemNote}`;
        }

        // --- ENVIAR PARA GOOGLE SHEETS (LEAD) ---
        if (GOOGLE_SCRIPT_URL !== "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
            try {
                const sheetData = new FormData();
                sheetData.append('type', 'whatsapp'); // IDENTIFICADOR DA ABA
                sheetData.append('name', formData.name);
                sheetData.append('email', formData.email);
                sheetData.append('phone', formData.phone);
                sheetData.append('product', product ? `${product.name} (ID: ${product.id})` : 'Geral');
                sheetData.append('message', whatsappMsg);
                
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: sheetData,
                    mode: 'no-cors'
                });
            } catch (error) {
                console.error("Erro ao salvar lead", error);
                // Não impedimos o redirecionamento se der erro no sheet
            }
        }

        const finalWhatsappLink = `https://wa.me/${targetNumber}?text=${encodeURIComponent(whatsappMsg)}`;

        setStatus('redirecting');
        
        // Pequeno delay visual
        setTimeout(() => {
            window.open(finalWhatsappLink, '_blank');
            setTimeout(() => {
                onClose();
            }, 1000);
        }, 1000);
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                <span className="modal-close" onClick={onClose}>&times;</span>
                <h3 className="modal-title">
                    <i className="fab fa-whatsapp" style={{ color: 'var(--whatsapp-color)' }}></i> Fale Conosco
                </h3>
                <p style={{ textAlign: 'center', marginBottom: '15px', color: '#666', fontSize: '0.95rem' }}>
                    Preencha seus dados para iniciar o atendimento.
                </p>
                
                {product && (
                    <div className="modal-product-summary" style={{ display: 'block' }}>
                        Interesse em: <strong><span>{product.name}</span></strong><br/>
                        Cód: <span>{product.id}</span> | Preço: <span>{product.price}</span>
                    </div>
                )}
                
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome Completo *</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Seu nome" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail *</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="seu@email.com" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone/WhatsApp *</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder="(DDD) 99999-9999" 
                            required 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn-submit-whatsapp" 
                        disabled={status !== 'idle'}
                        style={status === 'redirecting' ? { backgroundColor: '#1da851' } : {}}
                    >
                        {status === 'idle' && <><i className="fab fa-whatsapp"></i> Iniciar Atendimento</>}
                        {status === 'sending' && <><i className="fas fa-spinner fa-spin"></i> Salvando...</>}
                        {status === 'redirecting' && <><i className="fab fa-whatsapp"></i> Abrindo WhatsApp...</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppModal;
