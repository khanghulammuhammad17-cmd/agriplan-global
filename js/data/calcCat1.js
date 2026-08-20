export const CAT1_CALCULATORS = [
  {
    id: 1,
    slug: 'seed-rate-calculator',
    name: 'Seed Rate Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'sprout',
    shortDesc: 'Calculate required seed quantities adjusted for Pure Live Seed (PLS), germination rate, and seed purity.',
    h1: 'Seed Rate Calculator',
    intro: 'Calculate exact seed requirements for field crops and horticulture, accounting for Pure Live Seed (PLS) index, lab germination rate, and physical seed lot purity.',
    formula: 'Seed Required = (Area × Recommended Seed Rate) ÷ [(Germination % ÷ 100) × (Purity % ÷ 100)]',
    workedExample: 'For 5 hectares of Winter Wheat with a target rate of 140 kg/ha, 92% germination, and 98% purity: PLS = (0.92 × 0.98) = 0.9016. Adjusted Rate = 140 ÷ 0.9016 = 155.28 kg/ha. Total Seed = 5 × 155.28 = 776.4 kg.',
    assumptions: 'Assumes uniform seed drill distribution and typical seedbed emergence losses. In harsh or cloddy seedbeds, an additional 10-15% field emergence allowance should be added.',
    limitations: 'Laboratory germination tests represent ideal conditions (constant 20°C with optimal moisture) and may exceed real-world field emergence in cold or crusted soils.',
    methodology: 'Calculation methodology adheres to International Seed Testing Association (ISTA) and University Agricultural Extension Pure Live Seed (PLS) protocols.',
    sources: [
      { title: 'FAO Seed Production and Quality Control Manual', url: 'https://www.fao.org/agriculture/crops/thematic-sitemap/theme/seeds-pgr/en/' },
      { title: 'Penn State Extension: Pure Live Seed Calculation Guide', url: 'https://extension.psu.edu/' },
      { title: 'USDA-NRCS Technical Note: Seed Rate and Pure Live Seed Adjustments', url: 'https://www.nrcs.usda.gov/' }
    ],
    defaultInputs: {
      area: 5,
      areaUnit: 'ha',
      recommendedRate: 140,
      rateUnit: 'kg_ha',
      germinationPct: 92,
      purityPct: 98,
      adjustForQuality: true
    },
    relatedSlugs: ['seeding-density-calculator', 'plant-population-calculator', 'germination-rate-calculator', 'crop-spacing-calculator'],
    faqs: [
      { q: 'What is Pure Live Seed (PLS)?', a: 'Pure Live Seed (PLS) indicates the actual percentage of viable seed in a seed lot, calculated by multiplying physical purity percentage by germination percentage.' },
      { q: 'Why should I adjust seed rate for germination?', a: 'Unadjusted seed rates cause thin crop canopies, increased weed competition, and yield loss when seed lots have lower germination or foreign matter.' }
    ]
  },
  {
    id: 2,
    slug: 'seeding-density-calculator',
    name: 'Seeding Density Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'grid-3x3',
    shortDesc: 'Convert seed weight and Thousand Kernel Weight (TKW) into seeds per square meter, hectare, and acre.',
    h1: 'Seeding Density Calculator',
    intro: 'Determine exact target seed density per square meter and field units based on Thousand Kernel Weight (TKW / TGW) or seed count per kilogram.',
    formula: 'Seeds/m² = [Total Seed Weight (kg) × 1,000,000] ÷ [TKW (g) × Field Area (m²)]',
    workedExample: 'Seeding 120 kg/ha of barley with a TKW of 45g into 1 hectare (10,000 m²): Seeds/m² = (120 × 1,000,000) ÷ (45 × 10,000) = 267 seeds/m² (2,670,000 seeds/ha).',
    assumptions: 'Assumes uniform seed weight distribution across the grain lot.',
    limitations: 'TKW varies significantly between crop varieties, harvest seasons, and seed sizing screens.',
    methodology: 'Based on standard agronomic seeding rate equations established by AHDB (Agriculture and Horticulture Development Board) and CIMMYT.',
    sources: [
      { title: 'AHDB Cereals & Oilseeds: Wheat & Barley Growth Guide', url: 'https://ahdb.org.uk/' },
      { title: 'CIMMYT Agronomy Field Handbook', url: 'https://www.cimmyt.org/' }
    ],
    defaultInputs: {
      seedQuantity: 120,
      seedWeightUnit: 'kg',
      area: 1,
      areaUnit: 'ha',
      thousandKernelWeight: 42
    },
    relatedSlugs: ['seed-rate-calculator', 'plant-population-calculator', 'crop-spacing-calculator'],
    faqs: [
      { q: 'What is Thousand Kernel Weight (TKW)?', a: 'TKW (or Thousand Grain Weight - TGW) is the weight in grams of 1,000 seeds. It allows converting grain mass into precise seed numbers.' }
    ]
  },
  {
    id: 3,
    slug: 'plant-population-calculator',
    name: 'Plant Population Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'users',
    shortDesc: 'Estimate total plant stand per hectare and acre from row spacing and in-row plant distance.',
    h1: 'Plant Population Calculator',
    intro: 'Estimate theoretical and established plant population density based on row width, in-row plant spacing, and field emergence percentage.',
    formula: 'Plants/ha = 10,000 ÷ [Row Spacing (m) × Plant Spacing (m)] × (Establishment % ÷ 100)',
    workedExample: 'Maize planted at 75 cm (0.75 m) row spacing and 20 cm (0.20 m) plant spacing with 85% emergence: Area per plant = 0.75 × 0.20 = 0.15 m². Plants/ha = (10,000 ÷ 0.15) × 0.85 = 56,667 plants/ha.',
    assumptions: 'Assumes equidistant plant spacing along rows without skipped planter units.',
    limitations: 'Does not account for double-drops or planter meter bounce.',
    methodology: 'Derived from standard row crop geometry formulas published by Iowa State University Extension and Purdue Agronomy.',
    sources: [
      { title: 'Iowa State University Extension: Corn Planting Guide', url: 'https://extension.iastate.edu/' },
      { title: 'Purdue University Extension: Assessing Plant Stands', url: 'https://extension.purdue.edu/' }
    ],
    defaultInputs: {
      area: 10,
      areaUnit: 'ha',
      rowSpacing: 75,
      rowSpacingUnit: 'cm',
      plantSpacing: 20,
      plantSpacingUnit: 'cm',
      expectedEstablishmentPct: 88
    },
    relatedSlugs: ['crop-spacing-calculator', 'seed-rate-calculator', 'crop-yield-calculator'],
    faqs: [
      { q: 'How does plant population impact yield?', a: 'Optimum plant population maximizes sunlight interception. Too dense causes lodging and barren stalks; too sparse fails to capture available photosynthetic radiation.' }
    ]
  },
  {
    id: 4,
    slug: 'crop-yield-calculator',
    name: 'Crop Yield Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'trending-up',
    shortDesc: 'Estimate total gross harvest production from field area and expected yield per unit area.',
    h1: 'Crop Yield Calculator',
    intro: 'Project total field harvest volume and convert between metric tonnes, kilograms, bushels, and hundredweight based on anticipated crop yield benchmarks.',
    formula: 'Total Expected Production = Farm Area × Expected Yield per Unit Area',
    workedExample: 'A 25-hectare canola field with an expected yield of 3.2 tonnes/ha: Total Production = 25 × 3.2 = 80.0 Metric Tonnes (80,000 kg / 176,370 lbs).',
    assumptions: 'Assumes uniform agronomic management and typical seasonal weather across the entire acreage.',
    limitations: 'Actual yields vary due to microclimate, hail, pest outbreaks, lodging, and combine harvesting efficiency.',
    methodology: 'Standard enterprise crop budgeting and production estimation methodology.',
    sources: [
      { title: 'FAOSTAT: Crop Production Methodologies and Statistics', url: 'https://www.fao.org/faostat/' },
      { title: 'USDA-NASS Crop Production Estimation Handbook', url: 'https://www.nass.usda.gov/' }
    ],
    defaultInputs: {
      area: 25,
      areaUnit: 'ha',
      yieldPerUnit: 3.5,
      yieldUnit: 'tonnes_ha'
    },
    relatedSlugs: ['harvest-yield-calculator', 'crop-area-calculator', 'farm-profit-roi-calculator'],
    faqs: [
      { q: 'How can I convert bushels to tonnes?', a: 'Bushel weight depends on test weight: standard wheat/soybeans = 60 lb/bu (36.74 bu/tonne), corn = 56 lb/bu (39.37 bu/tonne), barley = 48 lb/bu (45.93 bu/tonne).' }
    ]
  },
  {
    id: 5,
    slug: 'harvest-yield-calculator',
    name: 'Harvest Yield Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'scale',
    shortDesc: 'Calculate actual realized harvest yield per hectare, acre, and square meter from scale weigh tickets.',
    h1: 'Harvest Yield Calculator',
    intro: 'Compute true post-harvest field productivity from delivered grain elevator weight tickets or weighbridge scales.',
    formula: 'Yield per Area = Total Harvested Production ÷ Total Harvested Area',
    workedExample: 'A harvested block of 12 hectares delivered 54 metric tonnes: Yield = 54 ÷ 12 = 4.50 Tonnes/ha (4,500 kg/ha / 4,015 lb/acre / 67.0 bu/acre).',
    assumptions: 'Assumes production weights are adjusted to standard commercial moisture basis (e.g. 14.5% for wheat, 15.5% for corn).',
    limitations: 'Grain moisture above standard requires drying shrinkage deductions.',
    methodology: 'Standard agricultural economics and crop reporting yield calculation standard.',
    sources: [
      { title: 'University of Nebraska-Lincoln Extension: Grain Yield Calculation', url: 'https://extension.unl.edu/' },
      { title: 'Kansas State University Extension: Crop Yield Measurements', url: 'https://www.ksre.k-state.edu/' }
    ],
    defaultInputs: {
      harvestedProduction: 54,
      productionUnit: 'tonne',
      harvestedArea: 12,
      areaUnit: 'ha'
    },
    relatedSlugs: ['crop-yield-calculator', 'farm-profit-roi-calculator', 'crop-production-cost-calculator'],
    faqs: [
      { q: 'Why is standard moisture adjustment important?', a: 'High moisture grain weighs more due to water content. Commercial elevators discount or dock moisture above contract grade.' }
    ]
  },
  {
    id: 6,
    slug: 'crop-area-calculator',
    name: 'Crop Area Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'maximize-2',
    shortDesc: 'Determine the land area required to meet specific production targets or delivery contracts.',
    h1: 'Crop Area Calculator',
    intro: 'Calculate the total planting area required to fulfill harvest contracts or animal feed requirements, including risk and yield variation safety buffers.',
    formula: 'Required Area = [Target Production ÷ Expected Yield] × (1 + Safety Buffer % ÷ 100)',
    workedExample: 'Targeting 200 tonnes of silage maize with expected yield of 40 tonnes/ha and a 10% safety buffer: Base Area = 200 ÷ 40 = 5.0 ha. Buffered Area = 5.0 × 1.10 = 5.50 ha (13.59 Acres).',
    assumptions: 'Assumes average regional yield expectations without catastrophic weather events.',
    limitations: 'Seasonal yield swings may require contract forward-pricing or crop insurance hedging.',
    methodology: 'Farm planning and supply chain agricultural procurement methodology.',
    sources: [
      { title: 'FAO Farm Planning and Management Guidelines', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      targetProduction: 200,
      targetUnit: 'tonne',
      expectedYield: 40,
      yieldUnit: 'tonnes_ha',
      safetyBufferPct: 10
    },
    relatedSlugs: ['crop-yield-calculator', 'farm-area-calculator', 'seed-rate-calculator'],
    faqs: [
      { q: 'Why add a safety buffer to planting area?', a: 'Field corners, headland compaction, wildlife grazing, and weather variability often reduce net harvestable area by 5-10%.' }
    ]
  },
  {
    id: 7,
    slug: 'crop-spacing-calculator',
    name: 'Crop Spacing Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'move-horizontal',
    shortDesc: 'Determine in-row seed and plant spacing based on target population and planter row width.',
    h1: 'Crop Spacing Calculator',
    intro: 'Calculate exact in-row seed spacing (in centimeters and inches) and linear seed delivery per meter of row based on target plant population density.',
    formula: 'In-Row Spacing (m) = 10,000 ÷ [Target Population (plants/ha) × Row Width (m)]',
    workedExample: 'For a target population of 75,000 plants/ha with 75 cm (0.75 m) row width: In-Row Spacing = 10,000 ÷ (75,000 × 0.75) = 0.1778 m = 17.8 cm (7.0 inches). Plants per linear meter = 5.62.',
    assumptions: 'Assumes uniform row width across all planter box sections.',
    limitations: 'Planter sprocket ratios and vacuum plate cell counts must be matched to calculated spacing.',
    methodology: 'Agricultural engineering standards for precision planter calibration (ASABE S343).',
    sources: [
      { title: 'ASABE Standards: Precision Planter Spacing Calibration', url: 'https://www.asabe.org/' },
      { title: 'University of Illinois Extension: Planter Calibration Guide', url: 'https://extension.illinois.edu/' }
    ],
    defaultInputs: {
      targetPopulation: 75000,
      populationUnit: 'per_ha',
      rowSpacing: 75,
      rowSpacingUnit: 'cm'
    },
    relatedSlugs: ['plant-population-calculator', 'seed-rate-calculator', 'seeding-density-calculator'],
    faqs: [
      { q: 'How do I check planter in-row spacing in the field?', a: 'Dig up a 3-meter section of row before closing wheels pack the furrow, measure distances between seeds, and verify average.' }
    ]
  },
  {
    id: 8,
    slug: 'germination-rate-calculator',
    name: 'Germination Rate Calculator',
    category: 'crop-seed',
    categoryLabel: 'Crop & Seed',
    icon: 'activity',
    shortDesc: 'Calculate seed germination percentage, lot viability index, and quality classification.',
    h1: 'Germination Rate Calculator',
    intro: 'Assess seed viability and vigor using standard paper towel, ragdoll, or petri dish germination bioassays.',
    formula: 'Germination % = (Germinated Normal Seeds ÷ Total Seeds Tested) × 100',
    workedExample: 'Testing 200 seeds in 4 replicates of 50: 176 seeds germinated normally: Germination % = (176 ÷ 200) × 100 = 88.0% (Good commercial seed quality rating).',
    assumptions: 'Assumes standard incubation temperature (20-25°C) and adequate moisture maintained for the required test duration (7-14 days).',
    limitations: 'Does not measure cold vigor or seedling growth under cold/wet stress (use Accelerated Aging or Cold Test for vigor).',
    methodology: 'International Seed Testing Association (ISTA) and AOSA standard germination testing rules.',
    sources: [
      { title: 'International Seed Testing Association (ISTA) Rules', url: 'https://www.seedtest.org/' },
      { title: 'Association of Official Seed Analysts (AOSA) Rules for Testing Seeds', url: 'https://www.analyzeseeds.com/' }
    ],
    defaultInputs: {
      seedsTested: 200,
      seedsGerminated: 176,
      abnormalSprouts: 8,
      deadSeeds: 16
    },
    relatedSlugs: ['seed-rate-calculator', 'seeding-density-calculator'],
    faqs: [
      { q: 'How many seeds should I test for a reliable home germination test?', a: 'At least 100 seeds (preferably two replicates of 50 or four replicates of 25) should be tested for statistical accuracy.' }
    ]
  }
];
