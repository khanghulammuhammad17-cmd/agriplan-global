export const CAT3_CALCULATORS = [
  {
    id: 18,
    slug: 'eto-calculator',
    name: 'ETo Calculator (FAO-56 Penman-Monteith)',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'sun',
    shortDesc: 'Calculate Reference Crop Evapotranspiration (ETo) using the authoritative standard FAO-56 Penman-Monteith equation.',
    h1: 'ETo Calculator (FAO-56 Penman-Monteith)',
    intro: 'Compute reference crop evapotranspiration (ETo) in mm/day using the globally recognized FAO-56 Penman-Monteith standard physical method combining aerodynamic and radiation energy balance physics.',
    formula: 'ET₀ = [0.408 Δ (R_n - G) + γ (900 / (T + 273)) u₂ (e_s - e_a)] ÷ [Δ + γ (1 + 0.34 u₂)]',
    workedExample: 'Conditions: T = 25°C, RH = 60%, u₂ = 2.0 m/s, R_s = 22.0 MJ/m²/day, elevation = 100m. Intermediate steps: Atmospheric Pressure P = 100.1 kPa, Psychrometric constant γ = 0.0666 kPa/°C, e_s = 3.167 kPa, e_a = 1.900 kPa, VPD = 1.267 kPa, Δ = 0.1887 kPa/°C, Net Radiation R_n = 13.82 MJ/m²/day. Result: Reference ETo = 5.24 mm/day.',
    assumptions: 'Assumes a hypothetical well-watered reference grass crop of uniform 0.12 m height, surface resistance of 70 s/m, and albedo of 0.23.',
    limitations: 'Requires reliable local agrometeorological station data; inaccurate solar radiation or wind measurements will propagate into ETo estimates.',
    methodology: 'Full implementation of FAO Irrigation and Drainage Paper No. 56 (Allen, Pereira, Raes, Smith, 1998).',
    sources: [
      { title: 'FAO-56: Crop Evapotranspiration - Guidelines for Computing Crop Water Requirements', url: 'https://www.fao.org/3/x0490e/x0490e00.htm' },
      { title: 'ASCE Standardized Reference Evapotranspiration Equation', url: 'https://ascelibrary.org/' },
      { title: 'WMO Guide to Agricultural Meteorological Practices', url: 'https://wmo.int/' }
    ],
    defaultInputs: {
      meanTempC: 25,
      relHumidityPct: 60,
      windSpeed2m: 2.0,
      solarRadiation: 22.0,
      elevationM: 100,
      albedo: 0.23
    },
    relatedSlugs: ['crop-water-requirement-calculator', 'irrigation-water-requirement-calculator', 'irrigation-scheduling-calculator'],
    faqs: [
      { q: 'Why is FAO-56 Penman-Monteith the international standard?', a: 'It is the only method physically derived from thermodynamic energy balance and aerodynamic vapor transfer, proving superior across all world climatic zones without local recalibration.' }
    ]
  },
  {
    id: 19,
    slug: 'crop-water-requirement-calculator',
    name: 'Crop Water Requirement Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'droplet',
    shortDesc: 'Calculate actual crop evapotranspiration (ETc) using FAO single crop coefficients (Kc).',
    h1: 'Crop Water Requirement Calculator',
    intro: 'Calculate crop evapotranspiration (ETc) across specific growth stages (initial, vegetative, mid-season, late harvest) using the FAO crop coefficient method.',
    formula: 'ET_c = ET_0 × K_c; Total Volume (m³) = [Area (m²) × ET_c (mm)] ÷ 1,000',
    workedExample: 'Mid-season wheat (Kc = 1.15) under ETo of 5.2 mm/day for a 30-day period on a 10 ha field: Daily ETc = 5.2 × 1.15 = 5.98 mm/day. 30-day requirement = 5.98 × 30 = 179.4 mm. Total water volume = (100,000 m² × 179.4 mm) ÷ 1,000 = 17,940 m³ (17.94 Million Liters / 4.74 Million Gallons).',
    assumptions: 'Assumes disease-free, well-fertilized crops grown under optimum soil water conditions.',
    limitations: 'Severe soil salinity, waterlogging, or disease will reduce actual ETc below potential crop evapotranspiration.',
    methodology: 'FAO-56 single crop coefficient Kc framework and FAO CROPWAT methodology.',
    sources: [
      { title: 'FAO-56 Chapter 6: Single Crop Coefficient (Kc)', url: 'https://www.fao.org/3/x0490e/x0490e0b.htm' },
      { title: 'FAO CROPWAT 8.0 Model Documentation', url: 'https://www.fao.org/land-water/databases-and-software/cropwat/en/' }
    ],
    defaultInputs: {
      etoMmDay: 5.2,
      cropName: 'Wheat',
      growthStage: 'mid',
      kcValue: 1.15,
      periodDays: 30,
      area: 10,
      areaUnit: 'ha'
    },
    relatedSlugs: ['eto-calculator', 'irrigation-water-requirement-calculator', 'irrigation-runtime-calculator'],
    faqs: [
      { q: 'How does crop coefficient (Kc) change during the season?', a: 'Kc starts low (0.3-0.5) during initial germination, rises to peak (1.05-1.25) at full canopy mid-season flowering, and drops (0.4-0.8) at late maturity.' }
    ]
  },
  {
    id: 20,
    slug: 'irrigation-water-requirement-calculator',
    name: 'Irrigation Water Requirement Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'waves',
    shortDesc: 'Compute net and gross irrigation water requirements accounting for effective rainfall and system application efficiency.',
    h1: 'Irrigation Water Requirement Calculator',
    intro: 'Determine net and gross irrigation water delivery volumes by balancing crop water demand with effective rainfall and irrigation distribution losses.',
    formula: 'Net Irrigation (mm) = ET_c - P_eff - Soil Moisture; Gross Irrigation (mm) = Net Irrigation ÷ (Efficiency % ÷ 100)',
    workedExample: 'Monthly ETc = 160 mm, Effective Rain = 45 mm, Soil Moisture change = 10 mm. Drip system efficiency = 90% across 5 ha: Net Irrigation = 160 - 45 - 10 = 105 mm. Gross Irrigation = 105 ÷ 0.90 = 116.67 mm. Total Gross Volume = (50,000 m² × 116.67 mm) ÷ 1,000 = 5,833.5 m³ (5.83 Million Liters).',
    assumptions: 'Assumes irrigation system is maintained with proper operating pressure and filtration.',
    limitations: 'Surface irrigation with poor leveling may exhibit lower efficiency (45-60%) due to runoff and deep percolation.',
    methodology: 'FAO Irrigation Water Management Manuals and USDA-NRCS National Engineering Handbook Part 652.',
    sources: [
      { title: 'FAO Irrigation Water Management: Irrigation Water Needs', url: 'https://www.fao.org/' },
      { title: 'USDA-NRCS National Engineering Handbook: Irrigation', url: 'https://www.nrcs.usda.gov/' }
    ],
    defaultInputs: {
      cropEtcMm: 160,
      effectiveRainMm: 45,
      groundwaterMm: 0,
      soilWaterDepletionMm: 10,
      irrigationEfficiencyPct: 90,
      area: 5,
      areaUnit: 'ha'
    },
    relatedSlugs: ['crop-water-requirement-calculator', 'effective-rainfall-calculator', 'irrigation-runtime-calculator', 'water-volume-calculator'],
    faqs: [
      { q: 'What is typical irrigation efficiency by system type?', a: 'Drip/Micro-irrigation: 85-95%; Center Pivot/Linear: 75-85%; Solid Set Sprinkler: 70-80%; Furrow/Surface: 50-65%.' }
    ]
  },
  {
    id: 21,
    slug: 'irrigation-scheduling-calculator',
    name: 'Irrigation Scheduling Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'calendar-clock',
    shortDesc: 'Determine irrigation trigger timing and application depth using soil-water balance and Readily Available Water (RAW).',
    h1: 'Irrigation Scheduling Calculator',
    intro: 'Plan irrigation timing intervals and cycle depths using root-zone water holding capacities (Total Available Water TAW and Readily Available Water RAW) to avoid crop water stress.',
    formula: 'TAW (mm) = 1,000 × (FC - WP) × Z_r; RAW (mm) = p × TAW; Interval (days) = RAW ÷ Daily ET_c',
    workedExample: 'Loam soil (FC = 28%, WP = 14%), rooting depth Zr = 0.8m, depletion fraction p = 0.50, daily ETc = 5.5 mm/day: TAW = 1,000 × (0.28 - 0.14) × 0.8 = 112 mm. RAW = 0.50 × 112 = 56 mm. Interval = 56 ÷ 5.5 = 10.18 days (~Every 10 days apply 55 mm net).',
    assumptions: 'Assumes uniform root distribution throughout the effective rooting depth Zr.',
    limitations: 'Shallow root zones in rocky soils hold substantially less water and require higher irrigation frequency.',
    methodology: 'FAO-56 Chapter 8: Irrigation Scheduling and Soil Water Balance.',
    sources: [
      { title: 'FAO-56: Yield Response to Water and Irrigation Scheduling', url: 'https://www.fao.org/' },
      { title: 'University of California Davis: Agricultural Water Management', url: 'https://ucanr.edu/' }
    ],
    defaultInputs: {
      soilTexture: 'loam',
      fieldCapacityVolPct: 28,
      wiltingPointVolPct: 14,
      rootingDepthM: 0.8,
      depletionFraction: 0.50,
      dailyEtcMm: 5.5,
      effectiveRainDailyMm: 0
    },
    relatedSlugs: ['eto-calculator', 'irrigation-water-requirement-calculator', 'irrigation-runtime-calculator'],
    faqs: [
      { q: 'What is allowable depletion (p)?', a: 'Allowable depletion fraction (p) is the fraction of total available water that a crop can extract from the root zone without suffering water stress or stomatal closure.' }
    ]
  },
  {
    id: 22,
    slug: 'irrigation-runtime-calculator',
    name: 'Irrigation System Runtime Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'clock',
    shortDesc: 'Calculate pump and valve runtimes in hours and minutes to deliver exact water depths.',
    h1: 'Irrigation System Runtime Calculator',
    intro: 'Calculate the required operating time for irrigation pumps, drip manifolds, or sprinkler sets to deliver a target gross application depth.',
    formula: 'Runtime (Hours) = Gross Water Volume (m³) ÷ System Flow Rate (m³/hour)',
    workedExample: 'Applying 25 mm depth to 2 hectares (20,000 m²) with an 85% efficient drip system and pump flow rate of 30 m³/h: Gross Volume = (20,000 × 25 ÷ 1,000) ÷ 0.85 = 588.24 m³. Runtime = 588.24 ÷ 30 = 19.61 hours (19 hours 37 minutes).',
    assumptions: 'Assumes constant pump pressure and design flow rate throughout the operating cycle.',
    limitations: 'Pump wear, clogged emitters, or pipe friction head loss will reduce actual flow rate and increase required runtime.',
    methodology: 'Irrigation Association (IA) Certified Irrigation Designer (CID) standard calculation practices.',
    sources: [
      { title: 'The Irrigation Association: Principles of Irrigation Handbook', url: 'https://www.irrigation.org/' }
    ],
    defaultInputs: {
      targetDepthMm: 25,
      fieldArea: 2,
      areaUnit: 'ha',
      systemFlowRate: 30,
      flowUnit: 'cum_h',
      applicationEfficiencyPct: 85
    },
    relatedSlugs: ['irrigation-water-requirement-calculator', 'irrigation-scheduling-calculator', 'water-volume-calculator'],
    faqs: [
      { q: 'How do I avoid soil runoff when calculating runtime?', a: 'Ensure the irrigation system application rate (mm/hour) does not exceed the soil infiltration rate (e.g. 5-10 mm/hr for clay, 15-25 mm/hr for sandy loam).' }
    ]
  },
  {
    id: 23,
    slug: 'effective-rainfall-calculator',
    name: 'Effective Rainfall Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'cloud-rain',
    shortDesc: 'Estimate usable precipitation retained in the root zone using USDA Soil Conservation Service (SCS) and FAO formulas.',
    h1: 'Effective Rainfall Calculator',
    intro: 'Calculate the proportion of natural rainfall effectively stored in the crop root zone after accounting for surface runoff and deep percolation losses.',
    formula: 'USDA SCS Method: For P ≤ 250 mm: P_eff = [P × (125 - 0.2 P)] ÷ 125; For P > 250 mm: P_eff = 125 + 0.1 P',
    workedExample: 'Monthly rainfall P = 100 mm: P_eff = [100 × (125 - 0.2 × 100)] ÷ 125 = [100 × 105] ÷ 125 = 84.0 mm (84.0% effective; 16.0 mm lost to runoff/drainage).',
    assumptions: 'Assumes gently sloping agricultural fields with standard crop ground cover.',
    limitations: 'Intense short-duration storms on crusted or bare clay soils result in much higher runoff percentages than steady gentle showers.',
    methodology: 'USDA Soil Conservation Service (SCS) Technical Release No. 21 and FAO CROPWAT empirical methods.',
    sources: [
      { title: 'USDA-SCS Technical Release 21: Calculation of Effective Rainfall', url: 'https://www.nrcs.usda.gov/' },
      { title: 'FAO CROPWAT Technical Documentation', url: 'https://www.fao.org/' }
    ],
    defaultInputs: {
      totalRainfallMm: 100,
      method: 'usda_scs',
      fixedPct: 75,
      soilStorageDepletionMm: 50
    },
    relatedSlugs: ['irrigation-water-requirement-calculator', 'crop-water-requirement-calculator'],
    faqs: [
      { q: 'Why is not all rainfall effective for crops?', a: 'Light showers (<5 mm) evaporate directly from crop foliage without reaching soil roots; heavy rainfalls exceed soil infiltration and run off.' }
    ]
  },
  {
    id: 24,
    slug: 'water-volume-calculator',
    name: 'Water Volume Calculator',
    category: 'water-irrigation',
    categoryLabel: 'Water & Irrigation',
    icon: 'cylinder',
    shortDesc: 'Convert irrigation depth and land area into total volume: Liters, Cubic Meters, Gallons, Acre-Feet, and Acre-Inches.',
    h1: 'Water Volume Calculator',
    intro: 'Convert depth of water applied across field area into bulk volumetric units for reservoir storage planning, canal allocations, and water metering.',
    formula: 'Volume (m³) = Field Area (m²) × Water Depth (m); 1 mm on 1 ha = 10 m³ (10,000 Liters)',
    workedExample: 'Applying 50 mm (0.05 m) irrigation across 10 hectares (100,000 m²): Volume = 100,000 × 0.05 = 5,000 m³ (5,000,000 Liters / 1,320,860 US Gallons / 4.05 Acre-Feet / 48.64 Acre-Inches).',
    assumptions: 'Assumes uniform application across the entire target area.',
    limitations: 'Calculates theoretical static volume; pipeline friction, pumping losses, and evaporation are separate.',
    methodology: 'Hydraulic and volumetric physical unit conversion equations.',
    sources: [
      { title: 'USGS Water Science School: Water Volume Conversion Principles', url: 'https://www.usgs.gov/special-topics/water-science-school' }
    ],
    defaultInputs: {
      area: 10,
      areaUnit: 'ha',
      waterDepth: 50,
      depthUnit: 'mm'
    },
    relatedSlugs: ['irrigation-water-requirement-calculator', 'irrigation-runtime-calculator', 'agriculture-unit-converter'],
    faqs: [
      { q: 'What is 1 mm of water across 1 hectare?', a: '1 mm depth of water over 1 hectare (10,000 m²) equals exactly 10 cubic meters (m³) or 10,000 Liters (approx 2,642 US Gallons).' }
    ]
  }
];
