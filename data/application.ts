interface IndustryDetail {
  title: string;
  description?: string;
  images: string[];
  properties?: string[];
}

interface Pro {
  id: number;
  slug: string;
  name: string;
  appli: string[];
  images?: string[];
  description?: string;
  properties?: string[];
  details?: IndustryDetail[];
}

export const pro: Pro[] = [
  {
    id: 1,
    slug: "food-industry",
    name: "Food Industry (Non-Stick)",
    appli: ["Pan", "Dosa Tawa", "Waffle Iron", "Roti-Maker"],
    images: [
      "/assets/foodgrade/food-grade-1.jpg",
      "/assets/foodgrade/food-grade-2.jpg",
      "/assets/foodgrade/food-grade-3.jpg",
      "/assets/foodgrade/food-grade-4.jpg",
      "/assets/foodgrade/food-grade-5.jpg",
      "/assets/foodgrade/food-grade-6.jpg",
      "/assets/foodgrade/food-grade-7.jpg",
    ],
    description:
      "PTFE, or polytetrafluoroethylene, is widely used in the food industry due to its non-stick properties and resistance to chemicals and high temperatures. It is commonly found in applications such as conveyor belts, seals, and coatings for cooking equipment, ensuring compliance with FDA standards for food safety.",
    properties: [
      "Non-stick properties",
      "Chemicals Resistance",
      "High-temperature resistance",
      "Versatile applications",
      "Low Friction Coefficient",
    ],
  },
  {
    id: 2,
    slug: "medical-surgical-industry",
    name: "Medical Surgical Industry",
    appli: ["Nylon Blue"],
    images: [
      "/assets/medical/medical1.jpg",
      "/assets/medical/medical2.jpg",
      "/assets/medical/medical3.jpg",
      "/assets/medical/medical4.jpg",
    ],
    description:
      "The medical surgical industry utilizes advanced materials such as Nylon Blue and PTFE (Polytetrafluoroethylene) to ensure safety, reliability, and performance in medical applications. Nylon Blue is known for its high mechanical strength, chemical resistance, and biocompatibility, making it ideal for surgical instruments and medical device components. PTFE offers exceptional chemical resistance, thermal stability, and low friction, making it suitable for seals, gaskets, and tubing in surgical equipment. Both materials comply with stringent health regulations, ensuring they meet the safety and performance standards required in medical environments.",
    properties: [
      "High Mechanical Strength",
      "Chemical Resistance",
      "Heat Resistance",
      "Low Friction",
      "Biocompatibility",
      "Wear Resistance",
    ],
  },
  {
    id: 3,
    slug: "pharmacutical-industry",
    name: "Pharmacutical Industry",
    appli: ["PTFE", "Halar"],
    images: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
    description:
      "The pharmaceutical industry relies on high-performance materials like PTFE (Polytetrafluoroethylene) and Halar (ECTFE - Ethylene Chlorotrifluoroethylene) for their exceptional properties. PTFE is known for its chemical resistance, thermal stability, and non-toxicity, making it ideal for seals, gaskets, and tubing in pharmaceutical equipment. Halar offers excellent durability and low permeability, making it suitable for tank linings and coatings in harsh environments. Both materials comply with FDA regulations, ensuring safety and efficiency in pharmaceutical processes, from manufacturing to packaging.",
    properties: [
      "Chemical Resistance",
      "Thermal Stability",
      "Non-Toxicity",
      "Durability",
      "Low Permeability",
      "Wear Resistance",
    ]
  },
  {
    id: 4,
    slug: "textile-industry",
    name: "Textile Industry",
    appli: ["Green Roller PTFE"],
    images: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
    description:
    "Textile Industry coatings involve applying a layer of material, typically a polymer or resin, to the surface of fabrics. This process can be performed on various types of textiles, including natural fibers (like cotton and wool) and synthetic fibers (like polyester and nylon). Coatings can be applied using different methods, such as padding, spraying, or roller coating.",
    properties: [
      "Water Resistance",
      "Durability",
      "Stain Resistance",
      "Breathability",
      "UV Protection"
    ]
  },
  {
    id: 5,
    slug: "oil-gas-industry",
    name: "Oil & Gas Industry",
    appli: [],
    images: [
      "/assets/oilandgas/oil-gas-1.jpg",
      "/assets/oilandgas/oil-gas-2.jpg",
      "/assets/oilandgas/oil-gas-3.jpg",
      "/assets/oilandgas/oil-gas-4.jpg",
      "/assets/oilandgas/oil-gas-5.jpg",
      "/assets/oilandgas/oil-gas-6.jpg",
      "/assets/oilandgas/oil-gas-7.jpg",
      "/assets/oilandgas/oil-gas-8.jpg",
      "/assets/oilandgas/oil-gas-9.jpg",
    ],
    description:
    "Coatings are applied to various components and equipment in the oil and gas industry to improve their performance and protect them from damage. These coatings can be applied to pipelines, valves, pumps, tanks, and other critical parts that are exposed to corrosive environments, high temperatures, and mechanical stress.",
    properties: [
      "Chemical Resistance",
      "Temperature Resistance",
      "Corrosion Resistance",
      "Durability",
      "Adhesion"
    ]
  },
  {
    id: 6,
    slug: "automotive-industry",
    name: "Automotive Industry",
    appli: [],
    images: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
  },
  {
    id: 7,
    slug: "engineering-industry",
    name: "Engineering Industry",
    appli: [],
    images: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
  },
];

export const getProBySlug = (slug: string) => {
  return pro.find((pro) => pro.slug === slug);
};
