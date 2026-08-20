export const CAT2_CALCULATORS = [
  {
    id: 9,
    slug: 'fertilizer-requirement-calculator',
    name: 'Fertilizer Requirement Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'flask-conical',
    shortDesc: 'Calculate commercial fertilizer quantities needed to supply target nutrients with soil test credits.',
    h1: 'Fertilizer Requirement Calculator',
    intro: 'Determine exact commercial fertilizer application rates based on target nutrient requirements, fertilizer nutrient analysis percentage, and soil-test available credits.',
    formula: 'Fertilizer Required = (Target Nutrient - Soil Credit) ÷ [Fertilizer Nutrient % ÷ 100]',
    workedExample: 'To supply 120 kg N/ha using Urea (46-0-0) with a 20 kg/ha soil nitrate credit on a 4 ha field: Net N = 100 kg/ha. Urea Rate = 100 ÷ 0.46 = 217.39 kg/ha. Total Urea = 4 × 217.39 = 869.6 kg (~18 bags of 50kg).',
    assumptions: 'Assumes fertilizer nutrient grade is guaranteed analysis as stated on the product label.',
    limitations: 'Nutrient application efficiency varies with soil pH, placement (broadcast vs banded), rainfall, and volatilization risk.',
    methodology: 'University soil-testing and fertilizer recommendation frameworks (e.g. Tri-State Fertilizer Guidelines).',
    sources: [
      { title: 'Tri-State Fertilizer Recommendations for Corn, Soybeans, Wheat, and Alfalfa', url: 'https://extension.purdue.edu/' },
      { title: 'FAO Fertilizer and Plant Nutrition Guide', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      mode: 'nutrient_to_fert',
      nutrientType: 'N',
      nutrientAmount: 120,
      nutrientUnit: 'kg_ha',
      fertilizerGrade: 46,
      fertilizerName: 'Urea (46% N)',
      area: 4,
      areaUnit: 'ha',
      soilTestCredit: 20,
      efficiencyPct: 100
    },
    relatedSlugs: ['npk-calculator', 'nitrogen-requirement-calculator', 'nutrient-to-fertilizer-calculator'],
    faqs: [
      { q: 'What is guaranteed fertilizer analysis?', a: 'The three numbers on a fertilizer bag represent the guaranteed percentage by weight of Total Nitrogen (N), Available Phosphate (P₂O₅), and Soluble Potash (K₂O).' }
    ]
  },
  {
    id: 10,
    slug: 'npk-calculator',
    name: 'NPK Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'layers',
    shortDesc: 'Balance multiple fertilizer products to satisfy N, P₂O₅, and K₂O crop nutrient goals simultaneously.',
    h1: 'NPK Calculator',
    intro: 'Formulate an accurate fertilizer blend using DAP, Urea, and Muriate of Potash (MOP) to meet comprehensive crop macronutrient targets without nutrient shortfalls.',
    formula: 'DAP = P₂O₅ ÷ 0.46; Urea = [N - (DAP × 0.18)] ÷ 0.46; MOP = K₂O ÷ 0.60',
    workedExample: 'Crop requirement: 140 kg N, 60 kg P₂O₅, 60 kg K₂O per ha on 10 ha. 1) DAP = 60 ÷ 0.46 = 130.4 kg/ha (supplies 23.5 kg N). 2) Urea = (140 - 23.5) ÷ 0.46 = 253.3 kg/ha. 3) MOP = 60 ÷ 0.60 = 100 kg/ha. Total 10 ha: DAP 1,304 kg (27 bags), Urea 2,533 kg (51 bags), MOP 1,000 kg (20 bags).',
    assumptions: 'Assumes straight single/binary sources (DAP 18-46-0, Urea 46-0-0, MOP 0-0-60).',
    limitations: 'Calculated quantities represent elemental/oxide equivalents and require proper soil incorporation.',
    methodology: 'Standard stoichiometric nutrient balancing protocols from IFA (International Fertilizer Association) and university extensions.',
    sources: [
      { title: 'International Fertilizer Association (IFA) Nutrient Management Handbook', url: 'https://www.fertilizer.org/' },
      { title: 'IPNI Plant Nutrition Manual', url: 'https://www.ipni.net/' }
    ],
    defaultInputs: {
      targetN: 140,
      targetP2O5: 60,
      targetK2O: 60,
      area: 10,
      areaUnit: 'ha',
      preferredSource: 'dap_urea_mop'
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'nitrogen-requirement-calculator', 'phosphorus-requirement-calculator', 'potassium-requirement-calculator'],
    faqs: [
      { q: 'Why does DAP supply nitrogen as well as phosphorus?', a: 'Diammonium Phosphate (18-46-0) contains 18% ammoniacal nitrogen chemically bonded with 46% phosphate.' }
    ]
  },
  {
    id: 11,
    slug: 'nitrogen-requirement-calculator',
    name: 'Nitrogen Requirement Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'zap',
    shortDesc: 'Calculate crop nitrogen fertilization requirements accounting for yield targets, soil organic matter, and legume rotation credits.',
    h1: 'Nitrogen Requirement Calculator',
    intro: 'Formulate field nitrogen prescriptions based on target crop yield uptake, previous legume crop credits, and soil organic matter mineralization.',
    formula: 'Net N = (Yield Target × Crop N Factor) - (OM Credit + Legume Credit + Soil NO₃ Credit)',
    workedExample: 'Wheat targeting 6 t/ha (28 kg N/t = 168 kg N gross) following soybeans (30 kg N credit) with 2.5% OM (25 kg N credit): Net N = 168 - (30 + 25) = 113 kg N/ha. Urea required = 113 ÷ 0.46 = 245.7 kg/ha.',
    assumptions: 'Assumes adequate soil moisture and temperature for organic matter mineralization.',
    limitations: 'In sandy soils or high-rainfall seasons, nitrate leaching may necessitate split applications.',
    methodology: 'Nitrogen mass-balance approach published by University of Minnesota Extension and Cornell University.',
    sources: [
      { title: 'University of Minnesota Extension: Nitrogen Management for Crops', url: 'https://extension.umn.edu/' },
      { title: 'Cornell University: Nitrogen Guidelines for Field Crops', url: 'https://cals.cornell.edu/' }
    ],
    defaultInputs: {
      targetYield: 6,
      cropType: 'wheat',
      soilOrganicMatterPct: 2.5,
      previousLegumeCredit: 30,
      soilNitrateTest: 15,
      area: 8,
      areaUnit: 'ha'
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'npk-calculator', 'nutrient-to-fertilizer-calculator'],
    faqs: [
      { q: 'Why split nitrogen applications?', a: 'Splitting N between planting and rapid vegetative growth (e.g. tillering or V6 stage) minimizes leaching and maximizes Nitrogen Use Efficiency (NUE).' }
    ]
  },
  {
    id: 12,
    slug: 'phosphorus-requirement-calculator',
    name: 'Phosphorus Requirement Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'hexagon',
    shortDesc: 'Determine phosphate (P₂O₅) fertilizer needs based on Olsen/Bray soil tests and distinguish elemental P from P₂O₅.',
    h1: 'Phosphorus Requirement Calculator',
    intro: 'Prescribe phosphate fertilizer rates based on soil test extractable P (Olsen or Bray-1), establishing maintenance vs build-up application rates.',
    formula: 'Phosphate Rate (kg P₂O₅/ha) based on Soil Test P vs Critical Agronomic Threshold; P = P₂O₅ × 0.4364',
    workedExample: 'Soil Olsen P = 10 ppm (below critical 15 ppm threshold) for 5 t/ha crop: Recommended rate = 60 kg P₂O₅/ha (26.2 kg Elemental P/ha). DAP required = 60 ÷ 0.46 = 130.4 kg/ha.',
    assumptions: 'Assumes soil test was conducted within the top 15-20 cm root zone.',
    limitations: 'High calcium (calcareous) or high iron/aluminum (acidic) soils rapidly fix soluble phosphorus into insoluble minerals.',
    methodology: 'Based on soil test calibration curves developed by North Central Regional Research Publication No. 221.',
    sources: [
      { title: 'NC-221 Recommended Chemical Soil Test Procedures', url: 'https://agbioresearch.msu.edu/' },
      { title: 'FAO Guide to Soil Fertility and Fertilizers', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      soilTestP: 10,
      soilTestType: 'olsen',
      targetYield: 5,
      area: 6,
      areaUnit: 'ha'
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'npk-calculator', 'potassium-requirement-calculator'],
    faqs: [
      { q: 'What is the difference between P and P₂O₅?', a: 'Fertilizer labels use oxide basis (P₂O₅). Elemental P is converted by: P₂O₅ = P × 2.2915, and P = P₂O₅ × 0.4364.' }
    ]
  },
  {
    id: 13,
    slug: 'potassium-requirement-calculator',
    name: 'Potassium Requirement Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'box',
    shortDesc: 'Calculate potash (K₂O) fertilizer rates based on soil exchangeable potassium and convert between elemental K and K₂O.',
    h1: 'Potassium Requirement Calculator',
    intro: 'Determine potash fertilization rates from ammonium acetate / Mehlich-3 exchangeable potassium soil test results.',
    formula: 'Potash Rate (kg K₂O/ha) based on Exchangeable K vs Critical Baseline; K = K₂O × 0.8302',
    workedExample: 'Soil test K = 90 ppm (low, below 130 ppm critical) on 10 ha: Recommended rate = 80 kg K₂O/ha (66.4 kg Elemental K/ha). MOP (0-0-60) required = 80 ÷ 0.60 = 133.3 kg/ha. Total MOP = 1,333 kg (~27 bags).',
    assumptions: 'Assumes cation exchange capacity (CEC) is representative of medium texture soils.',
    limitations: 'Sandy soils with low CEC have minimal K retention and require split applications to avoid luxury consumption.',
    methodology: 'Potassium soil fertility calibration models from Potash & Phosphate Institute (PPI) and university extensions.',
    sources: [
      { title: 'International Plant Nutrition Institute (IPNI) Potassium Compendium', url: 'https://www.ipni.net/' },
      { title: 'Ohio State University Extension: Potassium Fertility in Field Crops', url: 'https://ohioline.osu.edu/' }
    ],
    defaultInputs: {
      soilTestK: 90,
      cropType: 'cereals',
      area: 10,
      areaUnit: 'ha'
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'npk-calculator', 'phosphorus-requirement-calculator'],
    faqs: [
      { q: 'How is K₂O converted to elemental K?', a: 'Potash (K₂O) contains 83.02% elemental Potassium (K). Conversion formula: K = K₂O × 0.8302; K₂O = K × 1.2046.' }
    ]
  },
  {
    id: 14,
    slug: 'fertilizer-application-rate-calculator',
    name: 'Fertilizer Application Rate Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'gauge',
    shortDesc: 'Convert bulk applied fertilizer mass into rates per hectare, per acre, per 100 m², and active nutrient delivered.',
    h1: 'Fertilizer Application Rate Calculator',
    intro: 'Calculate unit-area application rates and active nutrient delivery from total fertilizer applied across a measured acreage.',
    formula: 'Rate/ha = Total Product (kg) ÷ Field Area (ha); Active Nutrient/ha = Rate/ha × (Nutrient % ÷ 100)',
    workedExample: 'Applying 750 kg of 20-20-20 soluble fertilizer across 3 hectares: Application rate = 750 ÷ 3 = 250 kg/ha (223 lb/acre / 2.5 kg/100 m²). Active N, P₂O₅, K₂O delivered = 250 × 0.20 = 50 kg/ha each.',
    assumptions: 'Assumes calibrated spreader or fertigation injection with uniform spatial distribution.',
    limitations: 'Does not account for spreader overlap striping or uneven headland spreader swath patterns.',
    methodology: 'Standard agricultural machinery and fertilizer spreader calibration protocols.',
    sources: [
      { title: 'University of Kentucky Extension: Broadcast Fertilizer Spreader Calibration', url: 'https://extension.ca.uky.edu/' }
    ],
    defaultInputs: {
      totalProductApplied: 750,
      productUnit: 'kg',
      area: 3,
      areaUnit: 'ha',
      nutrientPct: 20
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'nutrient-to-fertilizer-calculator', 'sprayer-calibration-calculator'],
    faqs: [
      { q: 'How can I check fertilizer spreader calibration?', a: 'Lay out calibration catch trays across the spread swath, drive over them at operating speed, and weigh the collected fertilizer to verify pattern symmetry and rate.' }
    ]
  },
  {
    id: 15,
    slug: 'nutrient-to-fertilizer-calculator',
    name: 'Nutrient-to-Fertilizer Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'repeat',
    shortDesc: 'Calculate commercial product mass from target active nutrient mass and carrier ratio.',
    h1: 'Nutrient-to-Fertilizer Calculator',
    intro: 'Instantly convert pure active nutrient requirements into commercial fertilizer product weights and 50-kg bag counts.',
    formula: 'Fertilizer Quantity = Required Nutrient Weight ÷ (Fertilizer Grade % ÷ 100)',
    workedExample: 'To deliver 80 kg of pure Nitrogen using Urea (46% N): Fertilizer required = 80 ÷ (46 ÷ 100) = 80 ÷ 0.46 = 173.91 kg of Urea (Active N = 80 kg, Carrier/Inert = 93.91 kg, equivalent to 3.5 bags of 50kg).',
    assumptions: 'Assumes commercial product conforms to guaranteed grade analysis.',
    limitations: 'Calculates single nutrient weight; binary or complex fertilizers supply secondary nutrients simultaneously.',
    methodology: 'Stoichiometric fertilizer calculation standard.',
    sources: [
      { title: 'FAO Fertilizer Formulation and Handling Manual', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      targetNutrientWeight: 80,
      weightUnit: 'kg',
      fertilizerGradePct: 46
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'npk-calculator', 'fertilizer-application-rate-calculator'],
    faqs: [
      { q: 'What is fertilizer carrier material?', a: 'Carrier material includes the bonding counter-ions (such as sulfate in ammonium sulfate or oxygen and carbon in urea) that stabilize the nutrient chemically.' }
    ]
  },
  {
    id: 16,
    slug: 'lime-requirement-calculator',
    name: 'Lime Requirement Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'shield-alert',
    shortDesc: 'Estimate agricultural limestone required to neutralize soil acidity based on soil texture buffering and CCE rating.',
    h1: 'Lime Requirement Calculator',
    intro: 'Calculate agricultural lime application rates to neutralize acidic soil, elevate pH to optimal crop levels, and adjust for Lime Neutralizing Value (CCE).',
    formula: 'Lime Rate (t/ha) = (Target pH - Current pH) × Soil Buffer Factor ÷ (Lime CCE % ÷ 100)',
    workedExample: 'Loam soil with pH 5.2 (Buffer factor 2.8 t/ha per pH unit) raised to target pH 6.5 using 90% CCE Aglime on 4 ha: ΔpH = 1.3. Rate = (1.3 × 2.8) ÷ 0.90 = 4.04 tonnes/ha. Total Lime = 4 × 4.04 = 16.18 Metric Tonnes.',
    assumptions: 'Assumes agricultural limestone ground to standard fineness (minimum 50% passing 100-mesh screen).',
    limitations: 'Actual lime requirement should be verified by a laboratory SMP or Woodruff buffer pH test for precise reserve acidity quantification.',
    methodology: 'Based on Soil Science Society of America (SSSA) and university extension soil buffering capacity models.',
    sources: [
      { title: 'Soil Science Society of America: Soil Acidity and Liming', url: 'https://www.soils.org/' },
      { title: 'Penn State Extension: Managing Soil pH with Agricultural Lime', url: 'https://extension.psu.edu/' }
    ],
    defaultInputs: {
      currentSoilPH: 5.2,
      targetPH: 6.5,
      bufferPH: 6.2,
      soilTexture: 'loam',
      area: 4,
      areaUnit: 'ha',
      limeCCE: 90
    },
    relatedSlugs: ['fertilizer-requirement-calculator', 'compost-application-calculator'],
    faqs: [
      { q: 'What is Calcium Carbonate Equivalent (CCE)?', a: 'CCE is the acid-neutralizing capacity of a liming material expressed as a percentage of pure calcium carbonate (CaCO₃ = 100% CCE).' }
    ]
  },
  {
    id: 17,
    slug: 'compost-application-calculator',
    name: 'Compost Application Calculator',
    category: 'soil-fertilizer',
    categoryLabel: 'Soil & Fertilizer',
    icon: 'recycle',
    shortDesc: 'Calculate compost volume, wet tonnage, dry organic matter, and first-year nitrogen availability.',
    h1: 'Compost Application Calculator',
    intro: 'Estimate compost volume in cubic meters/yards and bulk wet tonnage required to achieve target layer depths or dry matter application rates.',
    formula: 'Volume (m³) = Field Area (m²) × Depth (m); Wet Weight (Tonnes) = [Volume (m³) × Bulk Density (kg/m³)] ÷ 1,000',
    workedExample: 'Applying 12 mm (0.012 m) compost depth on 1 hectare (10,000 m²) with 600 kg/m³ bulk density: Volume = 10,000 × 0.012 = 120 m³ (157 cubic yards). Wet Weight = (120 × 600) ÷ 1,000 = 72.0 Metric Tonnes. With 40% moisture, dry organic matter = 43.2 Tonnes (~97 kg/ha available N year 1).',
    assumptions: 'Assumes mature, cured compost with C:N ratio between 15:1 and 25:1.',
    limitations: 'Immature compost with high C:N (>30:1) can temporarily immobilize soil nitrogen.',
    methodology: 'US Composting Council and Rodale Institute organic matter management standards.',
    sources: [
      { title: 'US Composting Council Compost Application Guidelines', url: 'https://www.compostingcouncil.org/' },
      { title: 'Cornell Waste Management Institute Compost Resources', url: 'https://cwmi.css.cornell.edu/' }
    ],
    defaultInputs: {
      area: 1,
      areaUnit: 'ha',
      calcMethod: 'depth',
      applicationDepthMm: 12,
      compostBulkDensity: 600,
      moistureContentPct: 40,
      targetTonnesHa: 20
    },
    relatedSlugs: ['lime-requirement-calculator', 'fertilizer-requirement-calculator'],
    faqs: [
      { q: 'How much nitrogen does compost supply in the first year?', a: 'Typically, only 10-20% of total organic nitrogen in finished compost mineralizes in Year 1, providing sustained slow-release nutrition.' }
    ]
  }
];
