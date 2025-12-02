
import { ALL_PRODUCTS, SLIDES, ALL_CATEGORIES, BRANDS, PROMO_BANNERS, LOGO_URL, DEFAULT_TOP_BAR_TEXT, DEFAULT_TOP_BAR_ICON, DEFAULT_FOOTER_TEXT, STORE_WHATSAPP_NUMBER, INSTAGRAM_LINK, FACEBOOK_LINK, DEFAULT_GTM_ID } from '../constants';
import { Product, Slide, CategoryItem, Brand, PromoBanner, SiteConfig } from '../types';
import { createClient } from '@sanity/client';

// --- CONFIGURAÇÃO DO SANITY (HEADLESS CMS) ---
// 1. Crie sua conta em https://www.sanity.io/ (Plano Free)
// 2. Crie um projeto novo
// 3. Vá em "API" no painel do Sanity e adicione "http://localhost:3000" (e seu site final) em "CORS Origins"
// 4. Copie o "Project ID" e cole abaixo.

const SANITY_CONFIG = {
    projectId: '2a6px1mz', // <--- COLE SEU ID REAL AQUI. (Valor temporário válido para evitar erro de crash)
    dataset: 'production',
    useCdn: true, // true para site rápido (cache), false para dados sempre frescos
    apiVersion: '2023-05-03', 
};

// O Cliente que conecta ao banco de dados
export const client = createClient(SANITY_CONFIG);

// --- OTIMIZADOR DE IMAGENS AUTOMÁTICO (WebP / AVIF) ---
// Use esta função em volta de qualquer URL de imagem no front-end
export const urlFor = (source: string | undefined): string => {
    if (!source) return '';

    // 1. Otimização para Sanity (CDN)
    // Adiciona ?auto=format para entregar WebP/AVIF dependendo do navegador
    if (source.includes('cdn.sanity.io')) {
        // Se já tiver parâmetros, adiciona com &, senão com ?
        return source.includes('?') ? `${source}&auto=format` : `${source}?auto=format`;
    }

    // 2. Otimização para Unsplash (Mock Data atual)
    if (source.includes('unsplash.com')) {
        // q=80: Qualidade 80% (bom balanço)
        // fm=webp: Força formato WebP
        const separator = source.includes('?') ? '&' : '?';
        return `${source}${separator}fm=webp&q=80`;
    }

    // Retorna original se não for um serviço conhecido
    return source;
};

// --- CAMADA DE SERVIÇO (PONTE DE DADOS) ---
// Agora o site tentará buscar do Sanity. Se falhar (por falta de dados lá),
// usa o fallback dos arquivos locais.

export const api = {
    
    // Busca configurações gerais (Logo, Texto Topo, Contatos)
    getSiteConfig: async (): Promise<SiteConfig> => {
        try {
            const query = `*[_type == "siteSettings"][0]{ 
               "logoUrl": logo.asset->url,
               "topBarText": topBarText,
               "topBarIcon": topBarIcon,
               "footerText": footerText,
               "whatsappNumber": whatsappNumber,
               "instagramUrl": instagramUrl,
               "facebookUrl": facebookUrl,
               "gtmId": gtmId
            }`;
            const data = await client.fetch(query);
            if (data) return data;
        } catch (e) {
            console.warn("Sanity Config not found, using fallback.");
        }

        return { 
            logoUrl: LOGO_URL,
            topBarText: DEFAULT_TOP_BAR_TEXT,
            topBarIcon: DEFAULT_TOP_BAR_ICON,
            footerText: DEFAULT_FOOTER_TEXT,
            whatsappNumber: STORE_WHATSAPP_NUMBER,
            instagramUrl: INSTAGRAM_LINK,
            facebookUrl: FACEBOOK_LINK,
            gtmId: DEFAULT_GTM_ID
        };
    },

    // Busca todos os produtos (incluindo tags)
    getProducts: async (): Promise<Product[]> => {
        try {
            const query = `*[_type == "product"]{
               name,
               "id": _id,
               price,
               oldPrice,
               "image": image.asset->url,
               "gallery": gallery[].asset->url,
               category,
               badge,
               badgeColor,
               description,
               specifications,
               tags
            }`;
            const data = await client.fetch(query);
            if (data && data.length > 0) return data;
        } catch (e) {
            console.warn("Sanity Products not found, using fallback.");
        }
        
        return ALL_PRODUCTS;
    },

    // Busca banners da Home
    getSlides: async (): Promise<Slide[]> => {
        try {
            const query = `*[_type == "banner"] | order(_createdAt asc) {
               "id": _id,
               title,
               tag,
               description,
               "image": image.asset->url,
               cta,
               categoryLink,
               background
            }`;
            const data = await client.fetch(query);
            // Mapeamento simples para garantir compatibilidade de estilos se necessário
            if (data && data.length > 0) {
                return data.map((slide: any) => ({
                    ...slide,
                    tagStyle: { background: 'var(--accent)', color: 'var(--text-dark)' }, // Estilo padrão se não vier do CMS
                    titleStyle: {},
                    ctaStyle: {}
                }));
            }
        } catch (e) {
            console.warn("Sanity Slides not found, using fallback.");
        }

        return SLIDES;
    },

    // Busca categorias (filtrando as inativas)
    getCategories: async (): Promise<CategoryItem[]> => {
        try {
            const query = `*[_type == "category" && isActive == true]{
                "id": _id,
                name,
                icon,
                isActive
            }`;
            const data = await client.fetch(query);
            if (data && data.length > 0) return data;
        } catch (e) {
            console.warn("Sanity Categories not found, using fallback.");
        }

        return ALL_CATEGORIES.filter(cat => cat.isActive !== false);
    },

    // Busca banners promocionais
    getPromoBanners: async (): Promise<PromoBanner[]> => {
        try {
            const query = `*[_type == "promoBanner"]{
               title,
               description,
               cta,
               linkCategory,
               "image": image.asset->url,
               styleClass,
               imgClass
            }`;
            const data = await client.fetch(query);
            if (data && data.length > 0) return data;
        } catch (e) {
            console.warn("Sanity Promo Banners not found, using fallback.");
        }

        return PROMO_BANNERS;
    },

    // Busca marcas parceiras
    getBrands: async (): Promise<Brand[]> => {
        try {
            const query = `*[_type == "brand"]{
               name,
               "image": image.asset->url
            }`;
            const data = await client.fetch(query);
            if (data && data.length > 0) return data;
        } catch (e) {
            console.warn("Sanity Brands not found, using fallback.");
        }

        return BRANDS;
    }
};
