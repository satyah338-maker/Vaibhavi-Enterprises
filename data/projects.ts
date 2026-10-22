export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  location: string;
  year: string;
  client: string;
  industries: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    id: "ongc-pipeline",
    name: "ONGC Pipeline Corrosion Protection",
    slug: "ongc-pipeline-corrosion-protection",
    category: "Oil & Gas",
    description:
      "Applied Fusion Bonded Epoxy (FBE) coating to 12km of pipeline infrastructure for ONGC's western offshore facilities. The coating provides long-term corrosion resistance in saltwater and petrochemical environments.",
    shortDescription:
      "FBE coating for 12km of ONGC pipeline infrastructure in offshore environment.",
    image: "/assets/fbe/fbe1.jpg",
    location: "Mumbai, Maharashtra",
    year: "2024",
    client: "Oil & Natural Gas Corporation (ONGC)",
    industries: ["Oil and Gas", "Energy"],
    challenges: [
      "High salinity marine environment",
      "Extreme temperature variations",
      "Long-term corrosion resistance required",
    ],
    solutions: [
      "Fusion Bonded Epoxy (FBE) coating system",
      "Surface preparation to SSPC-SP10 standard",
      "Holiday testing for coating integrity",
    ],
    results: [
      "Zero coating failure after 18 months",
      "Extended asset life by 15+ years",
      "Reduced maintenance costs by 40%",
    ],
  },
  {
    id: "godrej-ptfe",
    name: "Godrej & Boyce Non-Stick Coating",
    slug: "godrej-ptfe-non-stick-coating",
    category: "Coatings",
    description:
      "Whitford Quality Approved PTFE (Xylan) coating applied to industrial molds and dies for Godrej & Boyce manufacturing facilities. Provides superior release properties and chemical resistance.",
    shortDescription:
      "PTFE Xylan coating for industrial molds and dies at Godrej & Boyce.",
    image: "/assets/ptfe/non-stick-1.jpg",
    location: "Mumbai, Maharashtra",
    year: "2024",
    client: "Godrej & Boyce",
    industries: ["Manufacturing", "Automotive"],
    challenges: [
      "High-temperature release requirements",
      "Chemical exposure resistance",
      "Food-grade compliance needed",
    ],
    solutions: [
      "Whitford Xylan PTFE coating",
      "Multi-layer application system",
      "FDA-compliant formulation",
    ],
    results: [
      "95% reduction in mold release agents",
      "3x longer mold life",
      "Improved product surface finish",
    ],
  },
  {
    id: "lnt-halar",
    name: "L&T Chemical Storage Tanks",
    slug: "lt-halar-chemical-storage-tanks",
    category: "Coatings",
    description:
      "HALAR (ECTFE) coating applied to chemical storage tanks at L&T's industrial facility. Provides exceptional chemical resistance and barrier properties for harsh chemical storage.",
    shortDescription:
      "HALAR ECTFE coating for chemical storage tanks at L&T facility.",
    image: "/assets/halar/halar-coating-1.jpg",
    location: "Pune, Maharashtra",
    year: "2023",
    client: "Larsen & Toubro (L&T)",
    industries: ["Chemical Processing", "Construction"],
    challenges: [
      "Aggressive chemical storage",
      "Permeation resistance required",
      "UV exposure protection",
    ],
    solutions: [
      "HALAR (ECTFE) fluoropolymer coating",
      "UV-stable topcoat system",
      "Holiday and adhesion testing",
    ],
    results: [
      "Zero permeation after 24 months",
      "100% coating adhesion maintained",
      "Compliance with environmental regulations",
    ],
  },
  {
    id: "mafatlal-textile",
    name: "Mafatlal Textile Roller Coating",
    slug: "mafatlal-textile-roller-coating",
    category: "Coatings",
    description:
      "PTFE-coated rollers and components for Mafatlal's textile manufacturing line. Reduces yarn breakage and improves fabric quality through non-stick surface properties.",
    shortDescription:
      "PTFE-coated rollers for Mafatlal textile manufacturing.",
    image: "/assets/ptfe/corrosion-resistance.jpg",
    location: "Mumbai, Maharashtra",
    year: "2023",
    client: "Mafatlal Industries",
    industries: ["Textile", "Manufacturing"],
    challenges: [
      "Yarn breakage due to friction",
      "Fabric staining from roller residue",
      "High-speed production requirements",
    ],
    solutions: [
      "PTFE non-stick roller coating",
      "Precision thickness control",
      "Heat-resistant formulation",
    ],
    results: [
      "60% reduction in yarn breakage",
      "Improved fabric quality grade",
      "Increased production throughput",
    ],
  },
  {
    id: "pharma-filters",
    name: "Pharma Filter Media Installation",
    slug: "pharma-filter-media-installation",
    category: "Filters",
    description:
      "Vaicon porous plastic filter sheets installed in pharmaceutical manufacturing facility for sterile filtration. Meets FDA compliance and ISO 9001:2015 standards.",
    shortDescription:
      "Vaicon porous plastic filters for pharmaceutical sterile filtration.",
    image: "/assets/porousfilters/porous-plastic-filter-sheets-1.jpg",
    location: "Aurangabad, Maharashtra",
    year: "2024",
    client: "Leading Pharma Company",
    industries: ["Pharmaceutical", "Healthcare"],
    challenges: [
      "Sterile filtration requirements",
      "FDA compliance mandatory",
      "Consistent pore distribution needed",
    ],
    solutions: [
      "Sintered UHMWPE filter media",
      "Custom pore sizing",
      "Clean-room packaging",
    ],
    results: [
      "100% batch compliance rate",
      "Reduced filtration cycle time",
      "Zero contamination incidents",
    ],
  },
  {
    id: "birla-watertreatment",
    name: "Birla Group Water Treatment",
    slug: "birla-group-water-treatment",
    category: "Filters",
    description:
      "Corrosion-resistant coatings and porous plastic filtration for Birla Group's water treatment plant. Protects against chemical exposure and ensures clean water output.",
    shortDescription:
      "Coatings and filtration for Birla Group water treatment plant.",
    image: "/assets/fbe/fbe2.jpg",
    location: "Nagpur, Maharashtra",
    year: "2023",
    client: "Birla Group",
    industries: ["Water Treatment", "Manufacturing"],
    challenges: [
      "Chemical exposure in treatment process",
      "Corrosion protection for tanks",
      "High-volume filtration needed",
    ],
    solutions: [
      "FBE coating for storage tanks",
      "Porous plastic filter sheets",
      "UV-resistant topcoat",
    ],
    results: [
      "Extended tank life by 10+ years",
      "Improved water quality output",
      "Reduced downtime for maintenance",
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
