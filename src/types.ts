
import React from 'react';

export interface Product {
    id: string;
    name: string;
    price: string;
    oldPrice?: string;
    image: string;
    category: string;
    badge?: string;
    badgeColor?: string;
    // New fields for Product Details Page
    description?: string;
    specifications?: { label: string; value: string }[];
    gallery?: string[]; // Array of image URLs
    tags?: string[]; // Tags para busca aberta/IA
}

export interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    highlight?: boolean;
    icon?: string;
    action?: string; // 'link' | 'modal_categories' | 'category' | 'home'
    categoryName?: string; // If action is 'category'
    children?: { label: string; href: string; highlight?: boolean }[];
    isActive?: boolean; // Control visibility
}

export interface CategoryItem {
    id: number;
    name: string;
    icon: string;
    isActive?: boolean; // Control visibility
}

export interface Slide {
    id: number;
    title: React.ReactNode;
    highlight?: string; // Part of title usually
    description: string;
    image: string;
    cta: string;
    tag: string;
    tagStyle: React.CSSProperties;
    titleStyle: React.CSSProperties;
    highlightStyle: React.CSSProperties;
    ctaStyle: React.CSSProperties;
    background: string;
    imagePosition?: string;
    categoryLink: string; // The category name to navigate to
}

export interface Brand {
    name: string;
    image: string;
}

export interface PromoBanner {
    title: string;
    description: string;
    cta: string;
    linkCategory: string;
    styleClass: string;
    imgClass: string;
    image?: string; // URL dinâmica da imagem
}

export interface SiteConfig {
    logoUrl?: string;
    topBarText?: string;
    topBarIcon?: string;
    footerText?: string;
    whatsappNumber?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    gtmId?: string; // Google Tag Manager ID (GTM-XXXXXX)
}
