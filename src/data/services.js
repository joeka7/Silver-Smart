// The four service pages share one structure in the design; only content differs.
// Content is transcribed verbatim from service-*.html.

export const SERVICES = {
  property: {
    slug: 'property', n: '01', title: 'Property', navLabel: 'Property',
    kicker: 'We are a property company held to global and international standards.',
    bandSlot: 'Property — exterior / façade',
    lead: 'We are a property company held to global and international standards.',
    body: [
      'Property is a long-horizon responsibility. Value is protected less by the moment of purchase than by how well a building is specified, delivered and looked after over the years that follow.',
      'We work across the United Arab Emirates, bringing design, fit-out and maintenance capability into the same conversation as the property itself — so decisions are made once, with the whole life of the asset in view.',
    ],
    ctaLabel: 'Discuss a property brief',
    scope: [
      { n: '01', title: 'Standards', desc: 'Held to global and international standards across specification, documentation and delivery.' },
      { n: '02', title: 'Handover', desc: 'Coordinated handover, with the record of what was built and how it should be maintained.' },
      { n: '03', title: 'Long-term care', desc: 'Ongoing general maintenance and care, so performance does not drift after completion.' },
    ],
    detailSlot: 'Property — communal interior',
    next: { label: 'Interior Design', to: '/services/interior-design' },
  },
  'interior-design': {
    slug: 'interior-design', n: '02', title: 'Interior Design', navLabel: 'Interior Design',
    kicker: 'Highly efficient and satisfactory designs, delivered with complete project layouts.',
    bandSlot: 'Interior design — plan / concept',
    lead: 'Highly efficient and satisfactory designs, delivered with complete project layouts.',
    body: [
      'Design begins with how a space will actually be used — plan, light, circulation, material. We resolve those decisions before anything is built, so the drawings answer the questions the site will ask.',
      'Every scheme is bespoke: interior design solutions that reflect individual styles and preferences, rather than a house style applied to a floor plan.',
    ],
    ctaLabel: 'Discuss an interior design brief',
    scope: [
      { n: '01', title: 'Spatial planning', desc: 'Layout and circulation studied against how the space will be occupied day to day.' },
      { n: '02', title: 'Complete layouts', desc: 'Full project layouts, so the design is understood the same way by everyone building it.' },
      { n: '03', title: 'Material & colour', desc: 'A palette chosen for the light, the use and the standard of finish intended.' },
    ],
    detailSlot: 'Interior design — completed space',
    next: { label: 'Fit-Out', to: '/services/fit-out' },
  },
  'fit-out': {
    slug: 'fit-out', n: '03', title: 'Fit-Out', navLabel: 'Fit-Out',
    kicker: 'We care about the details of the implementation of projects — colours, materials, decorations.',
    bandSlot: 'Fit-out — joinery & finish detail',
    lead: 'We care about the details of the implementation of projects — colours, materials, decorations.',
    body: [
      'Fit-out is where a design is either honoured or lost. The difference sits in the details of implementation: how a material meets another, how an edge is resolved, how a finish is protected until handover.',
      'We manage execution to the standard the drawings were held to, with the same team accountable from first sketch through to the final walk-through.',
    ],
    ctaLabel: 'Discuss a fit-out brief',
    scope: [
      { n: '01', title: 'Colours & materials', desc: 'Specification carried through to the item actually installed on site.' },
      { n: '02', title: 'Decoration & finishes', desc: 'Finishing work detailed and inspected, because the quality of a space is read at close range.' },
      { n: '03', title: 'Implementation detail', desc: 'Sequence, tolerance and coordination managed so trades do not undo one another.' },
    ],
    detailSlot: 'Fit-out — completed interior',
    next: { label: 'Maintenance', to: '/services/maintenance' },
  },
  maintenance: {
    slug: 'maintenance', n: '04', title: 'Maintenance', navLabel: 'Maintenance',
    kicker: 'A good service in the field of general maintenance and care for all projects.',
    bandSlot: 'Maintenance — building services',
    lead: 'A good service in the field of general maintenance and care for all projects.',
    body: [
      'Our services help you prevent problems before they happen, and fix problems that have already occurred. Maintenance is how a space keeps the standard it was built to.',
      'We are committed to providing our clients with the best possible service — across properties we have delivered and properties we have not.',
    ],
    ctaLabel: 'Discuss a maintenance brief',
    scope: [
      { n: '01', title: 'Preventive care', desc: 'Planned attention to the parts of a building that fail quietly before they fail visibly.' },
      { n: '02', title: 'Reactive response', desc: 'Resolving faults that have already occurred, with the least disruption to the space in use.' },
      { n: '03', title: 'General maintenance', desc: 'Care for all projects — finishes, services and the everyday condition of the property.' },
    ],
    detailSlot: 'Maintenance — finish care detail',
    next: { label: 'Property', to: '/services/property' },
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICES)
