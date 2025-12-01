
import React, { useEffect } from 'react';

interface GoogleTagManagerProps {
    gtmId?: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
    useEffect(() => {
        if (!gtmId) return;

        // Verifica se já foi injetado para evitar duplicação
        if (document.getElementById('gtm-script')) return;

        // 1. Injetar Script no HEAD
        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        
        // Código de inicialização do dataLayer
        const initScript = document.createElement('script');
        initScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
        `;
        
        document.head.appendChild(initScript);

        // 2. Injetar NoScript no BODY (Para navegadores sem JS)
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        
        noscript.appendChild(iframe);
        document.body.insertBefore(noscript, document.body.firstChild);

    }, [gtmId]);

    return null; // Este componente não renderiza nada visualmente
};

export default GoogleTagManager;
