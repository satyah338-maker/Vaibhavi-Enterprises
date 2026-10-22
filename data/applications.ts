export interface Application {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  industries: string[];
  productSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const applications: Application[] = [
  {
    id: "chemical-processing",
    name: "Chemical Processing & Storage",
    slug: "chemical-processing",
    description:
      "High-performance fluoropolymer coatings and porous plastic filter media engineered for chemical processing plants, storage tanks, reactors, and corrosive chemical environments across Maharashtra and India.",
    shortDescription:
      "Fluoropolymer coatings and filter media for chemical plants, storage tanks, and corrosive environments.",
    industries: [
      "Chemical Industry",
      "Pharmaceutical",
      "Laboratory Equipment",
      "Clean Room Technology",
      "Semiconductor",
    ],
    productSlugs: [
      "ptfe-coating",
      "halar-ectfe-coating",
      "fluoropolymer-coating",
      "porous-plastic-filter-sheets",
      "porous-plastic-products",
    ],
    metaTitle:
      "Chemical Processing Coatings & Filters | Vaibhavi Enterprises Maharashtra",
    metaDescription:
      "Chemical processing coatings and porous plastic filter media for corrosive environments. Serving chemical plants across Mumbai, Pune, Nashik, Thane, and all Maharashtra. PTFE, HALAR, ECTFE coatings and Vaicon filters.",
  },
  {
    id: "food-beverage",
    name: "Food & Beverage Processing",
    slug: "food-beverage",
    description:
      "FDA-compliant non-stick PTFE coatings and porous plastic filtration solutions for food processing equipment, conveyors, cookware, and beverage production lines.",
    shortDescription:
      "FDA-compliant non-stick coatings and filtration for food and beverage processing equipment.",
    industries: ["Food Processing", "Beverage Industry", "Dairy", "Bakery", "Commercial Kitchens"],
    productSlugs: ["ptfe-coating", "fluoropolymer-coating", "porous-plastic-filter-sheets", "porous-plastic-products"],
    metaTitle:
      "Food & Beverage Processing Coatings & Filters | Vaibhavi Enterprises",
    metaDescription:
      "FDA-compliant non-stick PTFE coatings and porous plastic filters for food and beverage processing. Serving food processing units across Mumbai, Pune, Nashik, and Maharashtra.",
  },
  {
    id: "pharmaceutical-medical",
    name: "Pharmaceutical & Medical",
    slug: "pharmaceutical-medical",
    description:
      "PTFE, HALAR, and sintered porous plastic filter media for pharmaceutical manufacturing, medical devices, laboratory equipment, and clean-room applications.",
    shortDescription:
      "High-purity coatings and filter media for pharma, medical devices, and laboratory applications.",
    industries: ["Pharmaceutical", "Medical Devices", "Healthcare", "Biotechnology", "Laboratory Equipment"],
    productSlugs: ["halar-ectfe-coating", "fluoropolymer-coating", "porous-plastic-filter-sheets", "porous-plastic-products"],
    metaTitle:
      "Pharmaceutical & Medical Coatings & Filters | Vaibhavi Enterprises",
    metaDescription:
      "Pharmaceutical grade coatings and porous plastic filter media for pharma, medical devices, and labs. Serving pharmaceutical companies across Mumbai, Pune, Aurangabad, and Maharashtra.",
  },
  {
    id: "oil-gas",
    name: "Oil & Gas | Pipeline",
    slug: "oil-gas",
    description:
      "Fusion Bonded Epoxy (FBE) coatings and corrosion-resistant solutions for pipelines, valves, tanks, refineries, and offshore structures across Maharashtra's industrial belt.",
    shortDescription:
      "FBE and corrosion-resistant coatings for oil & gas pipelines, valves, tanks, and offshore structures.",
    industries: ["Oil and Gas", "Construction", "Marine", "Water Treatment", "Mining", "Infrastructure"],
    productSlugs: ["fusion-bonded-epoxy-coating", "ptfe-coating", "halar-ectfe-coating", "porous-plastic-filter-sheets"],
    metaTitle:
      "Oil & Gas Pipeline Coatings | FBE Coating Maharashtra | Vaibhavi Enterprises",
    metaDescription:
      "FBE coating and corrosion protection for oil & gas pipelines, valves, tanks, and offshore structures. Serving Maharashtra's oil and gas sector.",
  },
  {
    id: "water-treatment",
    name: "Water & Wastewater Treatment",
    slug: "water-treatment",
    description:
      "Porous plastic filter media and corrosion-resistant coatings for water treatment plants, filtration systems, pump stations, and wastewater treatment facilities.",
    shortDescription:
      "Filter media and coatings for water and wastewater treatment plants and filtration systems.",
    industries: ["Water Treatment", "Chemical Industry", "Municipal", "Infrastructure"],
    productSlugs: ["porous-plastic-filter-sheets", "porous-plastic-products", "fusion-bonded-epoxy-coating"],
    metaTitle:
      "Water Treatment Coatings & Filter Media | Vaibhavi Enterprises Maharashtra",
    metaDescription:
      "Water and wastewater treatment coatings and porous plastic filter media. Serving water treatment plants across Mumbai, Thane, Pune, Nagpur, and Maharashtra.",
  },
  {
    id: "automotive",
    name: "Automotive & Transportation",
    slug: "automotive",
    description:
      "PTFE and fluoropolymer coatings for automotive components, fasteners, valves, pumps, and transportation equipment requiring low friction and chemical resistance.",
    shortDescription:
      "Low-friction PTFE and fluoropolymer coatings for automotive components and transportation equipment.",
    industries: ["Automotive Industry", "Manufacturing", "Transportation"],
    productSlugs: ["ptfe-coating", "fluoropolymer-coating"],
    metaTitle:
      "Automotive Component Coatings | PTFE Coating Maharashtra | Vaibhavi Enterprises",
    metaDescription:
      "PTFE and fluoropolymer coatings for automotive components, fasteners, valves, and pumps. Serving automotive manufacturers across Maharashtra.",
  },
  {
    id: "industrial-machinery",
    name: "Industrial Machinery & Equipment",
    slug: "industrial-machinery",
    description:
      "Protective coatings and filtration solutions for industrial machinery, process equipment, heat exchangers, mixing tanks, and manufacturing plants.",
    shortDescription:
      "Protective coatings and filtration for industrial machinery and process equipment.",
    industries: ["Manufacturing", "Chemical Industry", "Power Generation", "Industrial Processing"],
    productSlugs: ["ptfe-coating", "fluoropolymer-coating", "fusion-bonded-epoxy-coating", "porous-plastic-filter-sheets", "porous-plastic-products"],
    metaTitle:
      "Industrial Machinery Coatings & Filters | Maharashtra | Vaibhavi Enterprises",
    metaDescription:
      "Protective coatings and porous plastic filters for industrial machinery and process equipment. Serving manufacturers across Maharashtra.",
  },
  {
    id: "marine-offshore",
    name: "Marine & Offshore",
    slug: "marine-offshore",
    description:
      "Corrosion-resistant coatings for marine applications, offshore structures, ship components, and saltwater-exposed equipment.",
    shortDescription:
      "Corrosion-resistant coatings for marine, offshore, and saltwater-exposed equipment.",
    industries: ["Marine", "Offshore Industry", "Oil and Gas"],
    productSlugs: ["fusion-bonded-epoxy-coating", "halar-ectfe-coating"],
    metaTitle:
      "Marine & Offshore Corrosion Coatings | Maharashtra | Vaibhavi Enterprises",
    metaDescription:
      "Marine and offshore corrosion-resistant coatings for ships, offshore structures, and saltwater equipment. Serving Maharashtra's coastal and offshore sector.",
  },
];

export const getApplicationBySlug = (slug: string): Application | undefined => {
  return applications.find((app) => app.slug === slug);
};

export const getApplicationsByProductSlug = (productSlug: string): Application[] => {
  return applications.filter((app) => app.productSlugs.includes(productSlug));
};
