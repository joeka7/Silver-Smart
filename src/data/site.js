// Silver Smart — content extracted verbatim from the Claude Design source files.
// Company facts (address, phone, socials) match the design bundle and silversmartuae.com.

export const CONTACT = {
  office: 'Abu Dhabi, UAE',
  address: ['Al Musaffah City — Qanuat St', 'Office 27.28, Exalto Emirates Building', 'Abu Dhabi, United Arab Emirates'],
  phone: { label: '02 877 8938', href: 'tel:+97128778938' },
  whatsapp: { label: 'WhatsApp 050 122 6537', href: 'tel:+971501226537' },
  mobile: { label: '050 122 6537', href: 'tel:+971501226537' },
  email: 'info@silversmartuae.com',
}

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/silversmartuae/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61554267073735' },
  { label: 'X', href: 'https://twitter.com/sliversmartuae' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@sliver.smart' },
]

export const NAV = [
  { label: 'Work', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/start-a-project' },
]

export const SERVICE_LINKS = [
  { label: 'Property', to: '/services/property' },
  { label: 'Interior Design', to: '/services/interior-design' },
  { label: 'Fit-Out', to: '/services/fit-out' },
  { label: 'Maintenance', to: '/services/maintenance' },
]

// Home — services index (section 02)
export const HOME_SERVICES = [
  { n: '01', title: 'Property', to: '/services/property', slot: 'Property — building exterior',
    desc: 'A property company held to global and international standards — acquisition, handover and long-term asset care across the Emirates.' },
  { n: '02', title: 'Interior Design', to: '/services/interior-design', slot: 'Interior design — layout / concept',
    desc: 'Highly efficient and satisfactory designs delivered with complete project layouts, drawn around how a space will actually be used.' },
  { n: '03', title: 'Fit-Out', to: '/services/fit-out', slot: 'Fit-out — materials & finishes',
    desc: 'We care about the details of implementation — colours, materials, decoration and the joints between them — from first sketch to handover.' },
  { n: '04', title: 'Maintenance', to: '/services/maintenance', slot: 'Maintenance — building services',
    desc: 'General maintenance and care for all projects: preventing problems before they happen, and resolving those that have already occurred.' },
]

// Home — selected work (section 03)
export const HOME_WORK = [
  { cls: 'p1', n: '01', title: 'Commercial', loc: 'Workspace design', slot: 'Commercial — office workspace',
    desc: 'A complete office design solution — imaginative, distinctive workspaces built for the way teams work.' },
  { cls: 'p2', n: '02', title: 'Corporate', slot: 'Corporate — reception / lobby',
    desc: 'Skilled, knowledgeable teams supporting the full range of business requirements.' },
  { cls: 'p3', n: '03', title: 'Healthcare', loc: 'Safe · Effective · Hospitable', slot: 'Healthcare — clinic interior, wide crop',
    desc: 'Environments designed for patients, employees and guests — safe, effective and hospitable.' },
  { cls: 'p4', n: '04', title: 'Residential', slot: 'Residential — living space detail',
    desc: 'Rethinking what is usually seen as a regular interior, and turning it into an outstanding plan.' },
  { cls: 'p5', n: '05', title: 'Hospitality', slot: 'Hospitality — lounge / restaurant',
    desc: 'Dedicated to offering the best possible service and support to our clients and their guests.' },
  { cls: 'p6', n: '06', title: 'Maintenance', loc: 'Preventive & reactive', slot: 'Maintenance — building systems detail',
    desc: 'Preventing problems before they happen, and fixing those that have already occurred.' },
]

// Retained for dedicated pages — no longer rendered on the reduced Home page.
export const APPROACH = [
  { n: '01', title: 'Discover', desc: 'We start with the brief, the site and the people who will use it — understanding unique needs before anything is drawn.' },
  { n: '02', title: 'Design', desc: 'Complete project layouts and personalised solutions, resolved on paper so decisions are made before work begins.' },
  { n: '03', title: 'Execute', desc: 'Fit-out with attention to the details of implementation — colours, materials, decoration, tolerances and finishes.' },
  { n: '04', title: 'Deliver', desc: 'Handover, then general maintenance and care — keeping the space performing to the standard it was built to.' },
]

export const WHY = [
  { title: 'Professional specialists', desc: 'Experienced professionals across property, design, fit-out and maintenance, accountable from first brief to final handover.' },
  { title: 'Precise builders', desc: 'We care about the details of implementation, because the quality of a space is decided in its joints, edges and finishes.' },
  { title: 'Brilliant ideas', desc: 'Creativity applied with discipline: bespoke solutions that reflect individual styles and preferences, not a house template.' },
]

// Retained for dedicated pages — no longer rendered on the reduced Home page.
export const TESTIMONIALS = [
  { quote: '“Silver Smart delivered beyond our expectations. Their team not only completed our project on time but also stayed within our budget. The dedication and skill they brought to our home renovation were exceptional.”', name: 'Mohammad Ali', role: 'Residential' },
  { quote: '“Their team was attentive, responsive, and creative in finding solutions to design challenges. The end result is a beautiful, functional space that I absolutely love.”', name: 'Rashid Saeed', role: 'Property' },
  { quote: '“They took our vision and turned it into a reality. The attention to detail and quality of their work is unmatched. Our home now feels like a work of art.”', name: 'Sultan Majid', role: 'Interior design' },
]

export const CLIENTS = ['KMIST Hub', 'Everlast', 'EGY Frame', 'Alpha Digital Productions']

export const SECTORS = [
  { id: 's01', n: '01', title: 'Commercial', cap: 'Workspace design',
    desc: 'A full, complete office design solution — creating imaginative and distinctive workspaces.',
    slotA: 'Commercial — open workspace', slotB: 'Commercial — meeting room detail' },
  { id: 's02', n: '02', title: 'Corporate', cap: 'Headquarters & offices',
    desc: 'Skilled and knowledgeable teams that can assist with any of your business needs.',
    slotA: 'Corporate — reception / lobby', slotB: 'Corporate — boardroom detail' },
  { id: 's03', n: '03', title: 'Healthcare', cap: 'Clinics & facilities',
    desc: 'Designing safe, effective and hospitable environments for patients, employees and guests.',
    slotA: 'Healthcare — reception interior', slotB: 'Healthcare — treatment room' },
  { id: 's04', n: '04', title: 'Residential', cap: 'Villas & apartments',
    desc: 'Rethinking what is typically seen as a regular interior and turning it into an outstanding plan.',
    slotA: 'Residential — living space', slotB: 'Residential — joinery detail' },
  { id: 's05', n: '05', title: 'Hospitality', cap: 'Hotels & venues',
    desc: 'Dedicated to offering the best possible service and support to our clients and their guests.',
    slotA: 'Hospitality — lounge', slotB: 'Hospitality — material detail' },
  { id: 's06', n: '06', title: 'Maintenance', cap: 'Preventive & reactive',
    desc: 'Preventing problems before they happen, and fixing those that have already occurred.',
    slotA: 'Maintenance — building systems', slotB: 'Maintenance — finish care' },
]

export const SPECIALISATION = SECTORS.map(({ n, title, desc }) => ({ n, title, desc }))
