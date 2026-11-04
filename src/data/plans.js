// data/plans.js — all plans & services (NO PRICES shown anywhere)
import {
  Pencil, Palette, Briefcase, Image, MapPin, Map, BarChart3, Plus, FileText,
} from 'lucide-react';

/* ── Website packages ── */
export const WEBSITE_PLANS = [
  {
    num: '01', name: 'Starter Website', hot: false,
    tagline: 'Best for freelancers & small shops',
    delivery: '2–4 Days',
    features: ['1 Page Website', 'Mobile Responsive', 'WhatsApp Chat Button', 'Contact Form', 'Google Maps Integration', 'Basic SEO'],
  },
  {
    num: '02', name: 'Business Website', hot: true,
    tagline: 'Best for growing businesses',
    delivery: '4–5 Days',
    features: ['Up to 5 Pages', 'Mobile Responsive', 'WhatsApp Chat', 'Contact Form', 'Image Gallery', 'Google Maps', 'Basic SEO'],
  },
  {
    num: '03', name: 'Custom Web App', hot: true,
    tagline: 'Best for startups & big ideas',
    delivery: '7–14 Days',
    features: ['Turn Your Idea Into a Web App', 'Custom Design — No Templates', 'Works on Mobile & Desktop', 'User Login & Secure Authentication', 'Custom Features & Business Logic', 'Admin Dashboard', 'API & Database Integration', 'Live Deployment & Support'],
  },
  {
    num: '04', name: 'Professional Website', hot: false,
    tagline: 'Best for established brands',
    delivery: '7–10 Days',
    features: ['6–8 Pages', 'Modern UI Design', 'Blog Section', 'Speed Optimization', 'SEO Optimization', 'Google Analytics Setup'],
  },
  {
    num: '05', name: 'E-Commerce Website', hot: false,
    tagline: 'Best for selling online',
    delivery: '10–14 Days',
    features: ['Online Store', 'Product Pages', 'Shopping Cart', 'Order Management Panel', 'Admin Dashboard (20 Products)'],
  },
];

/* ── Branding / Google / Add-on services ── */
export const EXTRA_SERVICES = [
  { icon: Pencil,    name: 'Basic Logo Design',       desc: 'Clean, simple logo with 2 concepts. PNG + JPG delivery.' },
  { icon: Palette,   name: 'Professional Logo',       desc: 'Multiple concepts, colour guide and full vector files.' },
  { icon: Briefcase, name: 'Business Card Design',    desc: 'Print-ready front + back card that makes a first impression.' },
  { icon: Image,     name: 'Banner / Poster Design',  desc: 'Eye-catching banners and posters for offers and events.' },
  { icon: MapPin,    name: 'Google Business Profile', desc: 'Get verified on Google Maps so local customers find you.' },
  { icon: Map,       name: 'Google Map Optimization', desc: 'Rank higher on Google Maps against local competitors.' },
  { icon: BarChart3, name: 'Basic SEO Setup',         desc: 'Keywords, meta tags, Search Console and sitemap setup.' },
  { icon: Plus,      name: 'Extra Page Add-on',       desc: 'Add more pages to your existing website package.' },
  { icon: FileText,  name: 'Blog Setup',              desc: 'A fully working blog added to your website.' },
];

/* ── Social Media Management — Part 1 (1 month) ── */
export const SOCIAL_1M = [
  { num: '01', name: 'Starter Pack', hot: false, content: 8,  reels: 3,  posts: 5,
    best: 'Startups and small businesses' },
  { num: '02', name: 'Value Pack',   hot: true,  content: 11, reels: 6,  posts: 5,
    best: 'Businesses seeking better visibility and engagement' },
  { num: '03', name: 'Premium Pack', hot: false, content: 25, reels: 10, posts: 15,
    best: 'Growing businesses seeking a stronger brand image' },
];

/* ── Social Media Management — Part 2 (3 months) ── */
export const SOCIAL_3M = [
  { num: '04', name: '3-Month Growth Pack', hot: false, content: 38, reels: 20, posts: 18,
    months: [['Month 1', '07 Reels + 06 Posts'], ['Month 2', '07 Reels + 06 Posts'], ['Month 3', '06 Reels + 06 Posts']],
    best: 'Businesses seeking consistency and long-term brand building' },
  { num: '05', name: '3-Month Elite Branding Pack', hot: false, content: 55, reels: 30, reelNote: 'incl. 05 Model Reels', posts: 25,
    months: [['Month 1', '10 Reels + 08 Photos'], ['Month 2', '10 Reels + 08 Photos'], ['Month 3', '10 Reels + 09 Photos']],
    best: 'Brands seeking premium product showcasing and model-based promotions' },
];

export const SOCIAL_WHY = [
  'Creative and customized content',
  'Professional brand presentation',
  'Engaging reels and posts',
  'Consistent content planning',
  'Content tailored to your brand identity',
];