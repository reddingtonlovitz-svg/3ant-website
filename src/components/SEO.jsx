import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page metadata
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - The page description for search engines
 * @param {string} props.canonical - Canonical URL of the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (website, article, etc)
 */
export const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = '/og-image.png', 
  ogType = 'website' 
}) => {
  const siteName = '3ant Agency';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Primary keywords and indexing directives (optional/classic) */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
