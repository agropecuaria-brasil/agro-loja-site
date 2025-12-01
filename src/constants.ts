
import { NavItem, Product, Slide, Brand, CategoryItem, PromoBanner } from './types';
import React from 'react';

// --- CONFIGURAÇÕES DE CONTATO E REDES SOCIAIS ---
// EDITE AQUI O TELEFONE DO WHATSAPP (Apenas números, com DDD e código do país 55)
// Este número será utilizado:
// 1. No botão "Iniciar Atendimento" DENTRO do Modal (aberto pelos botões de compra/flutuante)
// 2. No link direto do ícone do WhatsApp no Rodapé
export const STORE_WHATSAPP_NUMBER = "5516999999999";

// EDITE AQUI OS LINKS DAS REDES SOCIAIS
export const INSTAGRAM_LINK = "https://instagram.com/agropecuariabrasil";
export const FACEBOOK_LINK = "https://facebook.com/agropecuariabrasil";

// --- LOGO CONFIGURATION ---
// Deixe vazio para usar o logo em texto padrão.
// Para usar imagem, coloque o link ex: "https://meusite.com/logo.png"
export const LOGO_URL = ""; 

// --- GOOGLE TAG MANAGER ---
// Deixe vazio se for usar via Sanity
export const DEFAULT_GTM_ID = "";

// --- TOP BAR CONFIGURATION ---
export const DEFAULT_TOP_BAR_TEXT = "Quarta Animal: Toda Quarta-feira 10% de desconto na Loja Física";
export const DEFAULT_TOP_BAR_ICON = "fas fa-shopping-cart";

// --- FOOTER CONFIGURATION ---
export const DEFAULT_FOOTER_TEXT = "Seu pet shop online favorito. Trazendo alegria e saúde para quem você mais ama desde 2010.";

export const NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '#', active: true, icon: 'fas fa-home', action: 'home', isActive: true },
    { label: 'Cães', href: '#', action: 'category', categoryName: 'Cães', isActive: true },
    { label: 'Gatos', href: '#', action: 'category', categoryName: 'Gatos', isActive: true },
    { label: 'Pássaros', href: '#', action: 'category', categoryName: 'Pássaros', isActive: true },
    { label: 'Peixes', href: '#', action: 'category', categoryName: 'Peixes', isActive: true },
    { label: 'Medicamentos', href: '#', action: 'category', categoryName: 'Medicamentos', isActive: true },
    { label: 'Ofertas', href: '#', highlight: true, action: 'category', categoryName: 'Ofertas', isActive: true },
    { 
        label: 'Todas as Categorias', 
        href: '#',
        highlight: true,
        icon: 'fas fa-th-large',
        action: 'modal_categories',
        isActive: true
    },
    { 
        label: 'Todos os Produtos', 
        href: '#',
        highlight: true,
        icon: 'fas fa-boxes',
        action: 'category',
        categoryName: 'Todos',
        isActive: true
    }
];

export const ALL_CATEGORIES: CategoryItem[] = [
    { id: 1, name: 'Cães', icon: 'fas fa-dog', isActive: true },
    { id: 2, name: 'Gatos', icon: 'fas fa-cat', isActive: true },
    { id: 3, name: 'Pássaros', icon: 'fas fa-dove', isActive: true },
    { id: 4, name: 'Peixes', icon: 'fas fa-fish', isActive: true },
    { id: 5, name: 'Répteis', icon: 'fas fa-frog', isActive: true },
    { id: 6, name: 'Roedores', icon: 'fas fa-carrot', isActive: true },
    { id: 7, name: 'Medicamentos', icon: 'fas fa-briefcase-medical', isActive: true },
    { id: 8, name: 'Higiene', icon: 'fas fa-pump-soap', isActive: true },
    { id: 9, name: 'Acessórios', icon: 'fas fa-gem', isActive: true },
    { id: 10, name: 'Brinquedos', icon: 'fas fa-baseball-ball', isActive: true },
    { id: 11, name: 'Petiscos', icon: 'fas fa-cookie-bite', isActive: true },
    { id: 12, name: 'Roupas', icon: 'fas fa-tshirt', isActive: true },
    { id: 13, name: 'Caminhas', icon: 'fas fa-bed', isActive: true },
    { id: 14, name: 'Dedetização', icon: 'fas fa-bug', isActive: true },
    { id: 15, name: 'Outros', icon: 'fas fa-plus', isActive: true },
];

export const SLIDES: Slide[] = [
    {
        id: 1,
        tag: "Cães",
        tagStyle: { background: 'var(--accent)', color: 'var(--text-dark)' },
        title: React.createElement(React.Fragment, null, "Diversão Garantida", React.createElement("br"), "para o seu ", React.createElement("span", null, "Melhor Amigo")),
        titleStyle: {},
        highlightStyle: { color: 'var(--accent)' },
        description: "Confira nossa nova linha de brinquedos interativos. Resistência e alegria para cães de todos os portes.",
        cta: "Ver Coleção",
        ctaStyle: {},
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        background: "linear-gradient(135deg, #d9f0e1 0%, #f7edcc 100%)",
        categoryLink: "Cães"
    },
    {
        id: 2,
        tag: "Gatos",
        tagStyle: { background: '#9C27B0', color: 'white' },
        title: React.createElement(React.Fragment, null, "Tudo o que seu", React.createElement("br"), React.createElement("span", null, "Felino Adora")),
        titleStyle: { color: '#6A1B9A' },
        highlightStyle: { color: '#AD1457' },
        description: "Arranhadores, caminhas e petiscos deliciosos. O conforto e a diversão que seu gato merece.",
        cta: "Ver Tudo para Gatos",
        ctaStyle: { backgroundColor: '#9C27B0' },
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        background: "linear-gradient(135deg, #E3F2FD 0%, #FCE4EC 100%)",
        imagePosition: "top center",
        categoryLink: "Gatos"
    },
    {
        id: 3,
        tag: "Peixes",
        tagStyle: { background: '#00BCD4', color: 'white' },
        title: React.createElement(React.Fragment, null, "Mundo Subaquático", React.createElement("br"), React.createElement("span", null, "Incrível")),
        titleStyle: { color: '#006064' },
        highlightStyle: { color: '#0097A7' },
        description: "Aquários, filtros, decorações e rações premium para a saúde e beleza dos seus peixes.",
        cta: "Explorar Aquarismo",
        ctaStyle: { backgroundColor: '#00BCD4' },
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)",
        categoryLink: "Peixes"
    },
    {
        id: 4,
        tag: "Roedores",
        tagStyle: { background: '#FBC02D', color: '#3E2723' },
        title: React.createElement(React.Fragment, null, "Pequenos Amigos,", React.createElement("br"), React.createElement("span", null, "Grandes Cuidados")),
        titleStyle: { color: '#3E2723' },
        highlightStyle: { color: '#F57F17' },
        description: "Gaiolas espaçosas, feno fresquinho e acessórios divertidos para hamsters, coelhos e porquinhos.",
        cta: "Ver para Roedores",
        ctaStyle: { backgroundColor: '#FBC02D', color: '#3E2723' },
        image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        background: "linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 100%)",
        categoryLink: "Roedores"
    },
    {
        id: 5,
        tag: "Medicamentos",
        tagStyle: { background: '#4CAF50', color: 'white' },
        title: React.createElement(React.Fragment, null, "Saúde e Bem-estar", React.createElement("br"), React.createElement("span", null, "em Dia")),
        titleStyle: { color: '#1B5E20' },
        highlightStyle: { color: '#388E3C' },
        description: "Encontre os melhores medicamentos, antipulgas e suplementos com a orientação que você confia.",
        cta: "Acessar Medicamentos",
        ctaStyle: { backgroundColor: '#4CAF50' },
        image: "https://images.unsplash.com/photo-1584036531529-29ed8ce76231?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
        imagePosition: "center top",
        categoryLink: "Medicamentos"
    }
];

// Generic placeholder texts to populate details
const LOREM_DESC = "Este produto foi desenvolvido pensando no bem-estar e na saúde do seu animal de estimação. Feito com materiais de alta qualidade, garante durabilidade e segurança. Ideal para o dia a dia, proporcionando conforto e praticidade para você e seu pet. Produto testado e aprovado por especialistas.";

const GENERIC_SPECS = [
    { label: "Indicação", value: "Cães e Gatos" },
    { label: "Porte", value: "Pequeno, Médio e Grande" },
    { label: "Idade", value: "Filhotes, Adultos e Idosos" },
    { label: "Material", value: "Alta Resistência" },
    { label: "Garantia", value: "3 meses contra defeitos de fabricação" }
];

export const ALL_PRODUCTS: Product[] = [
    // OFERTAS / DESTAQUES
    {
        id: "MOC001",
        name: "Mochila de Transporte Pet View",
        price: "R$ 149,90",
        oldPrice: "R$ 179,00",
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Cães",
        badge: "-15%",
        description: "A Mochila de Transporte Pet View é a solução perfeita para levar seu melhor amigo em aventuras! Com design panorâmico, permite que seu pet observe tudo ao redor sem estresse. Possui ventilação adequada através de orifícios laterais e rede, garantindo ar fresco o tempo todo.",
        specifications: [
            { label: "Indicação", value: "Cães e Gatos até 6kg" },
            { label: "Material", value: "PC, Tecido Oxford, Acrílico" },
            { label: "Dimensões", value: "42cm x 32cm x 25cm" },
            { label: "Peso", value: "1.2kg" },
            { label: "Cores", value: "Cinza, Rosa, Preto" }
        ],
        tags: ["viagem", "transporte", "passeio", "gato", "cachorro", "bolsa"]
    },
    {
        id: "BRINQ023",
        name: "Corda Interativa Bola Tênis",
        price: "R$ 26,46",
        image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Brinquedos",
        description: "Brinquedo clássico e irresistível! A combinação de corda resistente com bola de tênis proporciona horas de diversão, auxiliando na limpeza dos dentes e gastando energia do seu cão.",
        specifications: [
            { label: "Material", value: "Algodão e Borracha" },
            { label: "Tamanho", value: "35cm de comprimento" },
            { label: "Indicação", value: "Cães de médio e grande porte" }
        ],
        tags: ["morder", "destruir", "dentes", "energia", "bola"]
    },
    {
        id: "TAP055",
        name: "Tapete Gelado Refrescante M",
        price: "R$ 64,80",
        image: "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Conforto",
        description: "O Tapete Gelado funciona por pressão, ativando o gel interno que resfria gradualmente a temperatura corporal do seu pet. Não precisa de eletricidade, refrigeração ou água. Ideal para os dias quentes!",
        specifications: GENERIC_SPECS,
        tags: ["verão", "calor", "refrescar", "cama", "gel", "dormir"]
    },
    {
        id: "GATO099",
        name: "Kit Ratinhos de Pelúcia",
        price: "R$ 18,58",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa2a740a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Gatos",
        badge: "Novo",
        badgeColor: "var(--primary)",
        description: "Conjunto com 3 ratinhos de pelúcia com catnip (erva de gato) no interior. Desperta o instinto caçador do seu felino, promovendo exercício e diversão.",
        specifications: [
            { label: "Contém", value: "3 unidades" },
            { label: "Material", value: "Pelúcia e Catnip" },
            { label: "Tamanho", value: "5cm cada" }
        ],
        tags: ["brinquedo", "catnip", "erva", "caçar", "diversão"]
    },
    {
        id: "AVE012",
        name: "Ração Nutrópica Calopsita 5kg",
        price: "R$ 89,90",
        image: "https://via.placeholder.com/300?text=Racao+Calopsita",
        category: "Pássaros",
        description: LOREM_DESC,
        specifications: GENERIC_SPECS,
        tags: ["comida", "alimento", "fome", "sementes", "ave"]
    },

    // CÃES
    { id: "C01", name: "Ração Premium Carne 15kg", price: "R$ 189,90", image: "https://via.placeholder.com/500?text=Racao+Caes", category: "Cães", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["comida", "alimento", "fome", "jantar"] },
    { id: "C02", name: "Coleira Peitoral Ajustável", price: "R$ 45,00", image: "https://via.placeholder.com/500?text=Coleira", category: "Cães", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["passeio", "rua", "segurança", "guia"] },
    { id: "C03", name: "Bolinha Maciça Indestrutível", price: "R$ 19,90", image: "https://via.placeholder.com/500?text=Bolinha", category: "Cães", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["brinquedo", "morder", "forte", "duravel"] },
    { id: "C04", name: "Cama Nuvem Confort G", price: "R$ 120,00", image: "https://via.placeholder.com/500?text=Cama+Pet", category: "Cães", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["dormir", "sono", "conforto", "almofada"] },
    
    // GATOS
    { id: "G01", name: "Arranhador Torre 3 Andares", price: "R$ 210,00", image: "https://via.placeholder.com/500?text=Arranhador", category: "Gatos", description: "Arranhador completo com casinha, plataformas e brinquedos suspensos. Proteja seus móveis e faça seu gato feliz.", specifications: GENERIC_SPECS, tags: ["unha", "brinquedo", "subir", "moveis"] },
    { id: "G02", name: "Areia Higiênica Sílica 1.8kg", price: "R$ 35,90", image: "https://via.placeholder.com/500?text=Areia+Gato", category: "Gatos", description: "Alta absorção e controle total de odores. A areia de sílica é prática e dura muito mais.", specifications: GENERIC_SPECS, tags: ["banheiro", "xixi", "limpeza", "odor"] },
    { id: "G03", name: "Fonte Bebedouro Elétrica", price: "R$ 159,90", image: "https://via.placeholder.com/500?text=Fonte+Agua", category: "Gatos", description: "Água corrente estimula seu gato a beber mais, prevenindo problemas renais. Filtro de carvão ativado incluso.", specifications: GENERIC_SPECS, tags: ["agua", "beber", "sede", "rim"] },
    { id: "G04", name: "Sachê Whiskas Carne", price: "R$ 3,50", image: "https://via.placeholder.com/500?text=Sache", category: "Gatos", description: "Deliciosos pedaços ao molho, refeição completa e balanceada.", specifications: GENERIC_SPECS, tags: ["comida", "úmida", "patê", "petisco"] },

    // MEDICAMENTOS
    { id: "M01", name: "Antipulgas Simparic 10kg", price: "R$ 95,00", image: "https://via.placeholder.com/500?text=Simparic", category: "Medicamentos", description: "Simparic elimina carrapatos, pulgas e sarnas. Proteção por até 35 dias.", specifications: GENERIC_SPECS, tags: ["coceira", "carrapato", "pulga", "remedio"] },
    { id: "M02", name: "Vermífugo Drontal Plus", price: "R$ 42,00", image: "https://via.placeholder.com/500?text=Drontal", category: "Medicamentos", description: "Elimina os vermes intestinais dos cães. Dose única.", specifications: GENERIC_SPECS, tags: ["verme", "barriga", "remedio"] },
    { id: "M03", name: "Suplemento Vitamínico Pet", price: "R$ 55,00", image: "https://via.placeholder.com/500?text=Vitamina", category: "Medicamentos", description: "Complexo vitamínico para fases de crescimento ou idosos.", specifications: GENERIC_SPECS, tags: ["forte", "saude", "energia"] },
    { id: "M04", name: "Shampoo Dermatológico", price: "R$ 68,90", image: "https://via.placeholder.com/500?text=Shampoo", category: "Medicamentos", description: "Para peles sensíveis e tratamento de dermatites.", specifications: GENERIC_SPECS, tags: ["banho", "pele", "alergia", "coceira"] },

    // PÁSSAROS
    { id: "P01", name: "Gaiola Grande Luxo", price: "R$ 250,00", image: "https://via.placeholder.com/500?text=Gaiola", category: "Pássaros", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["casa", "viveiro"] },
    { id: "P02", name: "Bebedouro Automático Aves", price: "R$ 12,00", image: "https://via.placeholder.com/500?text=Bebedouro", category: "Pássaros", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["agua", "beber"] },
    
    // PEIXES
    { id: "F01", name: "Aquário 20 Litros Vidro Curvo", price: "R$ 320,00", image: "https://via.placeholder.com/500?text=Aquario", category: "Peixes", description: "Design moderno com vidro curvo sem emendas frontais. Ideal para iniciantes.", specifications: GENERIC_SPECS, tags: ["casa", "tanque", "agua"] },
    { id: "F02", name: "Filtro Externo Hang-on", price: "R$ 85,00", image: "https://via.placeholder.com/500?text=Filtro", category: "Peixes", description: "Filtragem mecânica, química e biológica. Silencioso e eficiente.", specifications: GENERIC_SPECS, tags: ["limpeza", "bomba"] },
    { id: "F03", name: "Ração TetraMin Tropical", price: "R$ 45,00", image: "https://via.placeholder.com/500?text=Racao+Peixe", category: "Peixes", description: "Alimento em flocos para peixes tropicais. Realça as cores naturais.", specifications: GENERIC_SPECS, tags: ["comida", "fome"] },

    // ROEDORES
    { id: "R01", name: "Feno Coast Cross 500g", price: "R$ 25,00", image: "https://via.placeholder.com/500?text=Feno", category: "Roedores", description: "Essencial para o desgaste dentário e saúde digestiva de coelhos e porquinhos da índia.", specifications: GENERIC_SPECS, tags: ["comida", "dente", "coelho"] },
    { id: "R02", name: "Hamster Ball Acrílico", price: "R$ 35,00", image: "https://via.placeholder.com/500?text=Hamster+Ball", category: "Roedores", description: "Exercício seguro pela casa. Plástico atóxico e resistente.", specifications: GENERIC_SPECS, tags: ["brinquedo", "correr", "exercicio"] },
    
    // BRINQUEDOS (Extra)
    { id: "B01", name: "Frango de Borracha Sonoro", price: "R$ 15,00", image: "https://via.placeholder.com/500?text=Frango", category: "Brinquedos", description: LOREM_DESC, specifications: GENERIC_SPECS, tags: ["barulho", "apito", "morder"] },
    { id: "B02", name: "Kong Classic M", price: "R$ 89,00", image: "https://via.placeholder.com/500?text=Kong", category: "Brinquedos", description: "O melhor brinquedo para enriquecimento ambiental. Pode ser recheado.", specifications: GENERIC_SPECS, tags: ["recheavel", "comida", "inteligencia", "ansiedade"] },
];

// Helper to filter featured products
export const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 5);

export const PROMO_BANNERS: PromoBanner[] = [
    {
        title: "Ofertas de Final de Ano",
        description: "Garanta o presente do seu melhor amigo com preços especiais!",
        cta: "Confira",
        linkCategory: "Ofertas",
        styleClass: "banner-left",
        imgClass: "animal-art",
        image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Saúde e Bem-estar",
        description: "Cuidando de quem você ama com os melhores medicamentos e carinho.",
        cta: "Ver Medicamentos",
        linkCategory: "Medicamentos",
        styleClass: "banner-right",
        imgClass: "vet-art",
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=500&q=80"
    }
];

export const BRANDS: Brand[] = [
    { name: "Premier", image: "https://via.placeholder.com/150x80?text=Premier" },
    { name: "Pedigree", image: "https://via.placeholder.com/150x80?text=Pedigree" },
    { name: "Royal Canin", image: "https://via.placeholder.com/150x80?text=Royal+Canin" },
    { name: "Hills", image: "https://via.placeholder.com/150x80?text=Hills" },
    { name: "Whiskas", image: "https://via.placeholder.com/150x80?text=Whiskas" },
    { name: "Guabi Natural", image: "https://via.placeholder.com/150x80?text=Guabi+Natural" },
    { name: "Special Dog", image: "https://via.placeholder.com/150x80?text=Special+Dog" },
    { name: "Golden", image: "https://via.placeholder.com/150x80?text=Golden" },
    { name: "N&D", image: "https://via.placeholder.com/150x80?text=N%26D" },
    { name: "Friskies", image: "https://via.placeholder.com/150x80?text=Friskies" },
];
