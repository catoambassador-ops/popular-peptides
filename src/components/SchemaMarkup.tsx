export function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://popularpeptides.ca/#organization',
        name: 'Popular Peptides',
        url: 'https://popularpeptides.ca',
        logo: 'https://popularpeptides.ca/images/branding/canadaflag.jpg',
        description: 'Canada\'s trusted source for research-grade peptides. Third-party tested, GMP manufactured, shipped across Canada.',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'sales@popularpeptides.ca',
          contactType: 'customer service',
          areaServed: 'CA',
          availableLanguage: 'English',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Canada',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CA',
          addressRegion: 'BC',
          addressLocality: 'Vancouver',
        },
        sameAs: ['https://popularpeptides.ca'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://popularpeptides.ca/#website',
        url: 'https://popularpeptides.ca',
        name: 'Popular Peptides Canada',
        description: 'Buy research-grade peptides in Canada — BPC-157, Retatrutide, NAD+, Semax, Selank and more. Ships to Vancouver, Toronto, Calgary and all of Canada.',
        publisher: { '@id': 'https://popularpeptides.ca/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://popularpeptides.ca/products?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
