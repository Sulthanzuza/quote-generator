import { Service } from '../types';

export const services: Service[] = [
  {
    id: "branding",
    name: "Branding & Identity",
    subServices: [
      { id: "branding-1", name: "Logo Design" },
      { id: "branding-2", name: "Brand Guidelines (colors, fonts, voice)" },
      { id: "branding-3", name: "Business Cards / Stationery" },
      { id: "branding-4", name: "Social Media Branding Kit" },
      { id: "branding-5", name: "Visual Style Guide" },
      { id: "branding-6", name: "Presentation Templates / Company Deck" },
      { id: "branding-7", name: "App Icon & UI Style Input" },
      { id: "branding-8", name: "Vehicle Branding" }
    ]
  },
  {
    id: "website",
    name: "Website / App Landing Page",
    subServices: [
      { id: "website-1", name: "UI/UX Design" },
      { id: "website-2", name: "Mobile-Responsive Website" },
      { id: "website-3", name: "App Download Landing Page" },
      { id: "website-4", name: "Blog Integration" },
      { id: "website-5", name: "Contact Forms / Lead Capture" },
      { id: "website-6", name: "Google Maps Integration" },
      { id: "website-7", name: "Hosting & Domain Setup" },
      { id: "website-8", name: "CMS (WordPress / Webflow / Custom)" },
      { id: "website-9", name: "Multilingual Setup (English + Arabic for UAE)" },
       { id: "website-10", name: "Social Media Integration" },
      { id: "website-11", name: "3-5 pages" },
      { id: "website-12", name: "5-10 pages" },
      { id: "website-13", name: "10-15 pages" },
      { id: "website-14", name: "15 + pages" },
      { id: "website-15", name: "Seo Friendly Content (complimentary)" },
    ]
  },
  {
    id: "seo",
    name: "SEO",
    subServices: [
      { id: "seo-1", name: "Keyword Research" },
      { id: "seo-2", name: "On-Page SEO" },
      { id: "seo-3", name: "Technical SEO" },
      { id: "seo-4", name: "Off-Page SEO" },
      { id: "seo-5", name: "Local SEO" },
      { id: "seo-6", name: "Blog Writing & Optimization" },
      { id: "seo-7", name: "Competitor Analysis" },
      { id: "seo-8", name: "SEO Audit Reports" },
      { id: "seo-9", name: "Google Search Console & GA4 Setup" },
      { id: "seo-10", name: "Monthly Ranking & Traffic Reports" }
    ]
  },
  {
    id: "smm",
    name: "Social Media Management (SMM)",
    subServices: [
      { id: "smm-1", name: "Content Strategy" },
      { id: "smm-2", name: "Monthly Content Calendar" },
      { id: "smm-3", name: "Platform Management" },
      { id: "smm-4", name: "Post Design" },
      { id: "smm-5", name: "Reels/Short-form Video Creation" },
      { id: "smm-6", name: "Stories & Engagement" },
      { id: "smm-7", name: "Caption Writing + Hashtag Strategy" },
      { id: "smm-8", name: "Community Management" },
      { id: "smm-9", name: "Influencer Outreach" },
      { id: "smm-10", name: "Monthly Reporting" }
    ]
  },
  {
    id: "paid-ads",
    name: "Paid Ads (Performance Marketing)",
    subServices: [
      { id: "paid-ads-1", name: "Meta Ads Management" },
      { id: "paid-ads-2", name: "Google Ads (Search, Display, YouTube, App Install)" },
      { id: "paid-ads-3", name: "TikTok Ads Management" },
      { id: "paid-ads-4", name: "LinkedIn Ads (B2B)" },
      { id: "paid-ads-5", name: "Twitter/X Ads" }
    ]
  },
  {
    id: "email",
    name: "Email Marketing & Automation",
    subServices: [
      { id: "email-1", name: "Campaign Strategy & Design" },
      { id: "email-2", name: "Newsletters" },
      { id: "email-3", name: "Drip Campaigns" },
      { id: "email-4", name: "Subscriber Segmentation" },
      { id: "email-5", name: "Platform Setup" },
      { id: "email-6", name: "Template Design" },
      { id: "email-7", name: "Open/Click Rate Optimization" },
      { id: "email-8", name: "Monthly Performance Report" }
    ]
  },
  {
    id: "push",
    name: "Push Notifications & In-App Messaging",
    subServices: [
      { id: "push-1", name: "Push Platform Setup" },
      { id: "push-2", name: "Event-Triggered Push Flows" },
      { id: "push-3", name: "Segmentation & Timing" },
      { id: "push-4", name: "Multilingual Push" },
      { id: "push-5", name: "Re-engagement Campaigns" }
    ]
  },
  {
    id: "analytics",
    name: "Analytics & Tracking",
    subServices: [
      { id: "analytics-1", name: "GA4 Setup" },
      { id: "analytics-2", name: "Pixel & Conversion Tracking" },
      { id: "analytics-3", name: "App Analytics" },
      { id: "analytics-4", name: "Heatmaps" },
      { id: "analytics-5", name: "Funnel Analysis" },
      { id: "analytics-6", name: "Monthly Reports" }
    ]
  },
  {
    id: "influencer",
    name: "Influencer & UGC Marketing",
    subServices: [
      { id: "influencer-1", name: "Influencer Shortlisting" },
      { id: "influencer-2", name: "Outreach & Negotiation" },
      { id: "influencer-3", name: "Creative Briefing" },
      { id: "influencer-4", name: "UGC Collection" },
      { id: "influencer-5", name: "Rights Management" }
    ]
  },
  {
    id: "content",
    name: "Content Creation & Video",
    subServices: [
      { id: "content-1", name: "Reels / TikTok Scripts" },
      { id: "content-2", name: "Explainer Videos" },
      { id: "content-3", name: "Testimonial Videos" },
      { id: "content-4", name: "BTS Content" },
      { id: "content-5", name: "Motion Graphics" },
      { id: "content-6", name: "Photography & Videography" },
      { id: "content-7", name: "Subtitling & Localization" }
    ]
  },
  {
    id: "cro",
    name: "Conversion Optimization (CRO)",
    subServices: [
      { id: "cro-1", name: "A/B Testing" },
      { id: "cro-2", name: "Landing Page Optimization" },
      { id: "cro-3", name: "Funnel Testing" },
      { id: "cro-4", name: "CTA Testing" },
      { id: "cro-5", name: "Checkout Flow Improvements" }
    ]
  },
  {
    id: "strategy",
    name: "Strategy & Consulting",
    subServices: [
      { id: "strategy-1", name: "Strategy Deck" },
      { id: "strategy-2", name: "Go-to-Market Plan" },
      { id: "strategy-3", name: "Brand Positioning" },
      { id: "strategy-4", name: "Budget Planning" },
      { id: "strategy-5", name: "Consulting Sessions" }
    ]
  },
  {
    id: "other",
    name: "Other Services",
    subServices: [
      { id: "other-1", name: "WhatsApp Business Setup" },
      { id: "other-2", name: "Chatbot Integration" },
      { id: "other-3", name: "Loyalty Program" },
      { id: "other-4", name: "Referral Program" },
      { id: "other-5", name: "PR & Media Outreach" },
      { id: "other-6", name: "Event/Expo Support" }
    ]
  },
  {
  id: "e-commerce-website",
  name: "E-commerce Website",
  subServices: [
  { id: "ecom-1", name: "Custom UI/UX Design for Conversions" },
  { id: "ecom-2", name: "Mobile-Responsive & Fast Loading Website" },
  { id: "ecom-3", name: "Product Catalog & Categories Setup" },
  { id: "ecom-4", name: "Shopping Cart & Checkout Integration" },
  { id: "ecom-5", name: "Multiple Payment Gateway Integration (Razorpay, Stripe, etc.)" },
  { id: "ecom-6", name: "Inventory & Order Management System" },
  { id: "ecom-7", name: "Customer Login & Dashboard" },
  { id: "ecom-8", name: "Email Notifications for Orders" },
  { id: "ecom-9", name: "Coupons & Offer Management System" },
  { id: "ecom-10", name: "Social Media Integration" },
  { id: "ecom-11", name: "Chatbot Integration (WhatsApp, Messenger, etc.)" },
  { id: "ecom-12", name: "Blog for SEO & Content Marketing" },
  { id: "ecom-13", name: "SEO-Friendly Structure & Meta Optimization" },
  { id: "ecom-14", name: "Multilingual Setup (English + Arabic for UAE Market)" },
  { id: "ecom-15", name: "Google Analytics & Facebook Pixel Integration" },
  { id: "ecom-16", name: "Hosting, Domain, and SSL Setup" },
  { id: "ecom-17", name: "Admin Panel to Manage Products, Orders & Customers" },
  { id: "ecom-18", name: "Secure Database Integration (MongoDB / MySQL / PostgreSQL)" },
  { id: "ecom-20", name: "Server Deployment & Optimization (Render / Vercel / VPS)" },
  { id: "ecom-21", name: "API Integration for External Services (Shipping, CRM, etc.)" },
  { id: "ecom-22", name: "Training & Post-Launch Support" },
  { id: "ecom-23", name: "10+ Pages Storefront" },
  { id: "ecom-24", name: "Free SEO Copywriting for Product Pages" }
]
}


];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getSubServicesByServiceId = (id: string): SubService[] => {
  const service = getServiceById(id);
  return service ? service.subServices : [];
};

export const getServiceNameById = (id: string): string => {
  const service = getServiceById(id);
  return service ? service.name : "";
};

export const formatAED = (amount: number): string => {
  return `AED ${amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};