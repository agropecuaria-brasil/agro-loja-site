
import React from 'react';

interface PrivacyPolicyPageProps {
    onNavigate: (view: string) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Política de Privacidade</span>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>Política de Privacidade</h1>
                    <p style={{ color: '#999', marginBottom: '40px', fontSize: '0.9rem' }}>Última atualização: 25 de Novembro de 2025</p>

                    <div style={{ lineHeight: '1.8', color: 'var(--text-dark)', fontSize: '1rem' }}>
                        
                        <p style={{ marginBottom: '20px' }}>
                            A <strong>Agropecuária Brasil</strong> ("nós", "nosso") leva a sua privacidade a sério. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
                        </p>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>1. Dados que Coletamos</h3>
                        <p style={{ marginBottom: '15px' }}>Coletamos informações pessoais que você nos fornece voluntariamente e dados de navegação coletados automaticamente:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Dados Pessoais Fornecidos:</strong> Nome, e-mail e número de telefone (WhatsApp). Estes dados são coletados quando você preenche nossos formulários de "Fale Conosco", "Iniciar Atendimento via WhatsApp" ou se inscreve em nossa "Newsletter".</li>
                            <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e origem do tráfego.</li>
                        </ul>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>2. Finalidade do Uso dos Dados</h3>
                        <p style={{ marginBottom: '15px' }}>Utilizamos seus dados para as seguintes finalidades:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Atendimento ao Cliente:</strong> Para processar seus pedidos via WhatsApp e responder a dúvidas.</li>
                            <li><strong>Marketing e Newsletter:</strong> Para enviar ofertas, novidades e promoções por e-mail, caso você tenha se cadastrado em nossa lista (base legal: Consentimento).</li>
                            <li><strong>Melhoria do Site:</strong> Para entender como os usuários utilizam nosso site e melhorar a experiência de navegação.</li>
                            <li><strong>Publicidade Personalizada:</strong> Para exibir anúncios relevantes para você em outras plataformas (como Google e Facebook/Instagram).</li>
                        </ul>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>3. Cookies e Tecnologias de Rastreamento</h3>
                        <p style={{ marginBottom: '15px' }}>
                            Utilizamos cookies e tecnologias similares para coletar dados de navegação. Especificamente, utilizamos as seguintes ferramentas de terceiros:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Google Tag Manager & Google Analytics 4 (GA4):</strong> Para análise estatística de tráfego e comportamento do usuário.</li>
                            <li><strong>Google Ads (Tags de Conversão):</strong> Para medir a eficácia de nossas campanhas publicitárias e conversões.</li>
                            <li><strong>Meta Pixel (Facebook/Instagram Ads):</strong> Para rastrear conversões e criar públicos personalizados para anúncios (Remarketing).</li>
                        </ul>
                        <p style={{ marginBottom: '15px', fontStyle: 'italic', fontSize: '0.9rem', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                            Você pode gerenciar suas preferências de cookies a qualquer momento clicando no link <strong>"Preferências de Cookies"</strong> no rodapé deste site.
                        </p>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>4. Compartilhamento de Dados</h3>
                        <p style={{ marginBottom: '15px' }}>
                            Não vendemos seus dados pessoais. Seus dados podem ser compartilhados apenas com:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li>Provedores de serviços essenciais (hospedagem do site, ferramentas de envio de e-mail).</li>
                            <li>Plataformas de publicidade (Google e Meta) de forma anonimizada ou criptografada (Hashed), estritamente para fins de publicidade direcionada.</li>
                            <li>Autoridades judiciais, se exigido por lei.</li>
                        </ul>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>5. Seus Direitos (LGPD)</h3>
                        <p style={{ marginBottom: '15px' }}>Você tem o direito de:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li>Confirmar a existência de tratamento de dados.</li>
                            <li>Acessar seus dados.</li>
                            <li>Corrigir dados incompletos ou desatualizados.</li>
                            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                            <li>Revogar seu consentimento para envio de Newsletter a qualquer momento (clicando em "descadastrar" no e-mail ou entrando em contato conosco).</li>
                        </ul>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>6. Segurança</h3>
                        <p style={{ marginBottom: '20px' }}>
                            Adotamos medidas técnicas e administrativas para proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas.
                        </p>

                        <h3 style={{ color: 'var(--primary)', marginTop: '30px', marginBottom: '15px' }}>7. Contato</h3>
                        <p style={{ marginBottom: '20px' }}>
                            Para exercer seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato conosco através do WhatsApp ou e-mail.
                        </p>

                        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                            <p><strong>Agropecuária Brasil</strong><br/>São Carlos - SP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
