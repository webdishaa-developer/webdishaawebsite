// ─────────────────────────────────────────
// WebDisha — All Site Data (Lucide Version)
// ─────────────────────────────────────────

import {
  Pencil,
  Palette,
  Briefcase,
  Image,
  MapPin,
  Map,
  BarChart3,
  Plus,
  FileText,
  Users,
  Paintbrush,
  CheckCircle,
  Rocket,
  IndianRupee,
  Zap,
  Smartphone,
  MessageCircle,
  Search,
} from "lucide-react";

// ─────────────────────────────────────────
// SITE INFO
// ─────────────────────────────────────────

export const SITE = {
  name: "WebDishaa",
  tagline: "Affordable Digital Solutions for Local Businesses",
  phone: "75871 82520",
  phoneHref: "tel:7587182520",
  whatsapp: "https://wa.me/917587182520",
  email: "webdishaa@gmail.com",
  instagram: "https://instagram.com/webdishaa",
  instagramHandle: "@webdishaa",
};

// ─────────────────────────────────────────
// STATS
// ─────────────────────────────────────────

export const STATS = [
  { n: 15, s: "+", l: "Websites Delivered" },
  { n: 98, s: "%", l: "Client Satisfaction" },
  { n: 3, s: "d", l: "Avg. Delivery" },
  { n: 15, s: "+", l: "Happy Businesses" },
];

// ─────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────

export const TYPEWRITER_WORDS = [
  "Websites that Win Clients",
  "Designs that Build Trust",
  "Stores that Sell 24/7",
  "Brands that Stand Out",
];

// ─────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────

export const MARQUEE_ITEMS = [
  "Fast Delivery",
  "Affordable Pricing",
  "Mobile Friendly",
  "SEO Optimized",
  "WhatsApp Integration",
  "Google Business Setup",
  "Local Business Experts",
  "5-Star Rated",
  "500+ Businesses Served",
];

// ─────────────────────────────────────────
// PACKAGES
// ─────────────────────────────────────────

export const PACKAGES = [
  {
    num: "01",
    name: "Starter Website",
    price: "₹4,999",
    delivery: "2–3 Days",
    hot: false,
    features: [
      "1 Page Website",
      "Mobile Responsive",
      "WhatsApp Chat Button",
      "Contact Form",
      "Google Maps Integration",
      "Basic SEO",
    ],
  },
  {
    num: "02",
    name: "Business Website",
    price: "₹9,999",
    delivery: "4–5 Days",
    hot: true,
    features: [
      "Up to 5 Pages",
      "Mobile Responsive",
      "WhatsApp Chat",
      "Contact Form",
      "Image Gallery",
      "Google Maps",
      "Basic SEO",
    ],
  },
  {
    num: "03",
    name: "Professional Website",
    price: "₹19,999",
    delivery: "7–10 Days",
    hot: false,
    features: [
      "8–10 Pages",
      "Modern UI Design",
      "Blog Section",
      "Speed Optimization",
      "SEO Optimization",
      "Google Analytics Setup",
    ],
  },
  {
    num: "04",
    name: "E-Commerce Website",
    price: "₹34,999",
    delivery: "10–14 Days",
    hot: false,
    features: [
      "Online Store",
      "Product Pages",
      "Shopping Cart",
      "Payment Gateway",
      "Order Management",
      "Admin Dashboard (20 Products)",
    ],
  },
];

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────

export const SERVICES = [
  { icon: Pencil, name: "Basic Logo Design", price: "₹399 to ₹599" },
  { icon: Palette, name: "Professional Logo", price: "₹799 to ₹1,099" },
  { icon: Briefcase, name: "Business Card Design", price: "₹599 to ₹799" },
  { icon: Image, name: "Banner / Poster Design", price: "₹299 to ₹599" },
  { icon: MapPin, name: "Google Business Profile", price: "₹2,000" },
  { icon: Map, name: "Google Map Optimization", price: "₹1,500" },
  { icon: BarChart3, name: "Basic SEO Setup", price: "₹2,500" },
  { icon: Plus, name: "Extra Page Add-on", price: "₹500" },
  { icon: FileText, name: "Blog Setup", price: "₹899 to ₹1,499" },
];

// ─────────────────────────────────────────
// SOCIAL PACKS
// ─────────────────────────────────────────

export const SOCIAL_PACKS = [
  { tier: "Starter", name: "Starter Social Pack", price: "₹999", posts: 5 },
  { tier: "Business", name: "Business Social Pack", price: "₹2,099", posts: 10 },
  { tier: "Premium", name: "Premium Social Pack", price: "₹3,499", posts: 20 },
];

// ─────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────

export const PROCESS = [
  {
    icon: Users,
    title: "Discovery Call",
    desc: "We understand your business goals, target audience and design preferences in a free consultation.",
  },
  {
    icon: Paintbrush,
    title: "Design & Build",
    desc: "We design and develop your website with modern UI and mobile-first best practices.",
  },
  {
    icon: CheckCircle,
    title: "Review & Revise",
    desc: "You review the website and we refine until you are 100% satisfied.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    desc: "We deploy your website and provide ongoing support.",
  },
];

// ─────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────

export const PORTFOLIO = [
  {
    tag: "Restaurant",
    name: "Spice Garden",
    meta: "Starter Website · Raipur",
    before: "No mobile support",
    after: "Modern + WhatsApp CTA",
  },
  {
    tag: "Clothing Store",
    name: "Trendy Threads",
    meta: "E-Commerce · Bilaspur",
    before: "No online presence",
    after: "Full online store",
  },
  {
    tag: "Coaching Centre",
    name: "BrightMind Academy",
    meta: "Business Website · Raipur",
    before: "Just a WhatsApp number",
    after: "Professional + enquiry form",
  },
  {
    tag: "Interior Design",
    name: "Artisan Spaces",
    meta: "Professional Website · Durg",
    before: "Outdated 2015 site",
    after: "Modern portfolio site",
  },
  {
    tag: "Medical Clinic",
    name: "HealthFirst Clinic",
    meta: "Business Website · Raipur",
    before: "No web presence",
    after: "Appointment booking site",
  },
  {
    tag: "Gym & Fitness",
    name: "IronCore Fitness",
    meta: "Starter Website · Korba",
    before: "Instagram only",
    after: "Landing page + WhatsApp",
  },
];

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────

export const TESTIMONIALS = [
  { stars: 5, text: "Built our restaurant website in 3 days. Enquiries increased fast.", init: "R" },
  { stars: 5, text: "Affordable and perfect for my clothing store needs.", init: "P" },
  { stars: 5, text: "Google profile setup boosted our clinic visibility.", init: "A" },
  { stars: 5, text: "Students now find us easily on Google.", init: "S" },
  { stars: 4, text: "Good quality and patient with revisions.", init: "V" },
  { stars: 5, text: "Delivered on time with great support.", init: "M" },
];

// ─────────────────────────────────────────
// WHY CHOOSE US
// ─────────────────────────────────────────

export const WHY = [
  { icon: IndianRupee, title: "Affordable", desc: "Best value without compromising quality." },
  { icon: Zap, title: "Fast Delivery", desc: "Your site ready in days." },
  { icon: Smartphone, title: "Mobile First", desc: "Fully responsive design." },
  { icon: MessageCircle, title: "WhatsApp Ready", desc: "Instant communication." },
  { icon: Users, title: "Local Support", desc: "We understand local businesses." },
  { icon: Search, title: "SEO Optimized", desc: "Built for Google visibility." },
];