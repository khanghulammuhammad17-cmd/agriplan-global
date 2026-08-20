export const CAT4_CALCULATORS = [
  {
    id: 25,
    slug: 'farm-area-calculator',
    name: 'Farm Area Calculator',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'map',
    shortDesc: 'Convert agricultural land parcels between Hectares, Acres, Square Meters, Feet, Yards, Kanal, and Marla.',
    h1: 'Farm Area Calculator',
    intro: 'Convert farm boundary measurements and land deeds seamlessly across international and regional land tenure standards.',
    formula: '1 Hectare = 10,000 m² = 2.47105 Acres = 19.7684 Kanal; 1 Standard Acre = 8 Kanal = 160 Marla = 43,560 sq ft',
    workedExample: 'Converting 25 Hectares: 25 ha = 61.776 Acres = 250,000 m² = 2,690,978 sq ft = 494.21 Standard Kanal (9,884.2 Marla).',
    assumptions: 'Standard Kanal (5,445 sq ft / 20 Marla) used as default benchmark.',
    limitations: 'In certain parts of northern South Asia, local revenue records may use traditional Shahi Kanal (4,500 sq ft or 5,000 sq ft); always verify regional deed definitions.',
    methodology: 'International System of Units (SI) and regional land registry measurement standards.',
    sources: [
      { title: 'NIST: Guide for the Use of the International System of Units (SI)', url: 'https://www.nist.gov/' },
      { title: 'Land Administration Guidelines for Agricultural Holdings', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      value: 25,
      unit: 'ha'
    },
    relatedSlugs: ['agriculture-unit-converter', 'crop-yield-calculator', 'farm-profit-roi-calculator'],
    faqs: [
      { q: 'How many Marla are in a Kanal and Acre?', a: 'In the standard system, 1 Marla = 272.25 sq ft. 20 Marla = 1 Kanal (5,445 sq ft), and 8 Kanal = 1 Acre (43,560 sq ft = 160 Marla).' }
    ]
  },
  {
    id: 26,
    slug: 'agriculture-unit-converter',
    name: 'Agriculture Unit Converter',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'binary',
    shortDesc: 'Universal multi-parameter agricultural converter for Area, Weight, Volume, Yield, and Application Rates.',
    h1: 'Agriculture Unit Converter',
    intro: 'Instantly convert between metric, imperial, US customary, and traditional agricultural units across area, weight, volume, length, and flow rates.',
    formula: 'Direct multiplier conversion: Value_target = (Value_source × Factor_source) ÷ Factor_target',
    workedExample: 'Convert 150 Bushels/Acre (Wheat @ 60 lb/bu = 9,000 lb/acre) to Metric Tonnes/Hectare: 9,000 lb/acre × 1.12085 = 10,087.6 kg/ha = 10.09 Tonnes/ha.',
    assumptions: 'Standard physical reference densities and dimensional conversion factors.',
    limitations: 'Bushel conversions require correct commodity test weight.',
    methodology: 'NIST Special Publication 811 and ISO 80000 Quantities and Units standards.',
    sources: [
      { title: 'NIST Handbook 44: Specifications and Tolerances for Weighing and Measuring Devices', url: 'https://www.nist.gov/' }
    ],
    defaultInputs: {
      category: 'area',
      value: 100,
      fromUnit: 'ha',
      toUnit: 'acre'
    },
    relatedSlugs: ['farm-area-calculator', 'water-volume-calculator', 'seed-rate-calculator'],
    faqs: [
      { q: 'How to convert kg/ha to lb/acre?', a: 'Multiply kg/ha by 0.892179 to get lb/acre. Conversely, multiply lb/acre by 1.12085 to get kg/ha.' }
    ]
  },
  {
    id: 27,
    slug: 'sprayer-calibration-calculator',
    name: 'Sprayer Calibration Calculator',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'spray-can',
    shortDesc: 'Calibrate boom sprayers: determine application volume (L/ha), tractor speed, tank coverage, and chemical mixing rates.',
    h1: 'Sprayer Calibration Calculator',
    intro: 'Calculate sprayer application rates (L/ha and GPA), spray tank field coverage, and required chemical per tank load following ISO and ASABE sprayer calibration standards.',
    formula: 'Application Rate (L/ha) = [Nozzle Flow (L/min) × 60,000] ÷ [Ground Speed (km/h) × Nozzle Spacing (cm)]',
    workedExample: 'Nozzles discharging 1.2 L/min spaced at 50 cm with tractor speed of 12 km/h: Application Rate = (1.2 × 60,000) ÷ (12 × 50) = 72,000 ÷ 600 = 120.0 L/ha (12.8 Gallons/Acre). A 1,000 L tank covers 8.33 ha. At 1.5 L/ha chemical dose, add 12.50 L of chemical per tank.',
    assumptions: 'Assumes all nozzles across the boom are within ±5% of average flow rate.',
    limitations: 'Worn nozzle tips produce coarse dripping and pattern distortion; check individual nozzle discharge before spraying.',
    methodology: 'ISO 5682 Equipment for crop protection and ASABE S592 calibration standards.',
    sources: [
      { title: 'ISO 5682: Equipment for Crop Protection — Spraying Equipment', url: 'https://www.iso.org/' },
      { title: 'Purdue Extension: Calibrating Field Sprayers (PPP-89)', url: 'https://extension.purdue.edu/' }
    ],
    defaultInputs: {
      nozzleFlowRate: 1.2,
      flowUnit: 'l_min',
      nozzleSpacingCm: 50,
      groundSpeedKmh: 12,
      tankCapacityL: 1000,
      chemicalDosePerHa: 1.5,
      chemicalUnit: 'L'
    },
    relatedSlugs: ['fertilizer-application-rate-calculator', 'agriculture-unit-converter'],
    faqs: [
      { q: 'How does travel speed affect sprayer application rate?', a: 'Application rate is inversely proportional to speed: doubling ground speed cuts application volume in half (e.g. from 120 L/ha to 60 L/ha).' }
    ]
  },
  {
    id: 28,
    slug: 'farm-input-cost-calculator',
    name: 'Farm Input Cost Calculator',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'shopping-cart',
    shortDesc: 'Itemize and aggregate operating expenditures across seeds, fertilizers, chemicals, fuel, labor, and irrigation.',
    h1: 'Farm Input Cost Calculator',
    intro: 'Itemize variable crop input expenses, analyze expense category percentages, and calculate unit-area input costs per hectare and acre with customizable currency.',
    formula: 'Total Input Cost = Σ (Seed + Fertilizer + Irrigation + Chemicals + Labor + Machinery/Fuel + Other); Cost/ha = Total ÷ Area',
    workedExample: '10 ha crop budget: Seed $800, Fertilizer $2,200, Irrigation $950, Chemicals $650, Labor $1,400, Machinery/Fuel $1,800, Other $400: Total Cost = $8,200. Cost per ha = $820.00/ha ($331.84/acre). Fertilizer represents 26.8% and Machinery represents 22.0% of total outlay.',
    assumptions: 'Assumes all input purchases allocated to the specific enterprise season.',
    limitations: 'Excludes land purchase and long-term capital machinery depreciation (use Crop Production Cost Calculator for full budgeting).',
    methodology: 'Agricultural economics enterprise budgeting frameworks.',
    sources: [
      { title: 'USDA-ERS: Commodity Costs and Returns Methodology', url: 'https://www.ers.usda.gov/' },
      { title: 'Iowa State Extension: Ag Decision Maker Crop Budgets', url: 'https://www.extension.iastate.edu/agdm/' }
    ],
    defaultInputs: {
      currency: '$',
      area: 10,
      areaUnit: 'ha',
      seedCost: 800,
      fertilizerCost: 2200,
      irrigationCost: 950,
      cropProtectionCost: 650,
      laborCost: 1400,
      machineryFuelCost: 1800,
      otherCost: 400
    },
    relatedSlugs: ['crop-production-cost-calculator', 'farm-profit-roi-calculator'],
    faqs: [
      { q: 'What is the largest variable input cost in modern crop production?', a: 'Fertilizer and machinery fuel typically constitute 45-60% of total cash operating costs in mechanized grain and oilseed farming.' }
    ]
  },
  {
    id: 29,
    slug: 'crop-production-cost-calculator',
    name: 'Crop Production Cost Calculator',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'calculator',
    shortDesc: 'Comprehensive full-enterprise budgeting: calculate total operating plus overhead costs and break-even unit cost of production.',
    h1: 'Crop Production Cost Calculator',
    intro: 'Calculate total economic cost of production combining direct variable inputs with fixed overheads (land rent, depreciation, marketing) to identify your break-even cost per tonne or bushel.',
    formula: 'Cost of Production = (Direct Operating Costs + Overhead/Fixed Costs) ÷ Total Production Output',
    workedExample: '10 ha producing 50 tonnes total. Direct operating costs = $7,800, Overhead & Land = $2,700. Total Cost = $10,500 ($1,050/ha / $425/acre). Break-even cost of production = $10,500 ÷ 50 = $210.00 / Metric Tonne ($0.210/kg).',
    assumptions: 'Assumes full economic costing including land opportunity cost.',
    limitations: 'Volatile grain market prices require regular updating of revenue assumptions.',
    methodology: 'American Agricultural Economics Association (AAEA) Commodity Cost and Return Estimation Handbook.',
    sources: [
      { title: 'AAEA Task Force on Commodity Costs and Returns', url: 'https://www.aaea.org/' },
      { title: 'University of Illinois farmdoc: Crop Economics and Budgets', url: 'https://farmdoc.illinois.edu/' }
    ],
    defaultInputs: {
      currency: '$',
      area: 10,
      areaUnit: 'ha',
      expectedProductionTonnes: 50,
      landCost: 1500,
      seedCost: 800,
      fertilizerCost: 2200,
      irrigationCost: 900,
      chemicalCost: 600,
      laborCost: 1500,
      machineryCost: 1800,
      postHarvestMarketingCost: 700,
      overheadCost: 500
    },
    relatedSlugs: ['farm-input-cost-calculator', 'farm-profit-roi-calculator', 'crop-yield-calculator'],
    faqs: [
      { q: 'Why calculate break-even cost of production?', a: 'Knowing your exact cost per tonne allows establishing profitable grain forward-contracts and setting target floor stop-loss marketing prices.' }
    ]
  },
  {
    id: 30,
    slug: 'farm-profit-roi-calculator',
    name: 'Farm Profit / ROI Calculator',
    category: 'farm-econ',
    categoryLabel: 'Farm & Agriculture',
    icon: 'coins',
    shortDesc: 'Calculate gross revenue, net farm profit, Return on Investment (ROI %), Benefit-Cost Ratio, and break-even targets.',
    h1: 'Farm Profit / ROI Calculator',
    intro: 'Evaluate financial performance, calculate net farm profit, Return on Investment (ROI), Benefit-Cost Ratio (BCR), and break-even selling prices across agricultural production enterprises.',
    formula: 'Net Profit = Gross Revenue - Total Cost; ROI % = (Net Profit ÷ Total Cost) × 100; BCR = Gross Revenue ÷ Total Cost',
    workedExample: 'Harvesting 45 tonnes sold at $320/tonne from 10 ha (Total Cost = $8,500): Gross Revenue = 45 × $320 = $14,400. Net Profit = $14,400 - $8,500 = $5,900. ROI = ($5,900 ÷ $8,500) × 100 = 69.41%. Benefit-Cost Ratio = 1.69:1. Net Profit/ha = $590.00/ha ($238.77/acre). Break-even yield = 26.56 tonnes (2.66 t/ha).',
    assumptions: 'Assumes all harvest production sold at the stated average market contract price without payment default.',
    limitations: 'Calculates single-cycle seasonal financial metrics; multi-year capital investment compounding requires discounted Net Present Value (NPV).',
    methodology: 'Standard agricultural financial management guidelines (Farm Financial Standards Council - FFSC).',
    sources: [
      { title: 'Farm Financial Standards Council (FFSC) Financial Guidelines for Agriculture', url: 'https://ffsc.org/' },
      { title: 'FAO Agricultural Investment and Financial Analysis', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      currency: '$',
      area: 10,
      areaUnit: 'ha',
      totalProduction: 45,
      productionUnit: 'tonne',
      sellingPricePerUnit: 320,
      totalCost: 8500
    },
    relatedSlugs: ['crop-production-cost-calculator', 'farm-input-cost-calculator', 'crop-yield-calculator'],
    faqs: [
      { q: 'What is a healthy Return on Investment (ROI) in commercial agriculture?', a: 'Commercial crop enterprises typically target 25-45% seasonal ROI on variable operating capital to absorb commodity price swings and climatic risks.' }
    ]
  }
];
