import { Product } from '@/types'

export const products: Product[] = [
  // ─── PEPTIDES ─────────────────────────────────────────────────────────────
  {
    id: 'bpc-157',
    slug: 'bpc-157',
    name: 'BPC-157',
    shortName: 'BPC-157',
    category: 'peptides',
    subcategory: 'tissue-regeneration',
    description: `BPC-157 (Body Protection Compound 157) is a synthetic peptide derived from a protective protein found in gastric juice. It consists of 15 amino acids and has been the subject of extensive preclinical research.\n\nResearch has explored its potential roles in tissue repair, wound healing, and gastrointestinal protection. Studies have investigated its effects on tendon, ligament, muscle, and nerve tissue in animal models.\n\nAll Popular Peptides compounds are manufactured under strict GMP protocols and independently tested for purity and identity. Certificate of Analysis provided with every order.`,
    shortDescription: 'A 15-amino acid peptide studied for tissue regeneration and gastrointestinal research.',
    images: [
      { url: '/images/products/peptide-vial-1.jpg', alt: 'BPC-157 5mg vial' }
    ],
    variants: [
      { id: 'bpc-157-5mg', name: '5mg', price: 4999, sku: 'PP-BPC157-5', inStock: true },
      { id: 'bpc-157-10mg', name: '10mg', price: 8999, sku: 'PP-BPC157-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'tissue', 'gut'],
    researchAreas: ['tissue-regeneration', 'gastrointestinal'],
    purity: '≥99%',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    molecularWeight: '1419.53 g/mol',
    casNumber: '137525-51-0',
    featured: false,
    badge: 'Popular',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'tb-500',
    slug: 'tb-500',
    name: 'TB-500 (Thymosin Beta-4)',
    shortName: 'TB-500',
    category: 'peptides',
    subcategory: 'tissue-regeneration',
    description: `TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring peptide present in virtually all human and animal cells. It plays a critical role in the building of new blood vessels, muscle tissue fibres, cell migration and blood cell reproduction.\n\nResearch has focused on its role in wound healing, inflammation modulation, and muscle fibre repair. It has been studied in models of cardiac repair, eye injury, and skin wound healing.\n\nPurity verified by HPLC and mass spectrometry. Full COA available on request.`,
    shortDescription: 'Synthetic Thymosin Beta-4 fragment studied for wound healing and tissue repair research.',
    images: [
      { url: '/images/products/peptide-vial-2.jpg', alt: 'TB-500 vial' }
    ],
    variants: [
      { id: 'tb-500-5mg', name: '5mg', price: 5499, sku: 'PP-TB500-5', inStock: true },
      { id: 'tb-500-10mg', name: '10mg', price: 9999, sku: 'PP-TB500-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'healing', 'inflammation'],
    researchAreas: ['tissue-regeneration', 'musculoskeletal', 'cardiovascular'],
    purity: '≥99%',
    molecularWeight: '4963.5 g/mol',
    casNumber: '77591-33-4',
    featured: false,
    badge: 'Popular',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'selank',
    slug: 'selank',
    name: 'Selank',
    shortName: 'Selank',
    category: 'peptides',
    subcategory: 'cognitive',
    description: `Selank is a synthetic heptapeptide analogue of the immunomodulatory tetrapeptide tuftsin. Developed in Russia, it has been investigated for its anxiolytic and nootropic properties in preclinical and clinical research.\n\nStudies have examined its effects on stress response, memory consolidation, and cognitive function. Research suggests it may modulate GABA and serotonin systems without sedative effects.\n\nAll Popular Peptides compounds are rigorously third-party tested. COA included with every shipment.`,
    shortDescription: 'Synthetic heptapeptide studied for anxiolytic and cognitive effects.',
    images: [
      { url: '/images/products/peptide-vial-3.jpg', alt: 'Selank vial' }
    ],
    variants: [
      { id: 'selank-5mg', name: '5mg', price: 4499, sku: 'PP-SELANK-5', inStock: true },
      { id: 'selank-10mg', name: '10mg', price: 7999, sku: 'PP-SELANK-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'cognitive', 'anxiety'],
    researchAreas: ['cognitive'],
    purity: '≥99%',
    molecularWeight: '751.86 g/mol',
    casNumber: '129954-34-3',
    featured: false,
    badge: 'New',
    createdAt: '2024-03-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'semax',
    slug: 'semax',
    name: 'Semax',
    shortName: 'Semax',
    category: 'peptides',
    subcategory: 'cognitive',
    description: `Semax is a synthetic peptide derived from the N-terminal fragment of adrenocorticotropic hormone (ACTH). Originally developed in Russia, it has been studied extensively for neuroprotective and cognitive-enhancing properties.\n\nResearch has explored its potential to increase BDNF expression, improve memory and attention, and provide neuroprotection under ischemic conditions. It is one of the most studied cognitive peptides in the literature.\n\nResearch-grade purity verified by independent third-party laboratory testing.`,
    shortDescription: 'ACTH-derived peptide studied for neuroprotection and cognitive enhancement in research.',
    images: [
      { url: '/images/products/peptide-vial-1.jpg', alt: 'Semax vial' }
    ],
    variants: [
      { id: 'semax-30mg', name: '30mg', price: 5999, sku: 'PP-SEMAX-30', inStock: true },
    ],
    tags: ['research', 'peptide', 'cognitive', 'neuro'],
    researchAreas: ['cognitive'],
    purity: '≥99%',
    molecularWeight: '813.94 g/mol',
    casNumber: '80714-61-0',
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'ghrp-6',
    slug: 'ghrp-6',
    name: 'GHRP-6',
    shortName: 'GHRP-6',
    category: 'peptides',
    subcategory: 'hormonal',
    description: `GHRP-6 (Growth Hormone Releasing Peptide 6) is a synthetic met-enkephalin analogue that strongly stimulates GH secretion in research models. It acts on ghrelin receptors and has been widely studied in neuroendocrinology.\n\nResearch has explored its effects on GH pulsatility, appetite regulation, and metabolic processes. Often studied in combination with GHRH analogues for synergistic effects.\n\nAll Popular Peptides products are manufactured to research-grade standards with full analytical documentation.`,
    shortDescription: 'GH secretagogue peptide studied for hormonal and metabolic research applications.',
    images: [
      { url: '/images/products/peptide-vial-2.jpg', alt: 'GHRP-6 vial' }
    ],
    variants: [
      { id: 'ghrp6-5mg', name: '5mg', price: 3999, sku: 'PP-GHRP6-5', inStock: true },
      { id: 'ghrp6-10mg', name: '10mg', price: 6999, sku: 'PP-GHRP6-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'hormonal', 'gh'],
    researchAreas: ['hormonal', 'metabolic'],
    purity: '≥99%',
    molecularWeight: '873.01 g/mol',
    casNumber: '87616-84-0',
    featured: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
  },
  {
    id: 'pt-141',
    slug: 'pt-141',
    name: 'PT-141 (Bremelanotide)',
    shortName: 'PT-141',
    category: 'peptides',
    subcategory: 'reproductive',
    description: `PT-141 (Bremelanotide) is a synthetic analogue of alpha-melanocyte-stimulating hormone (α-MSH) that acts on melanocortin receptors. It has been the subject of clinical research for reproductive health applications.\n\nUnlike other compounds in its class, PT-141 acts directly on the nervous system and has been studied for its effects on sexual dysfunction in both male and female animal models.\n\nResearch-grade compound, independently verified for purity by third-party HPLC and mass spectrometry.`,
    shortDescription: 'Melanocortin receptor agonist studied for reproductive and metabolic research.',
    images: [
      { url: '/images/products/peptide-vial-3.jpg', alt: 'PT-141 vial' }
    ],
    variants: [
      { id: 'pt141-10mg', name: '10mg', price: 6499, sku: 'PP-PT141-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'reproductive', 'melanocortin'],
    researchAreas: ['reproductive', 'metabolic'],
    purity: '≥99%',
    molecularWeight: '1025.2 g/mol',
    casNumber: '189691-06-3',
    featured: false,
    createdAt: '2024-04-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'epitalon',
    slug: 'epitalon',
    name: 'Epitalon',
    shortName: 'Epitalon',
    category: 'peptides',
    subcategory: 'cellular-longevity',
    description: `Epitalon (Epithalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from the pineal peptide Epithalamin. It has been studied extensively by Russian researchers for its effects on telomerase activity and cellular ageing.\n\nResearch has investigated its role in activating telomerase, extending telomere length in somatic cells, normalizing melatonin levels, and restoring function of the hypothalamic-pituitary-gonadal axis in ageing models.\n\nAll Popular Peptides compounds are produced under GMP conditions and verified by independent analytical labs.`,
    shortDescription: 'Tetrapeptide studied for telomerase activation and cellular longevity research.',
    images: [
      { url: '/images/products/peptide-vial-1.jpg', alt: 'Epitalon vial' }
    ],
    variants: [
      { id: 'epitalon-10mg', name: '10mg', price: 5499, sku: 'PP-EPIT-10', inStock: true },
      { id: 'epitalon-50mg', name: '50mg', price: 19999, sku: 'PP-EPIT-50', inStock: true },
    ],
    tags: ['research', 'peptide', 'longevity', 'telomere', 'anti-aging'],
    researchAreas: ['cellular-longevity', 'circadian'],
    purity: '≥99%',
    sequence: 'Ala-Glu-Asp-Gly',
    molecularWeight: '390.35 g/mol',
    casNumber: '307297-39-8',
    featured: false,
    badge: 'New',
    createdAt: '2024-05-01',
    updatedAt: '2024-06-01',
  },

  // ─── ACCESSORIES ──────────────────────────────────────────────────────────
  {
    id: 'bac-water-30ml',
    slug: 'bacteriostatic-water-30ml',
    name: 'Bacteriostatic Water 30ml',
    shortName: 'BAC Water 30ml',
    category: 'accessories',
    description: `Sterile 0.9% benzyl alcohol bacteriostatic water in a 30ml multi-dose vial. Suitable for reconstituting lyophilized research peptides.\n\nSterile, USP-grade benzyl alcohol preservative. Suitable for multi-dose reconstitution applications in research settings.`,
    shortDescription: 'USP-grade sterile bacteriostatic water for peptide reconstitution. 30ml multi-dose vial.',
    images: [
      { url: '/images/products/bac-water.jpg', alt: 'Bacteriostatic water 30ml vial' }
    ],
    variants: [
      { id: 'bacwater-30ml', name: '30ml', price: 1499, sku: 'PP-BACW-30', inStock: true },
    ],
    tags: ['accessories', 'reconstitution', 'bac water'],
    researchAreas: [],
    featured: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'insulin-syringes',
    slug: 'insulin-syringes-100-pack',
    name: 'Insulin Syringes — 100 Pack',
    shortName: 'Insulin Syringes',
    category: 'accessories',
    description: `High-quality 29-gauge insulin syringes, 1ml capacity with 0.5 inch needle. Individually packaged and sterile. Suitable for precise liquid measurement in research applications.\n\n100 units per box. 29G × 1/2" needle, 1cc/1ml barrel with clear measurement markings.`,
    shortDescription: '29G insulin syringes, 1ml. Sterile, individually packaged. 100 pack.',
    images: [
      { url: '/images/products/syringes.jpg', alt: 'Insulin syringes 100 pack' }
    ],
    variants: [
      { id: 'syringes-100', name: '100 Pack', price: 1999, sku: 'PP-SYR-100', inStock: true },
    ],
    tags: ['accessories', 'syringes', 'supplies'],
    researchAreas: [],
    featured: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'retatrutide',
    slug: 'retatrutide',
    name: 'Retatrutide',
    shortName: 'Retatrutide',
    category: 'peptides',
    subcategory: 'metabolic',
    description: `Retatrutide is a novel triple agonist peptide targeting GIP, GLP-1, and glucagon receptors simultaneously. It represents the next generation of metabolic research compounds, with preclinical studies exploring its effects on energy expenditure, glucose regulation, and body composition.\n\nAs a triagonist, it activates three complementary pathways — making it a subject of significant interest in obesity and metabolic disorder research.\n\nAll Popular Peptides compounds are manufactured under strict GMP protocols and independently tested for purity and identity. Certificate of Analysis provided with every order.`,
    shortDescription: 'Triple receptor agonist (GIP/GLP-1/Glucagon) studied for metabolic and weight management research.',
    images: [
      { url: '/images/products/retatrutide10mg.jpg', alt: 'Retatrutide 10mg vial' }
    ],
    variants: [
      { id: 'retatrutide-10mg', name: '10mg', price: 14999, sku: 'PP-RETA-10', inStock: true },
    ],
    tags: ['research', 'peptide', 'metabolic', 'glp-1', 'weight'],
    researchAreas: ['metabolic', 'weight-management'],
    purity: '≥99%',
    molecularWeight: '4759.5 g/mol',
    featured: true,
    badge: 'New',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'kglow',
    slug: 'kglow',
    name: 'KGLOW',
    shortName: 'KGLOW',
    category: 'peptides',
    subcategory: 'skin',
    description: `KLOW is a research-grade peptide compound studied for its potential effects on skin health, collagen synthesis, and dermal regeneration. Preclinical research has explored its role in promoting skin elasticity, reducing oxidative stress at the cellular level, and supporting wound repair in dermal tissue models.\n\nResearchers have investigated KLOW for its interactions with fibroblast activity and its potential to upregulate extracellular matrix proteins associated with skin structure and resilience.\n\nAll Popular Peptides compounds are manufactured under strict GMP protocols and independently tested for purity and identity. Certificate of Analysis provided with every order.`,
    shortDescription: 'Research peptide studied for skin regeneration, collagen synthesis, and dermal health applications.',
    images: [
      { url: '/images/products/KGLOW80mg.jpg', alt: 'KGLOW 80mg vial' }
    ],
    variants: [
      { id: 'kglow-80mg', name: '80mg', price: 9999, sku: 'PP-KGLOW-80', inStock: true },
    ],
    tags: ['research', 'peptide', 'skin', 'collagen', 'dermal'],
    researchAreas: ['skin', 'cellular-longevity'],
    purity: '≥99%',
    featured: true,
    badge: 'New',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find(p => p.slug === slug)

export const getProductsByCategory = (category: string): Product[] =>
  products.filter(p => p.category === category)

export const getFeaturedProducts = (): Product[] =>
  products.filter(p => p.featured)

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}
