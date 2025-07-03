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
      { id: "website-16", name: "Website Maintainence" },
      { id: "website-17", name: "Content Writing & Visual Creation" },
    
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
      { id: "seo-10", name: "Monthly Ranking & Traffic Reports" },
       { id: "seo-11", name: "Content Startegy" }
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
      { id: "smm-10", name: "Monthly Reporting" },
      { id: "smm-11", name: "Paid Promotions" }
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
      { id: "strategy-5", name: "Consulting Sessions" },
     { id: "strategy-6", name: "Content Strategy" }
    ]
  },
  {
    "id": "webapp-user-features",
    "name": "User Features",
    "subServices": [
      { "id": "webapp-user-search-1", "name": "Search workshops by location, service type, ratings" },
      { "id": "webapp-user-search-2", "name": "Browse spare parts by category, car model, brand" },
      { "id": "webapp-user-search-3", "name": "Apply filters (price, location, brand, availability)" },
      { "id": "webapp-user-search-4", "name": "Sort by price, rating, delivery time" },
      { "id": "webapp-user-booking-1", "name": "Book workshop visit to user location" },
      { "id": "webapp-user-booking-2", "name": "Book appointment at merchant location" },
      { "id": "webapp-user-booking-3", "name": "View workshop ratings, reviews, service time" },
      { "id": "webapp-user-booking-4", "name": "Track booking status (requested → done)" },
      { "id": "webapp-user-ecommerce-1", "name": "Add to Cart, Checkout, COD or online" },
      { "id": "webapp-user-ecommerce-2", "name": "Apply offers/coupons" },
      { "id": "webapp-user-ecommerce-3", "name": "Track orders" },
      { "id": "webapp-user-ecommerce-4", "name": "View order history & download invoice" },
      { "id": "webapp-user-wallet-1", "name": "Earn via referrals or promo codes" },
      { "id": "webapp-user-wallet-2", "name": "Spend wallet balance on booking or ordering" },
      { "id": "webapp-user-wallet-3", "name": "View wallet transaction history" },
      { "id": "webapp-user-offers-1", "name": "Apply coupons during checkout/booking" },
      { "id": "webapp-user-offers-2", "name": "View active offers" },
      { "id": "webapp-user-complaints-1", "name": "Raise complaint about workshop or order" },
      { "id": "webapp-user-complaints-2", "name": "View complaint status" }
    ]
  },
  {
    "id": "webapp-workshop-panel",
    "name": "Workshop Merchant Panel",
    "subServices": [
      { "id": "webapp-workshop-jobs-1", "name": "View all assigned bookings" },
      { "id": "webapp-workshop-jobs-2", "name": "Accept or decline jobs" },
      { "id": "webapp-workshop-jobs-3", "name": "Update service status" },
      { "id": "webapp-workshop-jobs-4", "name": "Upload diagnostic photos/comments" },
      { "id": "webapp-workshop-jobs-5", "name": "Upload/download service report" },
      { "id": "webapp-workshop-customer-1", "name": "View customer details & address" },
      { "id": "webapp-workshop-customer-2", "name": "Map for navigation to customer" },
      { "id": "webapp-workshop-payments-1", "name": "View job payments (commission deducted)" },
      { "id": "webapp-workshop-payments-2", "name": "Wallet with withdrawal request" },
      { "id": "webapp-workshop-payments-3", "name": "Download payment slips" },
      { "id": "webapp-workshop-offers-1", "name": "Opt-in to platform-wide offers" },
      { "id": "webapp-workshop-offers-2", "name": "View coupon usage stats" },
      { "id": "webapp-workshop-complaints-1", "name": "Raise support ticket to admin" },
      { "id": "webapp-workshop-dashboard-1", "name": "Dashboard with jobs, ratings, earnings" }
    ]
  },
  {
    "id": "webapp-seller-panel",
    "name": "Spare Parts Seller Panel",
    "subServices": [
      { "id": "webapp-seller-products-1", "name": "Add/edit/delete products" },
      { "id": "webapp-seller-products-2", "name": "Assign category & brand" },
      { "id": "webapp-seller-products-3", "name": "Set availability by location" },
      { "id": "webapp-seller-products-4", "name": "Inventory management with alerts" },
      { "id": "webapp-seller-orders-1", "name": "View/manage orders" },
      { "id": "webapp-seller-orders-2", "name": "Upload tracking ID, mark as shipped" },
      { "id": "webapp-seller-orders-3", "name": "Download invoices" },
      { "id": "webapp-seller-promotions-1", "name": "Create offers/coupons" },
      { "id": "webapp-seller-promotions-2", "name": "Track coupon redemptions & conversions" },
      { "id": "webapp-seller-payments-1", "name": "Track earnings & refunds" },
      { "id": "webapp-seller-payments-2", "name": "Wallet with withdrawal requests" },
      { "id": "webapp-seller-payments-3", "name": "Download payment slips" },
      { "id": "webapp-seller-complaints-1", "name": "Raise complaint to admin" },
      { "id": "webapp-seller-dashboard-1", "name": "Dashboard with sales, returns, top products" }
    ]
  },
  {
    "id": "webapp-admin-panel",
    "name": "Admin Panel",
    "subServices": [
      { "id": "webapp-admin-users-1", "name": "Manage users, workshops, sellers" },
      { "id": "webapp-admin-users-2", "name": "Approve/reject KYC" },
      { "id": "webapp-admin-users-3", "name": "Block/unblock accounts" },
      { "id": "webapp-admin-orders-1", "name": "View all bookings/orders" },
      { "id": "webapp-admin-orders-2", "name": "Filter and reassign bookings" },
      { "id": "webapp-admin-orders-3", "name": "Issue refunds manually" },
      { "id": "webapp-admin-payments-1", "name": "Set commission %" },
      { "id": "webapp-admin-payments-2", "name": "Approve withdrawal requests" },
      { "id": "webapp-admin-payments-3", "name": "Upload/manage payment slips" },
      { "id": "webapp-admin-payments-4", "name": "Generate merchant statements" },
      { "id": "webapp-admin-offers-1", "name": "Create and manage offers/coupons" },
      { "id": "webapp-admin-offers-2", "name": "Approve/reject merchant offers" },
      { "id": "webapp-admin-offers-3", "name": "View coupon analytics" },
      { "id": "webapp-admin-discovery-1", "name": "Search and assign workshops" },
      { "id": "webapp-admin-discovery-2", "name": "Geo-location and mapping" },
      { "id": "webapp-admin-complaints-1", "name": "Handle complaints from users/merchants" },
      { "id": "webapp-admin-complaints-2", "name": "Assign handlers and track SLAs" },
      { "id": "webapp-admin-analytics-1", "name": "Revenue reports, trends, merchant stats" },
      { "id": "webapp-admin-analytics-2", "name": "Export reports to CSV/PDF" },
      { "id": "webapp-admin-settings-1", "name": "Control taxes, wallet rules, referral bonuses" },
      { "id": "webapp-admin-settings-2", "name": "CMS for terms, privacy, etc." }
    ]
  },
  {
    "id": "webapp-bonus",
    "name": "Bonus Features",
    "subServices": [
      { "id": "webapp-bonus-1", "name": "Push Notifications" },
      { "id": "webapp-bonus-2", "name": "Role-Based Access Control" },
      { "id": "webapp-bonus-3", "name": "PWA or Mobile App" },
      { "id": "webapp-bonus-4", "name": "Merchant Performance Report" },
      { "id": "webapp-bonus-5", "name": "Bulk Import/Export" },
      { "id": "webapp-bonus-6", "name": "SKU/QR Code Support" }
    ]
  }
,

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
export const formatINR = (amount: number): string => {
  return `INR ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};