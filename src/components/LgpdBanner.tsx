
import React, { useState, useEffect } from 'react';

// Extensão para o TypeScript reconhecer o dataLayer do Google
declare global {
    interface Window {
        dataLayer: any[];
    }
}

interface LgpdBannerProps {
    onNavigate: (view: string) => void;
    forceOpenSettings?: boolean;
    onCloseSettings?: () => void;
}

const LgpdBanner: React.FC<LgpdBannerProps> = ({ onNavigate, forceOpenSettings, onCloseSettings }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    // Estado das preferências
    const [preferences, setPreferences] = useState({
        necessary: true, // Sempre true
        analytics: true,
        marketing: true
    });

    // Função para enviar dados ao GTM
    const pushToDataLayer = (prefs: typeof preferences) => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                'event': 'consent_update',
                'consent_analytics': prefs.analytics ? 'granted' : 'denied',
                'consent_marketing': prefs.marketing ? 'granted' : 'denied'
            });
            console.log("LGPD Consent Sent to GTM:", prefs);
        }
    };

    useEffect(() => {
        // Verifica se já existe consentimento salvo
        const consent = localStorage.getItem('lgpd_consent');
        if (!consent) {
            setShowBanner(true);
            // Define padrão inicial como 'denied' no GTM até o usuário aceitar
            // (Isso depende da sua configuração de GTM, mas é boa prática)
        } else {
            // Se já existe, carrega as preferências salvas
            try {
                const savedPrefs = JSON.parse(consent);
                setPreferences(savedPrefs);
                // Reforça o envio para o GTM a cada carregamento de página
                pushToDataLayer(savedPrefs);
            } catch (e) {
                setShowBanner(true);
            }
        }
    }, []);

    // Efeito para abrir configurações quando clicado no rodapé
    useEffect(() => {
        if (forceOpenSettings) {
            setShowSettings(true);
        }
    }, [forceOpenSettings]);

    const savePreferences = (newPrefs: typeof preferences) => {
        // 1. Salva no navegador do usuário (Memória Local)
        localStorage.setItem('lgpd_consent', JSON.stringify(newPrefs));
        
        // 2. Envia para o Google Tag Manager
        pushToDataLayer(newPrefs);
        
        setShowBanner(false);
        setShowSettings(false);
        if (onCloseSettings) onCloseSettings();
    };

    const handleAcceptAll = () => {
        const allTrue = { necessary: true, analytics: true, marketing: true };
        setPreferences(allTrue);
        savePreferences(allTrue);
    };

    const handleSaveSettings = () => {
        savePreferences(preferences);
    };

    const handlePolicyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate('privacy');
        if (showSettings) setShowSettings(false); // Fecha o modal se for navegar
    };

    // Renderiza o Modal de Configurações
    if (showSettings) {
        return (
            <div className="modal-overlay active" style={{ zIndex: 10000 }}>
                <div className="modal-box" style={{ maxWidth: '600px' }}>
                    <span className="modal-close" onClick={() => {
                        setShowSettings(false);
                        if(onCloseSettings) onCloseSettings();
                    }}>&times;</span>
                    
                    <h3 className="modal-title">Preferências de Cookies</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                        Gerencie suas preferências de privacidade. Cookies necessários são essenciais para o funcionamento do site.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                        
                        {/* NECESSÁRIOS */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--primary)' }}>Necessários</strong>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>Funcionamento básico do site.</span>
                            </div>
                            <input type="checkbox" checked disabled style={{ width: '20px', height: '20px' }} />
                        </div>

                        {/* ANALYTICS */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'white', border: '1px solid #eee', borderRadius: '8px' }}>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Analíticos (GA4)</strong>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>Nos ajuda a melhorar o site.</span>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={preferences.analytics} 
                                onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }} 
                            />
                        </div>

                        {/* MARKETING */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'white', border: '1px solid #eee', borderRadius: '8px' }}>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Marketing (Ads)</strong>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>Para anúncios personalizados.</span>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={preferences.marketing} 
                                onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }} 
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                         <button 
                            onClick={handleAcceptAll}
                            style={{ 
                                padding: '10px 20px', 
                                background: 'transparent', 
                                border: '1px solid var(--primary)', 
                                color: 'var(--primary)', 
                                borderRadius: '8px', 
                                fontWeight: 700, 
                                cursor: 'pointer' 
                            }}
                        >
                            Aceitar Todos
                        </button>
                        <button 
                            onClick={handleSaveSettings}
                            className="btn-primary"
                            style={{ padding: '10px 25px', borderRadius: '8px', border: 'none' }}
                        >
                            Salvar Preferências
                        </button>
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <a href="#" onClick={handlePolicyClick} style={{ fontSize: '0.8rem', textDecoration: 'underline', color: '#999' }}>Ler Política de Privacidade</a>
                    </div>
                </div>
            </div>
        );
    }

    if (!showBanner) return null;

    return (
        <div className="lgpd-banner">
            <div className="lgpd-content">
                <p>
                    Nós utilizamos cookies para melhorar sua experiência. Você pode personalizar o uso de cookies a qualquer momento.
                    <br/><a href="#" onClick={handlePolicyClick}>Política de Privacidade</a>
                </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <button 
                    onClick={() => setShowSettings(true)}
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: '#777', // Cor cinza discreta
                        fontSize: '0.8rem', // Fonte menor
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: '5px'
                    }}
                >
                    Configurar
                </button>
                <button className="lgpd-btn" onClick={handleAcceptAll}>
                    Aceitar Todos
                </button>
            </div>
        </div>
    );
};

export default LgpdBanner;
