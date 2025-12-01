
import React from 'react';
import { urlFor } from '../services/sanity';

interface OurStorePageProps {
    onOpenWhatsApp: () => void;
}

const OurStorePage: React.FC<OurStorePageProps> = ({ onOpenWhatsApp }) => {
    return (
        <div className="section" style={{ backgroundColor: '#fff', minHeight: '80vh' }}>
            <div className="container">
                
                {/* CABEÇALHO DA PÁGINA */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ 
                        color: 'var(--accent)', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        fontSize: '0.9rem',
                        letterSpacing: '1px'
                    }}>
                        Desde 2010
                    </span>
                    <h2 className="section-title" style={{ marginTop: '10px' }}>Conheça Nossa Loja Física</h2>
                </div>

                {/* IMAGEM DA FACHADA (FULL WIDTH / DESTAQUE) */}
                <div style={{ 
                    width: '100%', 
                    marginBottom: '50px', 
                    borderRadius: 'var(--radius)', 
                    overflow: 'hidden', 
                    boxShadow: 'var(--shadow-hover)',
                    border: '1px solid #f0f0f0',
                    position: 'relative'
                }}>
                    {/* 
                        IMPORTANTE: 
                        1. Salve a imagem otimizada na pasta 'public' do seu projeto.
                        2. Nomeie como 'fachada-loja.jpg'.
                        3. Se estiver usando URL externa, substitua o src abaixo.
                    */}
                    <img 
                        src={urlFor("/fachada-loja.jpg")}
                        onError={(e) => {
                            // Fallback caso a imagem não exista localmente ainda
                            e.currentTarget.src = urlFor("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80");
                        }}
                        alt="Fachada Agropecuária Brasil" 
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            maxHeight: '500px', 
                            objectFit: 'cover', 
                            objectPosition: 'center' 
                        }}
                    />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        width: '100%', 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', 
                        padding: '40px 20px 20px',
                        color: 'white',
                        textAlign: 'right'
                    }}>
                        <p style={{ fontWeight: 700, fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', marginRight: '8px' }}></i>
                            Jardim Ricetti, São Carlos - SP
                        </p>
                    </div>
                </div>
                
                {/* CONTEÚDO HISTÓRIA E DIFERENCIAIS */}
                <div style={{ maxWidth: '900px', margin: '0 auto 60px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '25px', fontSize: '2rem', lineHeight: '1.2' }}>
                        Especialistas em fazer seu pet <br/><span style={{color: 'var(--accent)'}}>SUPER FELIZ</span>
                    </h3>
                    
                    <p style={{ marginBottom: '20px', color: '#555', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        Somos uma empresa apaixonada e especializada em oferecer o melhor para o seu animal. Estamos sempre prontos para atender você e seu bichinho com uma linha completa de brinquedos, as melhores rações, coleiras e diversos outros produtos selecionados com carinho.
                    </p>
                    <p style={{ marginBottom: '40px', color: '#555', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        Há <strong>mais de 10 anos no mercado</strong>, a Agropecuária Brasil é referência em São Carlos e região. Desde o início, nossa prioridade absoluta é garantir a satisfação do cliente e a alegria do seu pet através de um atendimento acolhedor e produtos de altíssima qualidade.
                    </p>

                    {/* ÍCONES DIFERENCIAIS */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E9F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem' }}>
                                <i className="fas fa-parking"></i>
                            </div>
                            <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Estacionamento Próprio</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E9F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem' }}>
                                <i className="fas fa-heart"></i>
                            </div>
                            <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Atendimento com Amor</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E9F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem' }}>
                                <i className="fas fa-certificate"></i>
                            </div>
                            <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Tradição e Qualidade</span>
                        </div>
                    </div>
                </div>

                {/* INFO BOX E MAPA */}
                <div style={{ background: '#F8FBF9', borderRadius: 'var(--radius)', padding: '50px', boxShadow: 'var(--shadow-card)', border: '1px solid #e0eadd' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
                        
                        {/* COLUNA INFORMAÇÕES */}
                        <div>
                             <h3 style={{ marginBottom: '30px', color: 'var(--text-dark)', fontSize: '1.8rem' }}>Venha nos visitar</h3>
                             
                             <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '5px' }}><i className="fas fa-map-marker-alt"></i></div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Endereço</h4>
                                    <p style={{ color: '#666' }}>
                                        Rua Major Manoel Antonio de Mattos, 567<br/>
                                        Jardim Ricetti, São Carlos - SP<br/>
                                        CEP: 13560-831
                                    </p>
                                </div>
                             </div>

                             <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '5px' }}><i className="fas fa-phone-alt"></i></div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Telefones</h4>
                                    <p style={{ color: '#666' }}>
                                        (16) 3372-4448<br/>
                                        (16) 3371-4849
                                    </p>
                                </div>
                             </div>

                             <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
                                <div style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '5px' }}><i className="fas fa-clock"></i></div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Horário de Atendimento</h4>
                                    <ul style={{ color: '#666', listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '5px' }}>Segunda a Sábado: 08:00 às 19:00</li>
                                        <li style={{ marginBottom: '5px' }}>Feriados: Até as 12:00</li>
                                        <li style={{ color: '#aaa' }}>Domingo: Fechado</li>
                                    </ul>
                                </div>
                             </div>

                             <button 
                                onClick={onOpenWhatsApp}
                                className="btn-primary" 
                                style={{ 
                                    textDecoration: 'none', 
                                    padding: '15px 35px', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Falar no WhatsApp
                            </button>
                        </div>
                        
                        {/* COLUNA MAPA */}
                        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '450px', border: '4px solid white', boxShadow: '0 5px 25px rgba(0,0,0,0.08)' }}>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.5562728258525!2d-47.8967!3d-22.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8773957555555%3A0x56f9905206336a18!2sR.%20Maj.%20Manoel%20Ant%C3%B4nio%20de%20Mattos%2C%20567%20-%20Jardim%20Ricetti%2C%20S%C3%A3o%20Carlos%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStorePage;
