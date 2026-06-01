export interface Review {
  id: string
  name: string
  location: string
  rating: 5 | 4 | 3 | 2 | 1
  product: string
  productSlug?: string
  title: string
  body: string
  date: string
  verified: boolean
  featured: boolean
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Marcus T.',
    location: 'Vancouver, BC',
    rating: 5,
    product: 'Retatrutide',
    productSlug: 'retatrutide',
    title: 'Best source in Canada, full stop.',
    body: 'I've been ordering research compounds for over three years from various suppliers. Popular Peptides is in a different league. The Retatrutide arrived quickly, COA was attached to the email the same day, and the purity verified exactly as listed. Customer service responded within the hour when I had a dosing question. This is the standard every Canadian supplier should be held to.',
    date: '2025-04-12',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Stephanie R.',
    location: 'Toronto, ON',
    rating: 5,
    product: 'KGLOW',
    productSlug: 'kglow',
    title: 'Finally a Canadian supplier I can trust for skin peptides',
    body: 'I was skeptical — there are so many fly-by-night operations selling peptides in Canada. But Popular Peptides backed everything up with real lab documentation. The KGLOW arrived well-packaged, the COA matched exactly what was listed, and I had results worth noting in my lab journal within weeks. Already ordered GLOW to run alongside it. Highly recommend.',
    date: '2025-05-03',
    verified: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Dr. James K.',
    location: 'Calgary, AB',
    rating: 5,
    product: 'IGF-1 LR3',
    productSlug: 'igf-1-lr3',
    title: 'Lab-grade quality with documentation to match',
    body: 'As someone who takes purity seriously in my research, the Certificate of Analysis isn't optional — it's non-negotiable. Popular Peptides not only provided it without me asking, but the HPLC results were genuinely impressive. The IGF-1 LR3 performed exactly as expected in our cell culture work. Will be placing another order this week.',
    date: '2025-03-28',
    verified: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Alyssa M.',
    location: 'Montreal, QC',
    rating: 5,
    product: 'Complete Stack',
    productSlug: 'complete-stack',
    title: 'The bundle saved me so much time and money',
    body: 'I used to order compounds one by one from different suppliers and it was a nightmare — inconsistent quality, delayed shipments, no documentation. The Complete Stack solved all of that. One order, one shipment, one set of COAs. The savings compared to ordering individually were significant. I'll never go back to piecing it together myself.',
    date: '2025-05-18',
    verified: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Ryan C.',
    location: 'Edmonton, AB',
    rating: 5,
    product: 'CJC-1295 + Ipamorelin',
    productSlug: 'cjc-ipamorelin',
    title: 'Fast shipping and exactly what was advertised',
    body: 'Ordered on a Tuesday, arrived Thursday. The packaging was professional, cold-pack included, and the compound was exactly as described. Reconstituted cleanly with BAC water (also ordered here) and everything looked right under the microscope. No issues. Already recommended Popular Peptides to two colleagues.',
    date: '2025-04-29',
    verified: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Natalie W.',
    location: 'Ottawa, ON',
    rating: 5,
    product: 'NAD+',
    productSlug: 'nad-plus',
    title: 'Reliable, consistent, and well-documented',
    body: 'I've ordered NAD+ three times now and every batch has been consistent. The COA numbers barely vary — that tells me their quality control is real and not just marketing. The peptide calculator tool on their site is also genuinely useful for our lab protocols. This is a company that clearly cares about what they're selling.',
    date: '2025-05-07',
    verified: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Kevin B.',
    location: 'Winnipeg, MB',
    rating: 5,
    product: 'Tirzepatide',
    productSlug: 'tirzepatide',
    title: 'Top quality with excellent documentation',
    body: 'Switched to Popular Peptides after a bad experience with a US supplier who couldn't provide proper documentation. Night and day difference. The Tirzepatide was exactly on spec, the COA was thorough, and the price per mg is genuinely competitive for the quality level. This is now my go-to for all metabolic peptide research.',
    date: '2025-04-15',
    verified: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Priya S.',
    location: 'Mississauga, ON',
    rating: 5,
    product: 'GHK-Cu',
    productSlug: 'ghk-cu',
    title: 'Outstanding purity and fast delivery',
    body: 'The GHK-Cu is excellent — reconstituted perfectly and the analytical data matched what was advertised. What I appreciate most is that Popular Peptides doesn't make you chase them for documentation. It's all there from the start. That's the mark of a professional operation. Will absolutely be ordering again.',
    date: '2025-03-10',
    verified: true,
    featured: false,
  },
]

export const getFeaturedReviews = () => reviews.filter(r => r.featured)
export const getAllReviews = () => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
