
import React, { useState } from 'react';

// --- CONFIGURAÇÃO ---
// Siga o tutorial abaixo para gerar sua URL do Google Apps Script
// e cole ela dentro das aspas abaixo.
const GOOGLE_SCRIPT_URL = "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI"; 

interface NewsletterProps {
    onNavigate?: (view: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) return;

        // Se o usuário ainda não configurou a URL, mostramos um alerta visual (apenas desenvolvimento)
        if (GOOGLE_SCRIPT_URL === "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
            alert("Você precisa configurar a URL do Google Apps Script no código (components/Newsletter.tsx).");
            return;
        }

        setStatus('sending');

        try {
            // Criamos um FormData para enviar como se fosse um formulário HTML padrão
            const formData = new FormData();
            formData.append('type', 'newsletter'); // IDENTIFICADOR DA ABA
            formData.append('email', email);
            formData.append('created_at', new Date().toLocaleString('pt-BR'));

            // O Google Apps Script exige no-cors para funcionar simples via fetch de outro dominio
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            });

            // Como usamos 'no-cors', não temos resposta de status real, 
            // então assumimos sucesso se não der erro de rede.
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error("Erro ao enviar newsletter", error);
            setStatus('error');
        }
    };

    const handlePolicyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('privacy');
        }
    };

    return (
        <section style={{ backgroundColor: 'var(--primary)', padding: '60px 0', color: 'white', fontFamily: "'Open Sans', sans-serif" }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ 
                    fontFamily: "'Nunito', sans-serif", 
                    fontSize: '2rem', 
                    marginBottom: '30px', 
                    color: 'white',
                    fontWeight: 700
                }}>
                    Receba ofertas e descontos especiais
                </h2>
                
                {status === 'success' ? (
                    <div style={{ 
                        backgroundColor: '#E9F5EC', 
                        color: 'var(--primary)', 
                        padding: '20px', 
                        borderRadius: '12px', 
                        display: 'inline-block',
                        animation: 'fadeIn 0.5s'
                    }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '1.5rem', marginBottom: '10px' }}></i>
                        <p style={{ fontWeight: 700 }}>Cadastro realizado com sucesso!</p>
                        <p style={{ fontSize: '0.9rem' }}>Verifique sua caixa de entrada em breve.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            style={{ 
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            Cadastrar outro
                        </button>
                    </div>
                ) : (
                    <form 
                        onSubmit={handleSubmit}
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '15px', 
                            maxWidth: '700px', 
                            margin: '0 auto',
                            flexWrap: 'wrap'
                        }}
                    >
                        <input 
                            type="email" 
                            placeholder="Digite seu email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'sending'}
                            style={{
                                flex: 1,
                                minWidth: '280px',
                                padding: '15px 25px',
                                borderRadius: '30px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                color: '#333',
                                backgroundColor: status === 'sending' ? '#eee' : 'white'
                            }}
                        />
                        <button 
                            type="submit"
                            disabled={status === 'sending'}
                            style={{
                                backgroundColor: status === 'sending' ? '#ccc' : 'var(--accent)',
                                color: 'var(--text-dark)',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '15px 40px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                cursor: status === 'sending' ? 'wait' : 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onMouseOver={(e) => {
                                if (status !== 'sending') {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (status !== 'sending') {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                }
                            }}
                        >
                            {status === 'sending' ? (
                                <>Enviando...</>
                            ) : (
                                <>cadastrar</>
                            )}
                        </button>
                        {status === 'error' && (
                            <p style={{ width: '100%', color: '#ffcccc', marginTop: '10px' }}>
                                Ocorreu um erro ao cadastrar. Tente novamente.
                            </p>
                        )}
                    </form>
                )}
                
                {status !== 'success' && (
                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                        Ao se cadastrar você concorda com a nossa <a href="#" onClick={handlePolicyClick} style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 600 }}>política de privacidade</a>
                    </p>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
